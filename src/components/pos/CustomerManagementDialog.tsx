import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { validationSchemas } from "@/lib/validation";
import { 
  User, 
  Sparkles, 
  Brain, 
  TrendingUp, 
  MapPin, 
  Phone, 
  Mail,
  Calendar,
  DollarSign,
  Star,
  Camera,
  Mic,
  MicOff
} from "lucide-react";
import type { z } from "zod";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  dateOfBirth: string;
  preferences: string[];
  loyaltyTier: string;
  totalSpent: number;
  visitCount: number;
  lastVisit: string;
  notes: string;
}

interface CustomerManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer?: Customer | null;
  onSaveCustomer: (customer: Omit<Customer, 'id' | 'lastVisit' | 'visitCount'>) => void;
}

// AI-powered customer insights
const generateCustomerInsights = (formData: any) => {
  const insights = [];
  
  // Spending pattern analysis
  if (formData.email && formData.email.includes('@gmail.com')) {
    insights.push({
      type: 'demographic',
      confidence: 78,
      insight: 'Likely tech-savvy, prefers digital receipts and mobile payments'
    });
  }
  
  // Location-based insights
  if (formData.city) {
    insights.push({
      type: 'location',
      confidence: 85,
      insight: `Local customer - likely visits during ${formData.city === 'New York' ? 'lunch hours' : 'evening hours'}`
    });
  }
  
  // Age-based preferences
  const age = formData.dateOfBirth ? new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear() : null;
  if (age) {
    if (age < 30) {
      insights.push({
        type: 'preference',
        confidence: 82,
        insight: 'Prefers trendy items, social media engagement, sustainability focus'
      });
    } else if (age > 50) {
      insights.push({
        type: 'preference',
        confidence: 80,
        insight: 'Values quality over price, prefers traditional service, loyalty program member'
      });
    }
  }
  
  return insights;
};

// AI voice recognition simulation
const useVoiceRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  const startListening = (field: string) => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      const sampleTranscripts: Record<string, string> = {
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '555-123-4567',
        address: '123 Main Street',
        notes: 'Prefers oat milk lattes, regular customer, always tips well'
      };
      setTranscript(sampleTranscripts[field] || 'Voice input received');
      setIsListening(false);
    }, 2000);
  };
  
  return { isListening, transcript, startListening, setTranscript };
};

