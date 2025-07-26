import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Brain, 
  Sparkles, 
  Upload, 
  Camera, 
  DollarSign, 
  Calendar, 
  User, 
  Building, 
  Tag, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp, 
  Zap,
  Eye,
  Download,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Clock,
  Target
} from "lucide-react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  vendor: {
    name: string;
    email: string;
    phone: string;
    address: string;
    taxId: string;
  };
  customer: {
    name: string;
    email: string;
    address: string;
  };
  details: {
    issueDate: string;
    dueDate: string;
    currency: string;
    subtotal: number;
    taxRate: number;
    taxAmount: number;
    totalAmount: number;
    notes: string;
  };
  lineItems: LineItem[];
  paymentTerms: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  aiAnalysis: {
    duplicateRisk: number;
    fraudScore: number;
    categoryConfidence: number;
    suggestedCategory: string;
    extractionAccuracy: number;
    recommendations: string[];
  };
}

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  category: string;
}

interface SmartInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice?: Invoice | null;
  onSaveInvoice: (invoice: Omit<Invoice, 'id'>) => void;
}

// AI-powered OCR simulation for invoice data extraction
const simulateOCRExtraction = (file: File): Promise<Partial<Invoice>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate OCR results with high accuracy
      const mockData: Partial<Invoice> = {
        invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
        vendor: {
          name: 'TechSupply Corp',
          email: 'billing@techsupply.com',
          phone: '(555) 123-4567',
          address: '123 Business Ave, Tech City, CA 90210',
          taxId: '12-3456789'
        },
        customer: {
          name: 'Your Company Name',
          email: 'accounting@yourcompany.com',
          address: '456 Company St, Business City, CA 90211'
        },
        details: {
          issueDate: new Date().toISOString().split('T')[0],
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          currency: 'USD',
          subtotal: 1250.00,
          taxRate: 8.25,
          taxAmount: 103.13,
          totalAmount: 1353.13,
          notes: 'Payment due within 30 days'
        },
        lineItems: [
          {
            id: '1',
            description: 'Software License - Annual',
            quantity: 1,
            unitPrice: 800.00,
            amount: 800.00,
            category: 'Software'
          },
          {
            id: '2',
            description: 'Technical Support - Monthly',
            quantity: 3,
            unitPrice: 150.00,
            amount: 450.00,
            category: 'Services'
          }
        ],
        paymentTerms: 'Net 30',
        status: 'draft' as const,
        aiAnalysis: {
          duplicateRisk: 15,
          fraudScore: 8,
          categoryConfidence: 94,
          suggestedCategory: 'Technology Expenses',
          extractionAccuracy: 96,
          recommendations: [
            'High confidence OCR extraction - 96% accuracy',
            'No duplicate invoice detected in system',
            'Low fraud risk - vendor verified',
            'Suggested GL code: 6150 (Software & Technology)'
          ]
        }
      };
      resolve(mockData);
    }, 2500);
  });
};

// AI fraud detection
const analyzeFraudRisk = (invoiceData: Partial<Invoice>) => {
  let riskScore = 0;
  const risks: string[] = [];

  // Check for suspicious amounts
  if (invoiceData.details?.totalAmount && invoiceData.details.totalAmount > 10000) {
    riskScore += 15;
    risks.push('High amount transaction');
  }

  // Check vendor verification
  if (!invoiceData.vendor?.taxId) {
    riskScore += 25;
    risks.push('Vendor tax ID missing');
  }

  // Check duplicate patterns
  if (Math.random() > 0.8) {
    riskScore += 20;
    risks.push('Similar invoice detected recently');
  }

  return { riskScore: Math.min(100, riskScore), risks };
};

// AI category suggestion
const suggestCategory = (lineItems: LineItem[]) => {
  const categories = {
    'Software': ['software', 'license', 'subscription', 'app'],
    'Office Supplies': ['paper', 'pen', 'staples', 'supplies'],
    'Travel': ['hotel', 'flight', 'taxi', 'travel', 'meal'],
    'Marketing': ['advertising', 'marketing', 'promotion', 'social'],
    'Utilities': ['electricity', 'water', 'gas', 'internet', 'phone'],
    'Professional Services': ['consulting', 'legal', 'accounting', 'professional']
  };

  const suggestions: Record<string, number> = {};
  
  lineItems.forEach(item => {
    Object.entries(categories).forEach(([category, keywords]) => {
      const matches = keywords.filter(keyword => 
        item.description.toLowerCase().includes(keyword)
      ).length;
      suggestions[category] = (suggestions[category] || 0) + matches;
    });
  });

  const topCategory = Object.entries(suggestions).sort(([,a], [,b]) => b - a)[0];
  return topCategory ? { category: topCategory[0], confidence: Math.min(95, topCategory[1] * 25) } : null;
};

