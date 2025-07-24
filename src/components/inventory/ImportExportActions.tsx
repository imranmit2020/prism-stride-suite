import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, FileText, AlertCircle, CheckCircle, Sparkles, Brain } from "lucide-react";
import { InventoryItem } from "./InventoryTable";

interface ImportExportActionsProps {
  inventory: InventoryItem[];
  onImportProducts: (products: Omit<InventoryItem, 'id'>[]) => void;
}

// AI-powered data validation and cleaning
const aiValidateAndCleanData = (products: any[]) => {
  const cleaned = products.map((product, index) => {
    const issues: string[] = [];
    const suggestions: string[] = [];
    
    // Name validation and cleaning
    let name = product.name?.toString().trim() || `Product ${index + 1}`;
    if (name.length < 3) {
      issues.push("Name too short");
      name = `Product ${index + 1}`;
    }
    
    // SKU validation and generation
    let sku = product.sku?.toString().trim() || '';
    if (!sku || sku.length < 3) {
      sku = `AI-${name.substring(0, 3).toUpperCase()}-${Date.now()}-${index}`;
      suggestions.push("Generated SKU automatically");
    }
    
    // Category validation and AI suggestion
    let category = product.category?.toString().trim() || '';
    if (!category) {
      category = aiCategorizeProduct(name);
      suggestions.push(`Suggested category: ${category}`);
    }
    
    // Numeric validation with smart defaults
    const currentStock = Math.max(0, parseInt(product.currentStock) || 0);
    const minStock = Math.max(0, parseInt(product.minStock) || Math.floor(currentStock * 0.2));
    const maxStock = Math.max(minStock * 2, parseInt(product.maxStock) || Math.max(100, currentStock * 5));
    const reorderPoint = Math.max(minStock, parseInt(product.reorderPoint) || Math.floor((minStock + maxStock) * 0.3));
    
    // Price validation
    const unitCost = Math.max(0, parseFloat(product.unitCost) || 0);
    let sellingPrice = Math.max(0, parseFloat(product.sellingPrice) || 0);
    
    if (sellingPrice === 0 && unitCost > 0) {
      sellingPrice = Math.round(unitCost * 2.2 * 100) / 100; // 120% markup
      suggestions.push(`Suggested selling price: $${sellingPrice}`);
    }
    
    if (sellingPrice < unitCost && unitCost > 0) {
      issues.push("Selling price below cost");
    }
    
    // Supplier validation
    let supplier = product.supplier?.toString().trim() || '';
    if (!supplier) {
      supplier = aiSuggestSupplier(category);
      suggestions.push(`Suggested supplier: ${supplier}`);
    }
    
    return {
      original: product,
      cleaned: {
        name,
        sku,
        category,
        currentStock,
        minStock,
        maxStock,
        reorderPoint,
        unitCost,
        sellingPrice,
        supplier,
        lastRestocked: product.lastRestocked || new Date().toISOString().split('T')[0],
        demand7Days: Math.max(0, parseInt(product.demand7Days) || 0),
        demand30Days: Math.max(0, parseInt(product.demand30Days) || 0),
        aiPrediction: {
          nextWeekDemand: Math.max(0, parseInt(product.aiNextWeekDemand) || currentStock),
          confidence: Math.min(100, Math.max(0, parseInt(product.aiConfidence) || 75)),
          recommendation: product.aiRecommendation || "Imported product - review data"
        }
      },
      issues,
      suggestions
    };
  });
  
  return cleaned;
};

// AI duplicate detection
const aiDetectDuplicates = (products: any[]) => {
  const duplicates: number[] = [];
  const seen = new Set();
  
  products.forEach((product, index) => {
    const key = `${product.name.toLowerCase()}-${product.sku.toLowerCase()}`;
    if (seen.has(key)) {
      duplicates.push(index);
    } else {
      seen.add(key);
    }
  });
  
  return duplicates;
};

// Helper functions from AddProductDialog
const aiCategorizeProduct = (name: string): string => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('coffee') || lowerName.includes('tea') || lowerName.includes('drink')) return 'Beverages';
  if (lowerName.includes('croissant') || lowerName.includes('muffin') || lowerName.includes('pastry')) return 'Pastries';
  if (lowerName.includes('sandwich') || lowerName.includes('burger') || lowerName.includes('salad')) return 'Food';
  if (lowerName.includes('milk') || lowerName.includes('cream') || lowerName.includes('cheese')) return 'Dairy';
  if (lowerName.includes('cup') || lowerName.includes('napkin') || lowerName.includes('supply')) return 'Supplies';
  if (lowerName.includes('machine') || lowerName.includes('equipment')) return 'Equipment';
  return 'Food';
};