export function CustomerManagementDialog({ open, onOpenChange, customer, onSaveCustomer }: CustomerManagementDialogProps) {
  const { toast } = useToast();
  const { isListening, transcript, startListening, setTranscript } = useVoiceRecognition();
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [autoFillProgress, setAutoFillProgress] = useState(0);
  const [voiceField, setVoiceField] = useState<string>('');
  
  const form = useForm<z.infer<typeof validationSchemas.customer>>({
    resolver: zodResolver(validationSchemas.customer),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      dateOfBirth: '',
      preferences: [],
      loyaltyTier: 'Bronze',
      totalSpent: 0,
      visitCount: 0,
      notes: ''
    },
  });

  const loyaltyTiers = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'];
  const commonPreferences = [
    'Dairy-free options',
    'Extra hot drinks',
    'Sugar-free alternatives',
    'Large portions',
    'Quick service',
    'Mobile payments',
    'Loyalty rewards',
    'Email notifications'
  ];

  // AI auto-fill based on partial data
  useEffect(() => {
    const email = form.watch("email");
    if (email && email.includes('@')) {
      setAutoFillProgress(25);
      const domain = email.split('@')[1];
      if (domain === 'gmail.com' || domain === 'yahoo.com') {
        setAutoFillProgress(50);
        // AI suggestion for name based on email
        const emailName = email.split('@')[0];
        const currentName = form.watch("name");
        if (!currentName && emailName.includes('.')) {
          const [first, last] = emailName.split('.');
          const suggestedName = `${first.charAt(0).toUpperCase() + first.slice(1)} ${last.charAt(0).toUpperCase() + last.slice(1)}`;
          form.setValue("name", suggestedName);
          setAutoFillProgress(75);
        }
      }
    }
    
    // Generate insights when enough data is available
    const name = form.watch("name");
    const city = form.watch("city");
    const dateOfBirth = form.watch("dateOfBirth");
    if (name || email || city) {
      const insights = generateCustomerInsights({ name, email, city, dateOfBirth });
      setAiInsights(insights);
    }
  }, [form.watch("email"), form.watch("name"), form.watch("city"), form.watch("dateOfBirth")]);

  // Apply voice transcript to current field
  useEffect(() => {
    if (transcript && voiceField) {
      form.setValue(voiceField as any, transcript);
      setTranscript('');
      setVoiceField('');
    }
  }, [transcript, voiceField, setTranscript, form]);

  const handleVoiceInput = (field: string) => {
    setVoiceField(field);
    startListening(field);
  };

  const handlePreferenceToggle = (preference: string) => {
    const currentPreferences = form.watch("preferences") || [];
    const newPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter(p => p !== preference)
      : [...currentPreferences, preference];
    form.setValue("preferences", newPreferences);
  };

  const handleSubmit = (values: z.infer<typeof validationSchemas.customer>) => {
    // Ensure required fields are present since validation passed
    const customerData = {
      name: values.name,
      email: values.email,
      phone: values.phone || '',
      address: values.address || '',
      city: values.city || '',
      state: values.state || '',
      zipCode: values.zipCode || '',
      dateOfBirth: values.dateOfBirth || '',
      preferences: values.preferences,
      loyaltyTier: values.loyaltyTier,
      totalSpent: values.totalSpent,
      visitCount: values.visitCount,
      notes: values.notes || ''
    } as Omit<Customer, 'id' | 'lastVisit' | 'visitCount'>;

    onSaveCustomer(customerData);

    toast({
      title: "Customer Saved",
      description: `${values.name} has been added to the customer database`
    });

    onOpenChange(false);
  };

  const smartAddressLookup = async (zipCode: string) => {
    if (zipCode.length === 5) {
      // Simulate ZIP code lookup
      const mockData: Record<string, { city: string; state: string }> = {
        '10001': { city: 'New York', state: 'NY' },
        '90210': { city: 'Beverly Hills', state: 'CA' },
        '60601': { city: 'Chicago', state: 'IL' }
      };
      
      const data = mockData[zipCode];
      if (data) {
        form.setValue("city", data.city);
        form.setValue("state", data.state);
        toast({
          title: "Smart Lookup",
          description: "City and state auto-filled based on ZIP code"
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {customer ? 'Edit Customer' : 'Add New Customer'}
            <Sparkles className="h-4 w-4 text-primary ml-auto" />
          </DialogTitle>
          <DialogDescription>
            Create or update customer profile with AI-powered insights and smart data entry.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* AI Auto-fill Progress */}
            {autoFillProgress > 0 && (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">AI Auto-fill Progress</span>
                  </div>
                  <Progress value={autoFillProgress} className="w-full" />
                </CardContent>
              </Card>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleVoiceInput('name')}
                        disabled={isListening}
                      >
                        {isListening && voiceField === 'name' ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input type="email" placeholder="customer@example.com" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleVoiceInput('email')}
                        disabled={isListening}
                      >
                        {isListening && voiceField === 'email' ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleVoiceInput('phone')}
                        disabled={isListening}
                      >
                        {isListening && voiceField === 'phone' ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Address with Smart Lookup */}
            <div className="space-y-4">
              <FormLabel className="text-base font-medium">Address</FormLabel>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="123 Main Street" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleVoiceInput('address')}
                        disabled={isListening}
                      >
                        {isListening && voiceField === 'address' ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="12345" 
                          {...field} 
                          onChange={(e) => {
                            field.onChange(e);
                            smartAddressLookup(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-4">
              <FormLabel className="text-base font-medium">Customer Preferences</FormLabel>
              <div className="flex flex-wrap gap-2">
                {commonPreferences.map((preference) => (
                  <Button
                    key={preference}
                    type="button"
                    size="sm"
                    variant={form.watch("preferences")?.includes(preference) ? "default" : "outline"}
                    onClick={() => handlePreferenceToggle(preference)}
                  >
                    {preference}
                  </Button>
                ))}
              </div>
            </div>

            {/* Loyalty Information */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="loyaltyTier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loyalty Tier</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {loyaltyTiers.map((tier) => (
                          <SelectItem key={tier} value={tier}>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4" />
                              {tier}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalSpent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Spent ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information about the customer..."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => handleVoiceInput('notes')}
                      disabled={isListening}
                    >
                      {isListening && voiceField === 'notes' ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                  {isListening && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="animate-pulse h-2 w-2 bg-red-500 rounded-full"></div>
                      Listening... Speak now
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* AI Insights Display */}
            {aiInsights.length > 0 && (
              <Card className="border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">AI Customer Insights</span>
                  </div>
                  <div className="space-y-2">
                    {aiInsights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <Badge variant="secondary" className="text-xs">
                          {insight.confidence}%
                        </Badge>
                        <span className="text-muted-foreground">{insight.insight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {customer ? 'Update Customer' : 'Add Customer'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}