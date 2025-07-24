import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, FileText, AlertCircle } from "lucide-react";
import { InventoryItem } from "./InventoryTable";

interface ImportExportActionsProps {
  inventory: InventoryItem[];
  onImportProducts: (products: Omit<InventoryItem, 'id'>[]) => void;
}

export function ImportExportActions({ inventory, onImportProducts }: ImportExportActionsProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);

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

    try {
      const text = await file.text();
      const lines = text.trim().split("\n");
      
      if (lines.length < 2) {
        throw new Error("CSV file must contain headers and at least one data row");
      }

      const headers = lines[0].split(",").map(h => h.trim().replace(/"/g, ""));
      const requiredHeaders = ["Name", "SKU", "Category"];
      
      const missingHeaders = requiredHeaders.filter(req => 
        !headers.some(h => h.toLowerCase().includes(req.toLowerCase()))
      );

      if (missingHeaders.length > 0) {
        throw new Error(`Missing required columns: ${missingHeaders.join(", ")}`);
      }

      const products: Omit<InventoryItem, 'id'>[] = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map(v => v.trim().replace(/"/g, ""));
        
        if (values.length < 3) continue; // Skip invalid rows

        const product: Omit<InventoryItem, 'id'> = {
          name: values[0] || `Product ${i}`,
          sku: values[1] || `SKU-${Date.now()}-${i}`,
          category: values[2] || "Uncategorized",
          currentStock: parseInt(values[3]) || 0,
          minStock: parseInt(values[4]) || 0,
          maxStock: parseInt(values[5]) || 100,
          reorderPoint: parseInt(values[6]) || 0,
          unitCost: parseFloat(values[7]) || 0,
          sellingPrice: parseFloat(values[8]) || 0,
          supplier: values[9] || "Unknown",
          lastRestocked: values[10] || new Date().toISOString().split('T')[0],
          demand7Days: parseInt(values[11]) || 0,
          demand30Days: parseInt(values[12]) || 0,
          aiPrediction: {
            nextWeekDemand: parseInt(values[13]) || 0,
            confidence: parseInt(values[14]) || 75,
            recommendation: values[15] || "Imported product - review data"
          }
        };
        
        products.push(product);
      }

      if (products.length === 0) {
        throw new Error("No valid products found in CSV file");
      }

      onImportProducts(products);
      
      toast({
        title: "Import Successful",
        description: `Imported ${products.length} products from CSV`
      });

    } catch (error) {
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Failed to parse CSV file",
        variant: "destructive"
      });
    } finally {
      setImporting(false);
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Import / Export
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
                {importing ? "Importing..." : "Import CSV"}
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted">
            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Import Guidelines:</p>
              <ul className="space-y-1 text-xs">
                <li>• CSV file must include Name, SKU, and Category columns</li>
                <li>• Numeric fields will default to 0 if empty or invalid</li>
                <li>• Dates should be in YYYY-MM-DD format</li>
                <li>• Duplicate SKUs will be skipped during import</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}