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
import { useToast } from "@/hooks/use-toast";
import { 
  Receipt, 
  Brain, 
  Sparkles, 
  Upload, 
  Camera, 
  DollarSign, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Tag, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp, 
  Zap,
  PieChart,
  BarChart3,
  Target,
  Lightbulb,
  Clock,
  Building
} from "lucide-react";

interface Expense {
  id: string;
  receipt: {
    receiptNumber: string;
    merchant: string;
    address: string;
    date: string;
    time: string;
    total: number;
    tax: number;
    currency: string;
  };
  categorization: {
    primaryCategory: string;
    subCategory: string;
    confidence: number;
    suggestedGLCode: string;
    businessPurpose: string;
    isBusinessExpense: boolean;
  };
  employee: {
    name: string;
    department: string;
    project: string;
    approver: string;
  };
  compliance: {
    isCompliant: boolean;
    missingFields: string[];
    policyViolations: string[];
    requiresReceipt: boolean;
    needsApproval: boolean;
  };
  aiAnalysis: {
    duplicateRisk: number;
    fraudScore: number;
    categoryConfidence: number;
    budgetImpact: number;
    trends: string[];
    recommendations: string[];
  };
}

interface ExpenseManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense?: Expense | null;
  onSaveExpense: (expense: Omit<Expense, 'id'>) => void;
}

// AI-powered receipt OCR simulation
const simulateReceiptOCR = (file: File): Promise<Partial<Expense>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData: Partial<Expense> = {
        receipt: {
          receiptNumber: `R${Date.now().toString().slice(-6)}`,
          merchant: 'TechCorp Office Solutions',
          address: '456 Business Plaza, Tech City, CA 90210',
          date: new Date().toISOString().split('T')[0],
          time: '14:32',
          total: 127.85,
          tax: 10.23,
          currency: 'USD'
        },
        categorization: {
          primaryCategory: 'Office Supplies',
          subCategory: 'Computer Equipment',
          confidence: 92,
          suggestedGLCode: '6200',
          businessPurpose: 'Computer accessories for development team',
          isBusinessExpense: true
        },
        employee: {
          name: 'John Smith',
          department: 'Engineering',
          project: 'Q1 Development',
          approver: 'Jane Doe'
        },
        compliance: {
          isCompliant: true,
          missingFields: [],
          policyViolations: [],
          requiresReceipt: true,
          needsApproval: false
        },
        aiAnalysis: {
          duplicateRisk: 8,
          fraudScore: 12,
          categoryConfidence: 92,
          budgetImpact: 15,
          trends: [
            'Office supplies spending up 12% this quarter',
            'Computer equipment purchases trending higher',
            'Department spending within budget limits'
          ],
          recommendations: [
            'Expense complies with company policy',
            'Receipt image quality: excellent',
            'Suggested approval: auto-approve',
            'Budget impact: minimal'
          ]
        }
      };
      resolve(mockData);
    }, 2000);
  });
};

// AI expense categorization
const categorizeExpense = (merchant: string, amount: number, description: string) => {
  const categoryRules = {
    'Office Supplies': {
      keywords: ['office', 'supply', 'depot', 'staples', 'paper'],
      glCode: '6200',
      confidence: 85
    },
    'Travel': {
      keywords: ['hotel', 'airline', 'uber', 'lyft', 'taxi', 'gas'],
      glCode: '6300',
      confidence: 90
    },
    'Meals & Entertainment': {
      keywords: ['restaurant', 'cafe', 'bar', 'catering', 'lunch'],
      glCode: '6400',
      confidence: 88
    },
    'Software & Technology': {
      keywords: ['software', 'tech', 'computer', 'app', 'subscription'],
      glCode: '6150',
      confidence: 92
    },
    'Marketing': {
      keywords: ['marketing', 'advertising', 'promotion', 'social'],
      glCode: '6500',
      confidence: 87
    }
  };

  const merchantLower = merchant.toLowerCase();
  let bestMatch = { category: 'Miscellaneous', confidence: 50, glCode: '6999' };

  Object.entries(categoryRules).forEach(([category, rules]) => {
    const matches = rules.keywords.filter(keyword => 
      merchantLower.includes(keyword) || description.toLowerCase().includes(keyword)
    ).length;
    
    if (matches > 0) {
      const confidence = Math.min(95, rules.confidence + (matches * 5));
      if (confidence > bestMatch.confidence) {
        bestMatch = { category, confidence, glCode: rules.glCode };
      }
    }
  });

  return bestMatch;
};

