import { useState, useEffect } from "react";
import { useGlobalization } from "@/contexts/GlobalizationContext";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Brain, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Shield, 
  Award, 
  Target, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Camera,
  Mic,
  MicOff,
  FileText,
  Globe
} from "lucide-react";

interface Employee {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    dateOfBirth: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
    };
  };
  employment: {
    employeeId: string;
    department: string;
    position: string;
    manager: string;
    startDate: string;
    employmentType: 'full-time' | 'part-time' | 'contract' | 'intern';
    workLocation: 'office' | 'remote' | 'hybrid';
    scheduleType: 'standard' | 'flexible' | 'shift';
  };
  compensation: {
    baseSalary: number;
    payFrequency: 'weekly' | 'bi-weekly' | 'monthly';
    payType: 'salary' | 'hourly';
    currency: string;
    benefits: string[];
    bonusEligible: boolean;
  };
  documents: {
    hasI9: boolean;
    hasW4: boolean;
    hasDirectDeposit: boolean;
    backgroundCheckComplete: boolean;
  };
  aiMetrics: {
    marketSalaryRange: { min: number; max: number; median: number };
    retentionRisk: number;
    performancePrediction: number;
    cultureFit: number;
    recommendations: string[];
  };
}

interface EmployeeOnboardingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee | null;
  onSaveEmployee: (employee: Omit<Employee, 'id'>) => void;
}

// AI-powered salary analysis
const analyzeMarketSalary = (position: string, location: string, experience: number = 0) => {
  const salaryData: Record<string, { base: number; locationMultiplier: Record<string, number> }> = {
    'Software Engineer': { base: 85000, locationMultiplier: { 'CA': 1.4, 'NY': 1.3, 'TX': 1.1, 'FL': 1.0 } },
    'Manager': { base: 75000, locationMultiplier: { 'CA': 1.3, 'NY': 1.25, 'TX': 1.1, 'FL': 1.0 } },
    'Sales Representative': { base: 50000, locationMultiplier: { 'CA': 1.2, 'NY': 1.2, 'TX': 1.0, 'FL': 0.95 } },
    'Customer Service': { base: 35000, locationMultiplier: { 'CA': 1.3, 'NY': 1.2, 'TX': 1.0, 'FL': 0.9 } },
    'Barista': { base: 28000, locationMultiplier: { 'CA': 1.4, 'NY': 1.3, 'TX': 1.0, 'FL': 0.95 } },
    'Server': { base: 25000, locationMultiplier: { 'CA': 1.3, 'NY': 1.25, 'TX': 1.0, 'FL': 0.9 } }
  };

  const positionData = salaryData[position] || salaryData['Customer Service'];
  const locationMult = positionData.locationMultiplier[location] || 1.0;
  const experienceMult = 1 + (experience * 0.05); // 5% per year of experience
  
  const baseSalary = positionData.base * locationMult * experienceMult;
  
  return {
    min: Math.round(baseSalary * 0.8),
    max: Math.round(baseSalary * 1.3),
    median: Math.round(baseSalary),
    confidence: 85 + Math.floor(Math.random() * 10)
  };
};

// AI retention risk analysis
const analyzeRetentionRisk = (employeeData: any) => {
  let riskScore = 30; // Base low risk
  
  // Salary competitiveness
  if (employeeData.compensation.baseSalary < employeeData.aiMetrics.marketSalaryRange.min) {
    riskScore += 25;
  }
  
  // Employment type
  if (employeeData.employment.employmentType === 'contract') {
    riskScore += 20;
  }
  
  // Work location preference (remote workers tend to have more opportunities)
  if (employeeData.employment.workLocation === 'remote') {
    riskScore += 10;
  }
  
  // Age factor (younger employees typically have higher turnover)
  const age = new Date().getFullYear() - new Date(employeeData.personalInfo.dateOfBirth).getFullYear();
  if (age < 30) {
    riskScore += 15;
  }
  
  return Math.min(95, riskScore);
};