const aiSuggestSupplier = (category: string): string => {
  const suppliers: Record<string, string[]> = {
    'Beverages': ['Premium Coffee Co.', 'Tea & More Ltd'],
    'Pastries': ['French Bakery Supply', 'Sweet Delights Co.'],
    'Food': ['Fresh Foods Ltd', 'Gourmet Suppliers Inc'],
    'Dairy': ['Dairy Fresh Co.', 'Organic Dairy Ltd'],
    'Supplies': ['Restaurant Supply Co.', 'Food Service Solutions'],
    'Equipment': ['Kitchen Equipment Ltd', 'Commercial Solutions']
  };
  
  const categorySuppliers = suppliers[category] || ['Generic Supplier Co.'];
  return categorySuppliers[0];
};

export function ImportExportActions({ inventory, onImportProducts }: ImportExportActionsProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [validationResults, setValidationResults] = useState<any[]>([]);
  const [showValidation, setShowValidation] = useState(false);

  const handleExportCSV = () => {
    if (inventory.length === 0) {
      toast({
        title: "No Data",
        description: "No inventory data to export",
        variant: "destructive"
      });
      return;
    }

    const headers = [
      "Name",
      "SKU",
      "Category",
      "Current Stock",
      "Min Stock",
      "Max Stock",
      "Reorder Point",
      "Unit Cost",
      "Selling Price",
      "Supplier",
      "Last Restocked",
      "7-Day Demand",
      "30-Day Demand",
      "AI Next Week Demand",
      "AI Confidence",
      "AI Recommendation"
    ];

    const csvContent = [
      headers.join(","),
      ...inventory.map(item => [
        `"${item.name}"`,
        item.sku,
        item.category,
        item.currentStock,
        item.minStock,
        item.maxStock,
        item.reorderPoint,
        item.unitCost,
        item.sellingPrice,
        `"${item.supplier}"`,
        item.lastRestocked,
        item.demand7Days,
        item.demand30Days,
        item.aiPrediction.nextWeekDemand,
        item.aiPrediction.confidence,
        `"${item.aiPrediction.recommendation}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `inventory_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: `Exported ${inventory.length} products to CSV`
    });
  };

  const handleImportCSV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      toast({
        title: "Invalid File",
        description: "Please select a CSV file",
        variant: "destructive"
      });
      return;
    }

    setImporting(true);
    setImportProgress(0);
    setShowValidation(false);

    try {
      setImportProgress(20);
      const text = await file.text();
      const lines = text.trim().split("\n");
      
      if (lines.length < 2) {
        throw new Error("CSV file must contain headers and at least one data row");
      }

      setImportProgress(40);
      const headers = lines[0].split(",").map(h => h.trim().replace(/"/g, ""));
      const requiredHeaders = ["Name", "SKU", "Category"];
      
      const missingHeaders = requiredHeaders.filter(req => 
        !headers.some(h => h.toLowerCase().includes(req.toLowerCase()))
      );

      if (missingHeaders.length > 0) {
        throw new Error(`Missing required columns: ${missingHeaders.join(", ")}`);
      }

      setImportProgress(60);
      // Parse raw data
      const rawProducts = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map(v => v.trim().replace(/"/g, ""));
        if (values.length < 3) continue;

        const product = {
          name: values[0],
          sku: values[1],
          category: values[2],
          currentStock: values[3],
          minStock: values[4],
          maxStock: values[5],
          reorderPoint: values[6],
          unitCost: values[7],
          sellingPrice: values[8],
          supplier: values[9],
          lastRestocked: values[10],
          demand7Days: values[11],
          demand30Days: values[12],
          aiNextWeekDemand: values[13],
          aiConfidence: values[14],
          aiRecommendation: values[15]
        };
        rawProducts.push(product);
      }

      setImportProgress(80);
      // AI validation and cleaning
      const validatedProducts = aiValidateAndCleanData(rawProducts);
      const duplicateIndices = aiDetectDuplicates(validatedProducts.map(p => p.cleaned));
      
      // Mark duplicates
      validatedProducts.forEach((product, index) => {
        if (duplicateIndices.includes(index)) {
          product.issues.push("Potential duplicate");
        }
      });

      setValidationResults(validatedProducts);
      setShowValidation(true);
      setImportProgress(100);

      const cleanedProducts = validatedProducts.map(p => p.cleaned);
      const totalIssues = validatedProducts.reduce((sum, p) => sum + p.issues.length, 0);
      const totalSuggestions = validatedProducts.reduce((sum, p) => sum + p.suggestions.length, 0);

      onImportProducts(cleanedProducts);
      
      toast({
        title: "AI Import Complete",
        description: `Imported ${cleanedProducts.length} products. ${totalSuggestions} AI suggestions applied, ${totalIssues} issues detected.`
      });

    } catch (error) {
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Failed to parse CSV file",
        variant: "destructive"
      });
    } finally {
      setImporting(false);
      setTimeout(() => setImportProgress(0), 2000);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const downloadTemplate = () => {
    const templateHeaders = [
      "Name",
      "SKU", 
      "Category",
      "Current Stock",
      "Min Stock",
      "Max Stock",
      "Reorder Point",
      "Unit Cost",
      "Selling Price",
      "Supplier",
      "Last Restocked",
      "7-Day Demand",
      "30-Day Demand",
      "AI Next Week Demand",
      "AI Confidence",
      "AI Recommendation"
    ];

    const sampleData = [
      "Coffee Beans",
      "COF-001",
      "Beverages", 
      "50",
      "20",
      "200",
      "30",
      "12.50",
      "3.50",
      "Premium Coffee Co.",
      "2024-01-20",
      "35",
      "142",
      "40",
      "85",
      "Stock adequate"
    ];

    const csvContent = [
      templateHeaders.join(","),
      sampleData.join(",")
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "inventory_import_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Template Downloaded",
      description: "CSV template downloaded successfully"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI-Powered Import / Export
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
        {/* Export Section */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Export Inventory</Label>
          <p className="text-sm text-muted-foreground">
            Export all inventory data to CSV format for backup or analysis.
          </p>
          <Button onClick={handleExportCSV} className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export to CSV ({inventory.length} products)
          </Button>
        </div>

        <Separator />

        {/* Import Section */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Import Inventory</Label>
          <p className="text-sm text-muted-foreground">
            Import products from a CSV file. Required columns: Name, SKU, Category.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={downloadTemplate}
              className="w-full sm:w-auto"
            >
              <FileText className="h-4 w-4 mr-2" />
              Download Template
            </Button>
            <div className="relative">
              <Input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleImportCSV}
                disabled={importing}
                className="hidden"
                id="csv-upload"
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                disabled={importing}
                className="w-full sm:w-auto"
              >
                <Upload className="h-4 w-4 mr-2" />
                {importing ? "Processing..." : "AI Smart Import"}
              </Button>
            </div>
          </div>

          {importing && importProgress > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>AI Processing...</span>
                <span>{importProgress}%</span>
              </div>
              <Progress value={importProgress} className="w-full" />
            </div>
          )}

          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted">
            <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1 text-primary">AI-Enhanced Import Features:</p>
              <ul className="space-y-1 text-xs">
                <li>• Automatic data validation and cleaning</li>
                <li>• Smart category detection and SKU generation</li>
                <li>• Duplicate detection and price optimization</li>
                <li>• Missing data completion with AI suggestions</li>
                <li>• Supplier matching and stock level optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* AI Validation Results */}
    {showValidation && validationResults.length > 0 && (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            AI Validation Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                {validationResults.length} Products Processed
              </Badge>
              <Badge variant="outline" className="text-green-600">
                {validationResults.reduce((sum, p) => sum + p.suggestions.length, 0)} AI Improvements
              </Badge>
              <Badge variant="outline" className="text-orange-600">
                {validationResults.reduce((sum, p) => sum + p.issues.length, 0)} Issues Detected
              </Badge>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2">
              {validationResults.slice(0, 10).map((result, index) => (
                <div key={index} className="p-3 border rounded-lg text-sm">
                  <div className="font-medium">{result.cleaned.name}</div>
                  {result.suggestions.length > 0 && (
                    <div className="mt-1">
                      <span className="text-green-600 text-xs">✓ AI Suggestions: </span>
                      <span className="text-xs text-muted-foreground">
                        {result.suggestions.join(", ")}
                      </span>
                    </div>
                  )}
                  {result.issues.length > 0 && (
                    <div className="mt-1">
                      <span className="text-orange-600 text-xs">⚠ Issues: </span>
                      <span className="text-xs text-muted-foreground">
                        {result.issues.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              {validationResults.length > 10 && (
                <div className="text-center text-sm text-muted-foreground">
                  +{validationResults.length - 10} more products processed...
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )}
    </div>
  );
}