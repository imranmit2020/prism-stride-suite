import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, FileText, AlertCircle, CheckCircle, Sparkles, Home } from "lucide-react";

interface PersonalItem {
  id?: string;
  name: string;
  description?: string;
  category?: string;
  location?: string;
  condition: string;
  purchase_date?: string;
  purchase_price?: number;
  current_value?: number;
  warranty_expiry?: string;
  serial_number?: string;
  model?: string;
  brand?: string;
  notes?: string;
}

interface PersonalImportExportActionsProps {
  items: PersonalItem[];
  onImportItems: (items: Omit<PersonalItem, 'id'>[]) => void;
}

// AI-powered data validation and cleaning for personal items
const aiValidateAndCleanPersonalData = (items: any[]) => {
  const cleaned = items.map((item, index) => {
    const issues: string[] = [];
    const suggestions: string[] = [];
    
    // Name validation and cleaning
    let name = item.name?.toString().trim() || `Item ${index + 1}`;
    if (name.length < 2) {
      issues.push("Name too short");
      name = `Item ${index + 1}`;
    }
    
    // Category validation and AI suggestion
    let category = item.category?.toString().trim() || '';
    if (!category) {
      category = aiCategorizePersonalItem(name);
      suggestions.push(`Suggested category: ${category}`);
    }
    
    // Location validation
    let location = item.location?.toString().trim() || '';
    if (!location) {
      location = aiSuggestLocation(category);
      suggestions.push(`Suggested location: ${location}`);
    }
    
    // Condition validation
    let condition = item.condition?.toString().toLowerCase().trim() || '';
    const validConditions = ['excellent', 'good', 'fair', 'poor'];
    if (!validConditions.includes(condition)) {
      condition = 'good';
      suggestions.push("Set condition to 'good' (default)");
    }
    
    // Price validation
    const purchasePrice = Math.max(0, parseFloat(item.purchase_price) || 0);
    let currentValue = Math.max(0, parseFloat(item.current_value) || 0);
    
    if (currentValue === 0 && purchasePrice > 0) {
      // Estimate depreciation based on category and condition
      const depreciationRate = getDepreciationRate(category, condition);
      currentValue = Math.round(purchasePrice * depreciationRate * 100) / 100;
      suggestions.push(`Estimated current value: $${currentValue}`);
    }
    
    // Date validation
    let purchaseDate = item.purchase_date || '';
    if (purchaseDate && !isValidDate(purchaseDate)) {
      purchaseDate = new Date().toISOString().split('T')[0];
      suggestions.push("Set purchase date to today");
    }
    
    return {
      original: item,
      cleaned: {
        name,
        description: item.description?.toString().trim() || '',
        category,
        location,
        condition,
        purchase_date: purchaseDate,
        purchase_price: purchasePrice,
        current_value: currentValue,
        warranty_expiry: item.warranty_expiry || '',
        serial_number: item.serial_number?.toString().trim() || '',
        model: item.model?.toString().trim() || '',
        brand: item.brand?.toString().trim() || '',
        notes: item.notes?.toString().trim() || ''
      },
      issues,
      suggestions
    };
  });
  
  return cleaned;
};

// Helper functions
const aiCategorizePersonalItem = (name: string): string => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('tv') || lowerName.includes('television') || lowerName.includes('monitor')) return 'Electronics';
  if (lowerName.includes('laptop') || lowerName.includes('computer') || lowerName.includes('phone')) return 'Electronics';
  if (lowerName.includes('sofa') || lowerName.includes('chair') || lowerName.includes('table')) return 'Furniture';
  if (lowerName.includes('bed') || lowerName.includes('dresser') || lowerName.includes('wardrobe')) return 'Furniture';
  if (lowerName.includes('watch') || lowerName.includes('ring') || lowerName.includes('necklace')) return 'Jewelry';
  if (lowerName.includes('book') || lowerName.includes('album') || lowerName.includes('cd')) return 'Books & Media';
  if (lowerName.includes('bike') || lowerName.includes('skis') || lowerName.includes('tennis')) return 'Sports & Recreation';
  if (lowerName.includes('drill') || lowerName.includes('hammer') || lowerName.includes('saw')) return 'Tools';
  if (lowerName.includes('car') || lowerName.includes('motorcycle') || lowerName.includes('vehicle')) return 'Vehicles';
  if (lowerName.includes('shirt') || lowerName.includes('dress') || lowerName.includes('shoes')) return 'Clothing';
  return 'Household Items';
};

const aiSuggestLocation = (category: string): string => {
  const locations: Record<string, string[]> = {
    'Electronics': ['Living Room', 'Office', 'Bedroom'],
    'Furniture': ['Living Room', 'Bedroom', 'Dining Room'],
    'Jewelry': ['Bedroom', 'Safe', 'Jewelry Box'],
    'Books & Media': ['Study', 'Living Room', 'Bedroom'],
    'Sports & Recreation': ['Garage', 'Basement', 'Sports Room'],
    'Tools': ['Garage', 'Workshop', 'Basement'],
    'Vehicles': ['Garage', 'Driveway', 'Parking Lot'],
    'Clothing': ['Closet', 'Wardrobe', 'Bedroom'],
    'Household Items': ['Storage Room', 'Basement', 'Attic']
  };
  
  const categoryLocations = locations[category] || ['Storage Room'];
  return categoryLocations[0];
};