export function SmartInvoiceDialog({ open, onOpenChange, invoice, onSaveInvoice }: SmartInvoiceDialogProps) {
  const { formatCurrency } = useGlobalization();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("upload");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [extractedData, setExtractedData] = useState<Partial<Invoice> | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const [formData, setFormData] = useState<Omit<Invoice, 'id'>>({
    invoiceNumber: '',
    vendor: {
      name: '',
      email: '',
      phone: '',
      address: '',
      taxId: ''
    },
    customer: {
      name: '',
      email: '',
      address: ''
    },
    details: {
      issueDate: '',
      dueDate: '',
      currency: 'USD',
      subtotal: 0,
      taxRate: 0,
      taxAmount: 0,
      totalAmount: 0,
      notes: ''
    },
    lineItems: [],
    paymentTerms: 'Net 30',
    status: 'draft',
    aiAnalysis: {
      duplicateRisk: 0,
      fraudScore: 0,
      categoryConfidence: 0,
      suggestedCategory: '',
      extractionAccuracy: 0,
      recommendations: []
    }
  });

  // Apply extracted data to form
  useEffect(() => {
    if (extractedData) {
      setFormData(prev => ({
        ...prev,
        ...extractedData,
        vendor: { ...prev.vendor, ...extractedData.vendor },
        customer: { ...prev.customer, ...extractedData.customer },
        details: { ...prev.details, ...extractedData.details },
        lineItems: extractedData.lineItems || prev.lineItems,
        aiAnalysis: { ...prev.aiAnalysis, ...extractedData.aiAnalysis }
      }));
      setActiveTab("details");
    }
  }, [extractedData]);

  const handleFileUpload = async (file: File) => {
    if (!file.type.includes('pdf') && !file.type.includes('image')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF or image file",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);

    // Simulate processing steps
    const steps = [
      { progress: 20, message: "Uploading file..." },
      { progress: 40, message: "Running OCR analysis..." },
      { progress: 60, message: "Extracting invoice data..." },
      { progress: 80, message: "Applying AI validation..." },
      { progress: 100, message: "Processing complete!" }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setProcessingProgress(step.progress);
    }

    try {
      const extracted = await simulateOCRExtraction(file);
      setExtractedData(extracted);
      
      toast({
        title: "OCR Complete",
        description: `Invoice data extracted with ${extracted.aiAnalysis?.extractionAccuracy}% accuracy`
      });
    } catch (error) {
      toast({
        title: "Processing Error",
        description: "Failed to extract invoice data",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleInputChange = (section: keyof typeof formData, field: string, value: any) => {
    if (section === 'vendor' || section === 'customer' || section === 'details' || section === 'aiAnalysis') {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      amount: 0,
      category: ''
    };
    setFormData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, newItem]
    }));
  };

  const updateLineItem = (index: number, field: keyof LineItem, value: any) => {
    setFormData(prev => {
      const updatedItems = [...prev.lineItems];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      
      // Auto-calculate amount
      if (field === 'quantity' || field === 'unitPrice') {
        updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].unitPrice;
      }
      
      return { ...prev, lineItems: updatedItems };
    });
  };

  const removeLineItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter((_, i) => i !== index)
    }));
  };

  // Calculate totals
  useEffect(() => {
    const subtotal = formData.lineItems.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = subtotal * (formData.details.taxRate / 100);
    const totalAmount = subtotal + taxAmount;

    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        subtotal,
        taxAmount,
        totalAmount
      }
    }));
  }, [formData.lineItems, formData.details.taxRate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.invoiceNumber || !formData.vendor.name) {
      toast({
        title: "Validation Error",
        description: "Invoice number and vendor name are required",
        variant: "destructive"
      });
      return;
    }

    // Run AI analysis
    const fraudAnalysis = analyzeFraudRisk(formData);
    const categoryAnalysis = suggestCategory(formData.lineItems);

    const finalData = {
      ...formData,
      aiAnalysis: {
        ...formData.aiAnalysis,
        fraudScore: fraudAnalysis.riskScore,
        suggestedCategory: categoryAnalysis?.category || 'Miscellaneous',
        categoryConfidence: categoryAnalysis?.confidence || 50,
        recommendations: [
          ...formData.aiAnalysis.recommendations,
          ...fraudAnalysis.risks.map(risk => `⚠️ ${risk}`),
          ...(categoryAnalysis ? [`📂 Suggested category: ${categoryAnalysis.category}`] : [])
        ]
      }
    };

    onSaveInvoice(finalData);
    
    toast({
      title: "Invoice Processed",
      description: `Invoice ${formData.invoiceNumber} has been saved with AI validation`
    });

    onOpenChange(false);
  };

  const getRiskBadge = (score: number) => {
    if (score < 20) return <Badge variant="secondary" className="text-green-600">Low Risk</Badge>;
    if (score < 50) return <Badge variant="outline" className="text-yellow-600">Medium Risk</Badge>;
    return <Badge variant="destructive">High Risk</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Smart Invoice Processing
            <Sparkles className="h-4 w-4 text-primary ml-auto" />
          </DialogTitle>
          <DialogDescription>
            AI-powered invoice processing with OCR extraction, fraud detection, and smart categorization.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
            <TabsTrigger value="upload">Upload & Extract</TabsTrigger>
            <TabsTrigger value="details">Invoice Details</TabsTrigger>
            <TabsTrigger value="line-items">Line Items</TabsTrigger>
            <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TabsContent value="upload" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Document Upload & OCR
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      isDragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                  >
                    {isProcessing ? (
                      <div className="space-y-4">
                        <Brain className="h-12 w-12 mx-auto text-primary animate-pulse" />
                        <div className="space-y-2">
                          <h3 className="font-medium">AI Processing Invoice...</h3>
                          <Progress value={processingProgress} className="w-full max-w-md mx-auto" />
                          <p className="text-sm text-muted-foreground">
                            {processingProgress < 40 ? 'Uploading file...' :
                             processingProgress < 60 ? 'Running OCR analysis...' :
                             processingProgress < 80 ? 'Extracting invoice data...' :
                             processingProgress < 100 ? 'Applying AI validation...' : 'Processing complete!'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                        <div className="space-y-2">
                          <h3 className="font-medium">Drop invoice file here or click to upload</h3>
                          <p className="text-sm text-muted-foreground">
                            Supports PDF, JPG, PNG files. AI will extract all invoice data automatically.
                          </p>
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                          className="hidden"
                          id="invoice-upload"
                        />
                        <Button type="button" onClick={() => document.getElementById('invoice-upload')?.click()}>
                          <Upload className="h-4 w-4 mr-2" />
                          Choose File
                        </Button>
                      </div>
                    )}
                  </div>

                  {extractedData && (
                    <Card className="mt-6 border-green-200 bg-green-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-900">Extraction Complete</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-green-800">
                              <strong>Vendor:</strong> {extractedData.vendor?.name}
                            </p>
                            <p className="text-green-800">
                              <strong>Amount:</strong> {formatCurrency(extractedData.details?.totalAmount || 0)}
                            </p>
                          </div>
                          <div>
                            <p className="text-green-800">
                              <strong>Accuracy:</strong> {extractedData.aiAnalysis?.extractionAccuracy}%
                            </p>
                            <p className="text-green-800">
                              <strong>Items:</strong> {extractedData.lineItems?.length || 0} detected
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Vendor Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Vendor Name *</Label>
                      <Input
                        value={formData.vendor.name}
                        onChange={(e) => handleInputChange('vendor', 'name', e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={formData.vendor.email}
                        onChange={(e) => handleInputChange('vendor', 'email', e.target.value)}
                        placeholder="vendor@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Tax ID</Label>
                      <Input
                        value={formData.vendor.taxId}
                        onChange={(e) => handleInputChange('vendor', 'taxId', e.target.value)}
                        placeholder="12-3456789"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Address</Label>
                      <Textarea
                        value={formData.vendor.address}
                        onChange={(e) => handleInputChange('vendor', 'address', e.target.value)}
                        placeholder="Full address"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Customer Name</Label>
                      <Input
                        value={formData.customer.name}
                        onChange={(e) => handleInputChange('customer', 'name', e.target.value)}
                        placeholder="Customer Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={formData.customer.email}
                        onChange={(e) => handleInputChange('customer', 'email', e.target.value)}
                        placeholder="customer@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Address</Label>
                      <Textarea
                        value={formData.customer.address}
                        onChange={(e) => handleInputChange('customer', 'address', e.target.value)}
                        placeholder="Customer address"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Invoice Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Invoice Number *</Label>
                      <Input
                        value={formData.invoiceNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                        placeholder="INV-001"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Issue Date</Label>
                      <Input
                        type="date"
                        value={formData.details.issueDate}
                        onChange={(e) => handleInputChange('details', 'issueDate', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Due Date</Label>
                      <Input
                        type="date"
                        value={formData.details.dueDate}
                        onChange={(e) => handleInputChange('details', 'dueDate', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Select value={formData.details.currency} onValueChange={(value) => handleInputChange('details', 'currency', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Payment Terms</Label>
                      <Select value={formData.paymentTerms} onValueChange={(value) => setFormData(prev => ({ ...prev, paymentTerms: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Net 15">Net 15</SelectItem>
                          <SelectItem value="Net 30">Net 30</SelectItem>
                          <SelectItem value="Net 60">Net 60</SelectItem>
                          <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Tax Rate (%)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.details.taxRate}
                        onChange={(e) => handleInputChange('details', 'taxRate', parseFloat(e.target.value) || 0)}
                        placeholder="8.25"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Textarea
                      value={formData.details.notes}
                      onChange={(e) => handleInputChange('details', 'notes', e.target.value)}
                      placeholder="Additional invoice notes..."
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="line-items" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Line Items
                    </div>
                    <Button type="button" onClick={addLineItem} size="sm">
                      Add Item
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {formData.lineItems.map((item, index) => (
                      <div key={item.id} className="grid grid-cols-6 gap-2 items-end p-3 border rounded-lg">
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Input
                            value={item.description}
                            onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                            placeholder="Item description"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Quantity</Label>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateLineItem(index, 'quantity', parseInt(e.target.value) || 0)}
                            placeholder="1"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Unit Price</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) => updateLineItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Amount</Label>
                          <Input
                            value={formatCurrency(item.amount)}
                            readOnly
                            className="bg-muted"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Select value={item.category} onValueChange={(value) => updateLineItem(index, 'category', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Software">Software</SelectItem>
                              <SelectItem value="Hardware">Hardware</SelectItem>
                              <SelectItem value="Services">Services</SelectItem>
                              <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                              <SelectItem value="Travel">Travel</SelectItem>
                              <SelectItem value="Marketing">Marketing</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeLineItem(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="font-medium">{formatCurrency(formData.details.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax ({formData.details.taxRate}%):</span>
                        <span className="font-medium">{formatCurrency(formData.details.taxAmount)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>{formatCurrency(formData.details.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-analysis" className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      AI Risk Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Fraud Risk:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{formData.aiAnalysis.fraudScore}%</span>
                          {getRiskBadge(formData.aiAnalysis.fraudScore)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Duplicate Risk:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{formData.aiAnalysis.duplicateRisk}%</span>
                          {getRiskBadge(formData.aiAnalysis.duplicateRisk)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Extraction Accuracy:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{formData.aiAnalysis.extractionAccuracy}%</span>
                          <Badge variant="secondary" className="text-green-600">High</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Smart Categorization
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Suggested Category:</span>
                        <Badge variant="outline">{formData.aiAnalysis.suggestedCategory}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Confidence:</span>
                        <span className="font-medium">{formData.aiAnalysis.categoryConfidence}%</span>
                      </div>
                      <Progress value={formData.aiAnalysis.categoryConfidence} className="w-full" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <Sparkles className="h-4 w-4" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {formData.aiAnalysis.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-white rounded-lg border">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-900">{rec}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {invoice ? 'Update Invoice' : 'Save Invoice'}
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}