// AI budget impact analysis
const analyzeBudgetImpact = (amount: number, category: string, department: string) => {
  // Mock budget data
  const budgets = {
    'Office Supplies': { budget: 5000, spent: 3200 },
    'Travel': { budget: 15000, spent: 8900 },
    'Software & Technology': { budget: 25000, spent: 18500 }
  };

  const budget = budgets[category as keyof typeof budgets] || { budget: 10000, spent: 5000 };
  const newSpent = budget.spent + amount;
  const impact = (newSpent / budget.budget) * 100;

  return {
    impact: Math.min(100, impact),
    remaining: budget.budget - newSpent,
    isOverBudget: newSpent > budget.budget,
    warningLevel: impact > 90 ? 'high' : impact > 75 ? 'medium' : 'low'
  };
};

export function ExpenseManagementDialog({ open, onOpenChange, expense, onSaveExpense }: ExpenseManagementDialogProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("capture");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [extractedData, setExtractedData] = useState<Partial<Expense> | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const [formData, setFormData] = useState<Omit<Expense, 'id'>>({
    receipt: {
      receiptNumber: '',
      merchant: '',
      address: '',
      date: '',
      time: '',
      total: 0,
      tax: 0,
      currency: 'USD'
    },
    categorization: {
      primaryCategory: '',
      subCategory: '',
      confidence: 0,
      suggestedGLCode: '',
      businessPurpose: '',
      isBusinessExpense: true
    },
    employee: {
      name: '',
      department: '',
      project: '',
      approver: ''
    },
    compliance: {
      isCompliant: true,
      missingFields: [],
      policyViolations: [],
      requiresReceipt: true,
      needsApproval: false
    },
    aiAnalysis: {
      duplicateRisk: 0,
      fraudScore: 0,
      categoryConfidence: 0,
      budgetImpact: 0,
      trends: [],
      recommendations: []
    }
  });

  const categories = [
    'Office Supplies',
    'Travel',
    'Meals & Entertainment',
    'Software & Technology',
    'Marketing',
    'Professional Services',
    'Utilities',
    'Equipment',
    'Training',
    'Miscellaneous'
  ];

  const departments = ['Engineering', 'Sales', 'Marketing', 'Operations', 'HR', 'Finance'];

  // Apply extracted data
  useEffect(() => {
    if (extractedData) {
      setFormData(prev => ({
        ...prev,
        ...extractedData,
        receipt: { ...prev.receipt, ...extractedData.receipt },
        categorization: { ...prev.categorization, ...extractedData.categorization },
        employee: { ...prev.employee, ...extractedData.employee },
        compliance: { ...prev.compliance, ...extractedData.compliance },
        aiAnalysis: { ...prev.aiAnalysis, ...extractedData.aiAnalysis }
      }));
      setActiveTab("details");
    }
  }, [extractedData]);

  // Trigger AI analysis when key fields change
  useEffect(() => {
    if (formData.receipt.merchant && formData.receipt.total > 0) {
      const categoryAnalysis = categorizeExpense(
        formData.receipt.merchant, 
        formData.receipt.total, 
        formData.categorization.businessPurpose
      );
      
      const budgetAnalysis = analyzeBudgetImpact(
        formData.receipt.total,
        categoryAnalysis.category,
        formData.employee.department
      );

      setFormData(prev => ({
        ...prev,
        categorization: {
          ...prev.categorization,
          primaryCategory: categoryAnalysis.category,
          confidence: categoryAnalysis.confidence,
          suggestedGLCode: categoryAnalysis.glCode
        },
        aiAnalysis: {
          ...prev.aiAnalysis,
          categoryConfidence: categoryAnalysis.confidence,
          budgetImpact: budgetAnalysis.impact,
          recommendations: [
            `Suggested category: ${categoryAnalysis.category} (${categoryAnalysis.confidence}% confidence)`,
            `Budget impact: ${budgetAnalysis.impact.toFixed(1)}% of ${categoryAnalysis.category} budget`,
            budgetAnalysis.isOverBudget ? '⚠️ This expense would exceed budget' : '✅ Within budget limits',
            `Remaining budget: $${budgetAnalysis.remaining.toFixed(2)}`
          ]
        }
      }));
    }
  }, [formData.receipt.merchant, formData.receipt.total, formData.employee.department]);

  const handleFileUpload = async (file: File) => {
    if (!file.type.includes('image') && !file.type.includes('pdf')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an image or PDF file",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);

    const steps = [
      { progress: 25, message: "Analyzing receipt..." },
      { progress: 50, message: "Extracting data..." },
      { progress: 75, message: "Categorizing expense..." },
      { progress: 100, message: "Analysis complete!" }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setProcessingProgress(step.progress);
    }

    try {
      const extracted = await simulateReceiptOCR(file);
      setExtractedData(extracted);
      
      toast({
        title: "Receipt Processed",
        description: "Expense data extracted and categorized automatically"
      });
    } catch (error) {
      toast({
        title: "Processing Error",
        description: "Failed to process receipt",
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
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.receipt.merchant || formData.receipt.total <= 0) {
      toast({
        title: "Validation Error",
        description: "Merchant name and amount are required",
        variant: "destructive"
      });
      return;
    }

    onSaveExpense(formData);
    
    toast({
      title: "Expense Saved",
      description: `Expense of $${formData.receipt.total.toFixed(2)} has been saved for approval`
    });

    onOpenChange(false);
  };

  const getComplianceStatus = () => {
    if (formData.compliance.isCompliant) {
      return <Badge variant="secondary" className="text-green-600">Compliant</Badge>;
    }
    return <Badge variant="destructive">Non-Compliant</Badge>;
  };

  const getBudgetStatus = (impact: number) => {
    if (impact > 90) return <Badge variant="destructive">Over Budget</Badge>;
    if (impact > 75) return <Badge variant="outline" className="text-yellow-600">Near Limit</Badge>;
    return <Badge variant="secondary" className="text-green-600">Within Budget</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Smart Expense Management
            <Sparkles className="h-4 w-4 text-primary ml-auto" />
          </DialogTitle>
          <DialogDescription>
            AI-powered expense processing with receipt OCR, smart categorization, and compliance checking.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
            <TabsTrigger value="capture">Receipt Capture</TabsTrigger>
            <TabsTrigger value="details">Expense Details</TabsTrigger>
            <TabsTrigger value="categorization">Categorization</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TabsContent value="capture" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Receipt Capture & OCR
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
                          <h3 className="font-medium">AI Processing Receipt...</h3>
                          <Progress value={processingProgress} className="w-full max-w-md mx-auto" />
                          <p className="text-sm text-muted-foreground">
                            {processingProgress < 25 ? 'Analyzing receipt...' :
                             processingProgress < 50 ? 'Extracting data...' :
                             processingProgress < 75 ? 'Categorizing expense...' : 'Analysis complete!'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Receipt className="h-12 w-12 mx-auto text-muted-foreground" />
                        <div className="space-y-2">
                          <h3 className="font-medium">Upload receipt or take photo</h3>
                          <p className="text-sm text-muted-foreground">
                            AI will automatically extract merchant, amount, and categorize the expense.
                          </p>
                        </div>
                        <div className="flex gap-2 justify-center">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                            className="hidden"
                            id="receipt-upload"
                          />
                          <Button type="button" onClick={() => document.getElementById('receipt-upload')?.click()}>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload File
                          </Button>
                          <Button type="button" variant="outline">
                            <Camera className="h-4 w-4 mr-2" />
                            Take Photo
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {extractedData && (
                    <Card className="mt-6 border-green-200 bg-green-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-900">Receipt Processed</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-green-800">
                              <strong>Merchant:</strong> {extractedData.receipt?.merchant}
                            </p>
                            <p className="text-green-800">
                              <strong>Amount:</strong> ${extractedData.receipt?.total?.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-green-800">
                              <strong>Category:</strong> {extractedData.categorization?.primaryCategory}
                            </p>
                            <p className="text-green-800">
                              <strong>Confidence:</strong> {extractedData.categorization?.confidence}%
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
                      <Receipt className="h-4 w-4" />
                      Receipt Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Merchant Name *</Label>
                      <Input
                        value={formData.receipt.merchant}
                        onChange={(e) => handleInputChange('receipt', 'merchant', e.target.value)}
                        placeholder="Store/Restaurant name"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Amount *</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={formData.receipt.total}
                          onChange={(e) => handleInputChange('receipt', 'total', parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tax Amount</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={formData.receipt.tax}
                          onChange={(e) => handleInputChange('receipt', 'tax', parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Input
                          type="date"
                          value={formData.receipt.date}
                          onChange={(e) => handleInputChange('receipt', 'date', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <Input
                          type="time"
                          value={formData.receipt.time}
                          onChange={(e) => handleInputChange('receipt', 'time', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Receipt Number</Label>
                      <Input
                        value={formData.receipt.receiptNumber}
                        onChange={(e) => handleInputChange('receipt', 'receiptNumber', e.target.value)}
                        placeholder="Receipt #"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Address</Label>
                      <Textarea
                        value={formData.receipt.address}
                        onChange={(e) => handleInputChange('receipt', 'address', e.target.value)}
                        placeholder="Merchant address"
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Employee Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Employee Name</Label>
                      <Input
                        value={formData.employee.name}
                        onChange={(e) => handleInputChange('employee', 'name', e.target.value)}
                        placeholder="Employee name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select value={formData.employee.department} onValueChange={(value) => handleInputChange('employee', 'department', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Project/Cost Center</Label>
                      <Input
                        value={formData.employee.project}
                        onChange={(e) => handleInputChange('employee', 'project', e.target.value)}
                        placeholder="Project name or cost center"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Approver</Label>
                      <Input
                        value={formData.employee.approver}
                        onChange={(e) => handleInputChange('employee', 'approver', e.target.value)}
                        placeholder="Manager name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Business Purpose</Label>
                      <Textarea
                        value={formData.categorization.businessPurpose}
                        onChange={(e) => handleInputChange('categorization', 'businessPurpose', e.target.value)}
                        placeholder="Describe the business purpose of this expense..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="categorization" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Smart Categorization
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Primary Category</Label>
                      <Select value={formData.categorization.primaryCategory} onValueChange={(value) => handleInputChange('categorization', 'primaryCategory', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>GL Account Code</Label>
                      <Input
                        value={formData.categorization.suggestedGLCode}
                        onChange={(e) => handleInputChange('categorization', 'suggestedGLCode', e.target.value)}
                        placeholder="GL Code"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Sub-Category</Label>
                    <Input
                      value={formData.categorization.subCategory}
                      onChange={(e) => handleInputChange('categorization', 'subCategory', e.target.value)}
                      placeholder="More specific category"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.categorization.isBusinessExpense}
                      onChange={(e) => handleInputChange('categorization', 'isBusinessExpense', e.target.checked)}
                      className="rounded"
                    />
                    <Label>This is a legitimate business expense</Label>
                  </div>

                  {formData.categorization.confidence > 0 && (
                    <Card className="border-blue-200 bg-blue-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-blue-900">AI Categorization</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-blue-800">Confidence Level:</span>
                            <div className="flex items-center gap-2">
                              <Progress value={formData.categorization.confidence} className="w-20" />
                              <span className="text-blue-900 font-medium">{formData.categorization.confidence}%</span>
                            </div>
                          </div>
                          <p className="text-sm text-blue-700">
                            AI suggests this expense belongs to "{formData.categorization.primaryCategory}" 
                            with {formData.categorization.confidence}% confidence.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Compliance Check
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Compliance Status:</span>
                    {getComplianceStatus()}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Receipt Required:</span>
                      <Badge variant={formData.compliance.requiresReceipt ? "outline" : "secondary"}>
                        {formData.compliance.requiresReceipt ? "Yes" : "No"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Approval Required:</span>
                      <Badge variant={formData.compliance.needsApproval ? "outline" : "secondary"}>
                        {formData.compliance.needsApproval ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </div>

                  {formData.compliance.missingFields.length > 0 && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="font-medium text-yellow-800 mb-2">Missing Required Fields:</p>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {formData.compliance.missingFields.map((field, index) => (
                          <li key={index}>• {field}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Budget Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">{formData.aiAnalysis.budgetImpact.toFixed(1)}%</span>
                        {getBudgetStatus(formData.aiAnalysis.budgetImpact)}
                      </div>
                      <Progress value={formData.aiAnalysis.budgetImpact} className="w-full" />
                      <p className="text-sm text-muted-foreground">of category budget</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Fraud Risk</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">{formData.aiAnalysis.fraudScore}%</span>
                        <Badge variant="secondary" className="text-green-600">Low</Badge>
                      </div>
                      <Progress value={formData.aiAnalysis.fraudScore} className="w-full" />
                      <p className="text-sm text-muted-foreground">risk assessment</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Duplicate Risk</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">{formData.aiAnalysis.duplicateRisk}%</span>
                        <Badge variant="secondary" className="text-green-600">Low</Badge>
                      </div>
                      <Progress value={formData.aiAnalysis.duplicateRisk} className="w-full" />
                      <p className="text-sm text-muted-foreground">chance of duplicate</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-900">
                    <TrendingUp className="h-4 w-4" />
                    Spending Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {formData.aiAnalysis.trends.map((trend, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-white rounded border">
                        <BarChart3 className="h-4 w-4 text-green-600 mt-0.5" />
                        <p className="text-sm text-green-800">{trend}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <Lightbulb className="h-4 w-4" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {formData.aiAnalysis.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-white rounded border">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                        <p className="text-sm text-blue-800">{rec}</p>
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
                {expense ? 'Update Expense' : 'Save Expense'}
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}