const getDepreciationRate = (category: string, condition: string): number => {
  const baseRates: Record<string, number> = {
    'Electronics': 0.6,
    'Furniture': 0.7,
    'Jewelry': 0.8,
    'Books & Media': 0.5,
    'Sports & Recreation': 0.6,
    'Tools': 0.8,
    'Vehicles': 0.7,
    'Clothing': 0.3,
    'Household Items': 0.6
  };
  
  const conditionMultipliers: Record<string, number> = {
    'excellent': 1.0,
    'good': 0.8,
    'fair': 0.6,
    'poor': 0.3
  };
  
  const baseRate = baseRates[category] || 0.6;
  const conditionMultiplier = conditionMultipliers[condition] || 0.8;
  
  return baseRate * conditionMultiplier;
};

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

export function PersonalImportExportActions({ items, onImportItems }: PersonalImportExportActionsProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [validationResults, setValidationResults] = useState<any[]>([]);
  const [showValidation, setShowValidation] = useState(false);

  const handleExportCSV = () => {
    if (items.length === 0) {
      toast({
        title: "No Data",
        description: "No personal items to export",
        variant: "destructive"
      });
      return;
    }

    const headers = [
      "Name",
      "Description",
      "Category",
      "Location",
      "Condition",
      "Purchase Date",
      "Purchase Price",
      "Current Value",
      "Warranty Expiry",
      "Serial Number",
      "Model",
      "Brand",
      "Notes"
    ];

    const csvContent = [
      headers.join(","),
      ...items.map(item => [
        `"${item.name}"`,
        `"${item.description || ''}"`,
        item.category || '',
        item.location || '',
        item.condition,
        item.purchase_date || '',
        item.purchase_price || 0,
        item.current_value || 0,
        item.warranty_expiry || '',
        item.serial_number || '',
        item.model || '',
        item.brand || '',
        `"${item.notes || ''}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `personal_inventory_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: `Exported ${items.length} personal items to CSV`
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
      const requiredHeaders = ["Name"];
      
      const missingHeaders = requiredHeaders.filter(req => 
        !headers.some(h => h.toLowerCase().includes(req.toLowerCase()))
      );

      if (missingHeaders.length > 0) {
        throw new Error(`Missing required column: ${missingHeaders.join(", ")}`);
      }

      setImportProgress(60);
      // Parse raw data
      const rawItems = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map(v => v.trim().replace(/"/g, ""));
        if (values.length < 1) continue;

        const item = {
          name: values[0],
          description: values[1],
          category: values[2],
          location: values[3],
          condition: values[4],
          purchase_date: values[5],
          purchase_price: values[6],
          current_value: values[7],
          warranty_expiry: values[8],
          serial_number: values[9],
          model: values[10],
          brand: values[11],
          notes: values[12]
        };
        rawItems.push(item);
      }

      setImportProgress(80);
      // AI validation and cleaning
      const validatedItems = aiValidateAndCleanPersonalData(rawItems);
      
      setValidationResults(validatedItems);
      setShowValidation(true);
      setImportProgress(100);

      const cleanedItems = validatedItems.map(p => p.cleaned);
      const totalIssues = validatedItems.reduce((sum, p) => sum + p.issues.length, 0);
      const totalSuggestions = validatedItems.reduce((sum, p) => sum + p.suggestions.length, 0);

      onImportItems(cleanedItems);
      
      toast({
        title: "AI Import Complete",
        description: `Imported ${cleanedItems.length} personal items. ${totalSuggestions} AI suggestions applied, ${totalIssues} issues detected.`
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
      "Description",
      "Category",
      "Location",
      "Condition",
      "Purchase Date",
      "Purchase Price",
      "Current Value",
      "Warranty Expiry",
      "Serial Number",
      "Model",
      "Brand",
      "Notes"
    ];

    const sampleData = [
      "MacBook Pro",
      "15-inch laptop for work",
      "Electronics",
      "Office",
      "good",
      "2023-01-15",
      "2500.00",
      "2000.00",
      "2026-01-15",
      "ABC123456789",
      "MacBook Pro",
      "Apple",
      "Primary work laptop"
    ];

    const csvContent = [
      templateHeaders.join(","),
      sampleData.join(",")
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "personal_inventory_template.csv");
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
            <Home className="h-5 w-5 text-primary" />
            Personal Inventory Import / Export
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Export Section */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Export Personal Items</Label>
            <p className="text-sm text-muted-foreground">
              Export all your personal inventory data to CSV format for backup or insurance purposes.
            </p>
            <Button onClick={handleExportCSV} className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export to CSV ({items.length} items)
            </Button>
          </div>

          <Separator />

          {/* Import Section */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Import Personal Items</Label>
            <p className="text-sm text-muted-foreground">
              Import personal items from a CSV file. Required column: Name.
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
                  <li>• Automatic category detection and location suggestions</li>
                  <li>• Smart value estimation based on condition and age</li>
                  <li>• Data validation and cleaning</li>
                  <li>• Missing information completion</li>
                  <li>• Condition assessment and depreciation calculation</li>
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
                  {validationResults.length} Items Processed
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
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="font-medium">{result.cleaned.name}</div>
                    {result.suggestions.length > 0 && (
                      <div className="text-sm text-green-600 mt-1">
                        <CheckCircle className="h-3 w-3 inline mr-1" />
                        {result.suggestions.join(", ")}
                      </div>
                    )}
                    {result.issues.length > 0 && (
                      <div className="text-sm text-orange-600 mt-1">
                        <AlertCircle className="h-3 w-3 inline mr-1" />
                        {result.issues.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
                {validationResults.length > 10 && (
                  <div className="text-center text-sm text-muted-foreground">
                    ...and {validationResults.length - 10} more items
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