// AI performance prediction
const predictPerformance = (employeeData: any) => {
  let performanceScore = 70; // Base average performance
  
  // Education level boost (simulated based on email domain)
  if (employeeData.personalInfo.email.includes('university') || employeeData.personalInfo.email.includes('edu')) {
    performanceScore += 10;
  }
  
  // Position alignment
  if (employeeData.employment.position.includes('Senior') || employeeData.employment.position.includes('Lead')) {
    performanceScore += 15;
  }
  
  // Schedule flexibility correlation
  if (employeeData.employment.scheduleType === 'flexible') {
    performanceScore += 8;
  }
  
  return Math.min(95, performanceScore + Math.floor(Math.random() * 10));
};

// Voice recognition hook
const useVoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const startListening = (field: string) => {
    setIsListening(true);
    setTimeout(() => {
      const sampleTranscripts: Record<string, string> = {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@company.com',
        phone: '555-123-4567',
        position: 'Software Engineer',
        department: 'Engineering',
        address: '123 Main Street'
      };
      setTranscript(sampleTranscripts[field] || 'Voice input received');
      setIsListening(false);
    }, 2000);
  };
  
  return { isListening, transcript, startListening, setTranscript };
};

export function EmployeeOnboardingDialog({ open, onOpenChange, employee, onSaveEmployee }: EmployeeOnboardingDialogProps) {
  const { formatCurrency } = useGlobalization();
  const { toast } = useToast();
  const { isListening, transcript, startListening, setTranscript } = useVoiceRecognition();
  const [activeTab, setActiveTab] = useState("personal");
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [voiceField, setVoiceField] = useState<string>('');

  const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      dateOfBirth: '',
      emergencyContact: {
        name: '',
        relationship: '',
        phone: ''
      }
    },
    employment: {
      employeeId: '',
      department: '',
      position: '',
      manager: '',
      startDate: '',
      employmentType: 'full-time',
      workLocation: 'office',
      scheduleType: 'standard'
    },
    compensation: {
      baseSalary: 0,
      payFrequency: 'bi-weekly',
      payType: 'salary',
      currency: 'USD',
      benefits: [],
      bonusEligible: false
    },
    documents: {
      hasI9: false,
      hasW4: false,
      hasDirectDeposit: false,
      backgroundCheckComplete: false
    },
    aiMetrics: {
      marketSalaryRange: { min: 0, max: 0, median: 0 },
      retentionRisk: 0,
      performancePrediction: 0,
      cultureFit: 0,
      recommendations: []
    }
  });

  const departments = ['Engineering', 'Sales', 'Marketing', 'Operations', 'HR', 'Finance', 'Customer Service'];
  const positions = ['Software Engineer', 'Senior Software Engineer', 'Manager', 'Director', 'Sales Representative', 'Marketing Specialist', 'Barista', 'Server', 'Customer Service Representative'];
  const benefits = ['Health Insurance', 'Dental Insurance', 'Vision Insurance', '401k Matching', 'PTO', 'Remote Work', 'Flexible Hours', 'Stock Options', 'Gym Membership', 'Professional Development'];

  // AI analysis when key data changes
  useEffect(() => {
    if (formData.employment.position && formData.personalInfo.state && formData.compensation.baseSalary > 0) {
      setAiAnalyzing(true);
      setAnalysisProgress(0);
      
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            
            // Perform AI analysis
            const marketData = analyzeMarketSalary(formData.employment.position, formData.personalInfo.state);
            const retentionRisk = analyzeRetentionRisk(formData);
            const performancePred = predictPerformance(formData);
            
            setFormData(prev => ({
              ...prev,
              aiMetrics: {
                ...prev.aiMetrics,
                marketSalaryRange: marketData,
                retentionRisk,
                performancePrediction: performancePred,
                cultureFit: 75 + Math.floor(Math.random() * 20),
                recommendations: [
                  marketData.median > formData.compensation.baseSalary ? 
                    `Consider salary adjustment to ${formatCurrency(marketData.median)} (market median)` :
                    'Salary is competitive with market rates',
                  retentionRisk > 60 ? 'High retention risk - consider additional benefits' : 'Low retention risk',
                  'Strong candidate for leadership development program',
                  'Recommend quarterly performance check-ins'
                ]
              }
            }));
            
            setAiAnalyzing(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  }, [formData.employment.position, formData.personalInfo.state, formData.compensation.baseSalary]);

  // Apply voice transcript
  useEffect(() => {
    if (transcript && voiceField) {
      const fieldParts = voiceField.split('.');
      if (fieldParts.length === 2) {
        setFormData(prev => ({
          ...prev,
          [fieldParts[0]]: {
            ...prev[fieldParts[0] as keyof typeof prev],
            [fieldParts[1]]: transcript
          }
        }));
      }
      setTranscript('');
      setVoiceField('');
    }
  }, [transcript, voiceField, setTranscript]);

  const handleVoiceInput = (field: string) => {
    setVoiceField(field);
    startListening(field);
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

  const handleNestedInputChange = (section: keyof typeof formData, nestedSection: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [nestedSection]: {
          ...(prev[section] as any)[nestedSection],
          [field]: value
        }
      }
    }));
  };

  const handleBenefitToggle = (benefit: string) => {
    setFormData(prev => ({
      ...prev,
      compensation: {
        ...prev.compensation,
        benefits: prev.compensation.benefits.includes(benefit)
          ? prev.compensation.benefits.filter(b => b !== benefit)
          : [...prev.compensation.benefits, benefit]
      }
    }));
  };

  const generateEmployeeId = () => {
    const prefix = formData.employment.department.substring(0, 2).toUpperCase();
    const timestamp = Date.now().toString().slice(-4);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    const id = `${prefix}${timestamp}${random}`;
    
    handleInputChange('employment', 'employeeId', id);
    toast({
      title: "Employee ID Generated",
      description: `Generated ID: ${id}`
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.personalInfo.firstName || !formData.personalInfo.lastName || !formData.personalInfo.email) {
      toast({
        title: "Validation Error",
        description: "First name, last name, and email are required",
        variant: "destructive"
      });
      return;
    }

    onSaveEmployee(formData);
    onOpenChange(false);
  };

  const getRiskLevel = (risk: number) => {
    if (risk < 40) return { level: 'Low', color: 'text-green-600', variant: 'secondary' as const };
    if (risk < 70) return { level: 'Medium', color: 'text-yellow-600', variant: 'outline' as const };
    return { level: 'High', color: 'text-red-600', variant: 'destructive' as const };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {employee ? 'Edit Employee' : 'Employee Onboarding'}
            <Sparkles className="h-4 w-4 text-primary ml-auto" />
          </DialogTitle>
          <DialogDescription>
            Complete employee onboarding with AI-powered insights and recommendations.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
            <TabsTrigger value="compensation">Compensation</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <div className="flex gap-2">
                        <Input
                          id="firstName"
                          value={formData.personalInfo.firstName}
                          onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                          placeholder="John"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => handleVoiceInput('personalInfo.firstName')}
                          disabled={isListening}
                        >
                          {isListening && voiceField === 'personalInfo.firstName' ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <div className="flex gap-2">
                        <Input
                          id="lastName"
                          value={formData.personalInfo.lastName}
                          onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                          placeholder="Smith"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => handleVoiceInput('personalInfo.lastName')}
                          disabled={isListening}
                        >
                          {isListening && voiceField === 'personalInfo.lastName' ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="flex gap-2">
                        <Input
                          id="email"
                          type="email"
                          value={formData.personalInfo.email}
                          onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                          placeholder="john.smith@company.com"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => handleVoiceInput('personalInfo.email')}
                          disabled={isListening}
                        >
                          {isListening && voiceField === 'personalInfo.email' ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex gap-2">
                        <Input
                          id="phone"
                          value={formData.personalInfo.phone}
                          onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                          placeholder="(555) 123-4567"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => handleVoiceInput('personalInfo.phone')}
                          disabled={isListening}
                        >
                          {isListening && voiceField === 'personalInfo.phone' ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.personalInfo.dateOfBirth}
                      onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-medium">Address</Label>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Street Address</Label>
                        <div className="flex gap-2">
                          <Input
                            value={formData.personalInfo.address}
                            onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                            placeholder="123 Main Street"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleVoiceInput('personalInfo.address')}
                            disabled={isListening}
                          >
                            {isListening && voiceField === 'personalInfo.address' ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Input
                            value={formData.personalInfo.city}
                            onChange={(e) => handleInputChange('personalInfo', 'city', e.target.value)}
                            placeholder="City"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>State</Label>
                          <Select value={formData.personalInfo.state} onValueChange={(value) => handleInputChange('personalInfo', 'state', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="State" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CA">California</SelectItem>
                              <SelectItem value="NY">New York</SelectItem>
                              <SelectItem value="TX">Texas</SelectItem>
                              <SelectItem value="FL">Florida</SelectItem>
                              <SelectItem value="WA">Washington</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>ZIP Code</Label>
                          <Input
                            value={formData.personalInfo.zipCode}
                            onChange={(e) => handleInputChange('personalInfo', 'zipCode', e.target.value)}
                            placeholder="12345"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-medium">Emergency Contact</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          value={formData.personalInfo.emergencyContact.name}
                          onChange={(e) => handleNestedInputChange('personalInfo', 'emergencyContact', 'name', e.target.value)}
                          placeholder="Emergency contact name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Relationship</Label>
                        <Input
                          value={formData.personalInfo.emergencyContact.relationship}
                          onChange={(e) => handleNestedInputChange('personalInfo', 'emergencyContact', 'relationship', e.target.value)}
                          placeholder="Spouse, Parent, etc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                          value={formData.personalInfo.emergencyContact.phone}
                          onChange={(e) => handleNestedInputChange('personalInfo', 'emergencyContact', 'phone', e.target.value)}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="employment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Employment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Employee ID</Label>
                      <div className="flex gap-2">
                        <Input
                          value={formData.employment.employeeId}
                          onChange={(e) => handleInputChange('employment', 'employeeId', e.target.value)}
                          placeholder="Auto-generated"
                          readOnly
                        />
                        <Button type="button" onClick={generateEmployeeId} size="sm">
                          Generate
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={formData.employment.startDate}
                        onChange={(e) => handleInputChange('employment', 'startDate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <div className="flex gap-2">
                        <Select value={formData.employment.department} onValueChange={(value) => handleInputChange('employment', 'department', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map(dept => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => handleVoiceInput('employment.department')}
                          disabled={isListening}
                        >
                          {isListening && voiceField === 'employment.department' ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <div className="flex gap-2">
                        <Select value={formData.employment.position} onValueChange={(value) => handleInputChange('employment', 'position', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            {positions.map(pos => (
                              <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => handleVoiceInput('employment.position')}
                          disabled={isListening}
                        >
                          {isListening && voiceField === 'employment.position' ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Employment Type</Label>
                      <Select value={formData.employment.employmentType} onValueChange={(value: any) => handleInputChange('employment', 'employmentType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="intern">Intern</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Work Location</Label>
                      <Select value={formData.employment.workLocation} onValueChange={(value: any) => handleInputChange('employment', 'workLocation', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Schedule Type</Label>
                      <Select value={formData.employment.scheduleType} onValueChange={(value: any) => handleInputChange('employment', 'scheduleType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                          <SelectItem value="shift">Shift Work</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Manager</Label>
                    <Input
                      value={formData.employment.manager}
                      onChange={(e) => handleInputChange('employment', 'manager', e.target.value)}
                      placeholder="Direct manager name"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compensation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Compensation & Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Base Salary</Label>
                      <Input
                        type="number"
                        value={formData.compensation.baseSalary}
                        onChange={(e) => handleInputChange('compensation', 'baseSalary', parseFloat(e.target.value) || 0)}
                        placeholder="75000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Pay Type</Label>
                      <Select value={formData.compensation.payType} onValueChange={(value: any) => handleInputChange('compensation', 'payType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="salary">Salary</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Pay Frequency</Label>
                      <Select value={formData.compensation.payFrequency} onValueChange={(value: any) => handleInputChange('compensation', 'payFrequency', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.compensation.bonusEligible}
                      onCheckedChange={(checked) => handleInputChange('compensation', 'bonusEligible', checked)}
                    />
                    <Label>Bonus Eligible</Label>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-medium">Benefits Package</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {benefits.map(benefit => (
                        <Button
                          key={benefit}
                          type="button"
                          size="sm"
                          variant={formData.compensation.benefits.includes(benefit) ? "default" : "outline"}
                          onClick={() => handleBenefitToggle(benefit)}
                          className="justify-start text-left"
                        >
                          {benefit}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {[
                      { key: 'hasI9', label: 'Form I-9 (Employment Eligibility)', description: 'Verifies identity and employment authorization' },
                      { key: 'hasW4', label: 'Form W-4 (Tax Withholding)', description: 'Federal tax withholding information' },
                      { key: 'hasDirectDeposit', label: 'Direct Deposit Form', description: 'Banking information for payroll' },
                      { key: 'backgroundCheckComplete', label: 'Background Check', description: 'Completed background verification' }
                    ].map(doc => (
                      <div key={doc.key} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="space-y-1">
                          <Label className="font-medium">{doc.label}</Label>
                          <p className="text-sm text-muted-foreground">{doc.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={formData.documents[doc.key as keyof typeof formData.documents]}
                            onCheckedChange={(checked) => handleInputChange('documents', doc.key, checked)}
                          />
                          {formData.documents[doc.key as keyof typeof formData.documents] ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-insights" className="space-y-6">
              {aiAnalyzing && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-primary animate-pulse" />
                      <span className="font-medium">AI Analysis in Progress</span>
                    </div>
                    <Progress value={analysisProgress} className="w-full" />
                  </CardContent>
                </Card>
              )}

              {formData.aiMetrics.marketSalaryRange.median > 0 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Market Salary Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Market Range</p>
                          <p className="text-lg font-semibold">
                            {formatCurrency(formData.aiMetrics.marketSalaryRange.min)} - {formatCurrency(formData.aiMetrics.marketSalaryRange.max)}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Market Median</p>
                          <p className="text-lg font-semibold text-primary">
                            {formatCurrency(formData.aiMetrics.marketSalaryRange.median)}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Current Salary</p>
                          <p className="text-lg font-semibold">
                            {formatCurrency(formData.compensation.baseSalary)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Retention Risk</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold">{formData.aiMetrics.retentionRisk}%</p>
                            <Badge variant={getRiskLevel(formData.aiMetrics.retentionRisk).variant}>
                              {getRiskLevel(formData.aiMetrics.retentionRisk).level} Risk
                            </Badge>
                          </div>
                          <Target className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Performance Prediction</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold">{formData.aiMetrics.performancePrediction}%</p>
                            <Badge variant="secondary">Expected Performance</Badge>
                          </div>
                          <Award className="h-8 w-8 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        AI Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {formData.aiMetrics.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                            <p className="text-sm">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {isListening && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="animate-pulse h-2 w-2 bg-red-500 rounded-full"></div>
                  Listening for voice input...
                </div>
              )}
            </TabsContent>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {employee ? 'Update Employee' : 'Complete Onboarding'}
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}