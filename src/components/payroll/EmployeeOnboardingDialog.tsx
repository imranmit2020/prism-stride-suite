import { useState } from "react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { validationSchemas } from "@/lib/validation";
import { useValidatedForm } from "@/hooks/useValidatedForm";
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
import type { z } from "zod";

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
}

interface EmployeeOnboardingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee | null;
  onSaveEmployee: (employee: Omit<Employee, 'id'>) => void;
}

export function EmployeeOnboardingDialog({ open, onOpenChange, employee, onSaveEmployee }: EmployeeOnboardingDialogProps) {
  const { formatCurrency } = useGlobalization();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");

  const defaultValues = {
    personalInfo: {
      firstName: employee?.personalInfo.firstName || '',
      lastName: employee?.personalInfo.lastName || '',
      email: employee?.personalInfo.email || '',
      phone: employee?.personalInfo.phone || '',
      address: employee?.personalInfo.address || '',
      city: employee?.personalInfo.city || '',
      state: employee?.personalInfo.state || '',
      zipCode: employee?.personalInfo.zipCode || '',
      dateOfBirth: employee?.personalInfo.dateOfBirth || '',
      emergencyContact: {
        name: employee?.personalInfo.emergencyContact?.name || '',
        relationship: employee?.personalInfo.emergencyContact?.relationship || '',
        phone: employee?.personalInfo.emergencyContact?.phone || ''
      }
    },
    employment: {
      employeeId: employee?.employment.employeeId || '',
      department: employee?.employment.department || '',
      position: employee?.employment.position || '',
      manager: employee?.employment.manager || '',
      startDate: employee?.employment.startDate || '',
      employmentType: employee?.employment.employmentType || 'full-time' as const,
      workLocation: employee?.employment.workLocation || 'office' as const,
      scheduleType: employee?.employment.scheduleType || 'standard' as const
    },
    compensation: {
      baseSalary: employee?.compensation.baseSalary || 0,
      payFrequency: employee?.compensation.payFrequency || 'bi-weekly' as const,
      payType: employee?.compensation.payType || 'salary' as const,
      currency: employee?.compensation.currency || 'USD',
      benefits: employee?.compensation.benefits || [],
      bonusEligible: employee?.compensation.bonusEligible || false
    },
    documents: {
      hasI9: employee?.documents.hasI9 || false,
      hasW4: employee?.documents.hasW4 || false,
      hasDirectDeposit: employee?.documents.hasDirectDeposit || false,
      backgroundCheckComplete: employee?.documents.backgroundCheckComplete || false
    }
  };

  const { form, handleSubmit, isSubmitting } = useValidatedForm(
    validationSchemas.employee,
    defaultValues,
    (data) => {
      // Cast validated data to the expected type
      const employeeData = data as Omit<Employee, 'id'>;
      onSaveEmployee(employeeData);
      
      toast({
        title: "Employee Saved",
        description: `${data.personalInfo.firstName} ${data.personalInfo.lastName} has been successfully ${employee ? 'updated' : 'onboarded'}`
      });

      onOpenChange(false);
    }
  );

  const departments = ['Engineering', 'Sales', 'Marketing', 'Operations', 'HR', 'Finance', 'Customer Service'];
  const positions = ['Software Engineer', 'Senior Software Engineer', 'Manager', 'Director', 'Sales Representative', 'Marketing Specialist', 'Barista', 'Server', 'Customer Service Representative'];
  const benefits = ['Health Insurance', 'Dental Insurance', 'Vision Insurance', '401k Matching', 'PTO', 'Remote Work', 'Flexible Hours', 'Stock Options', 'Gym Membership', 'Professional Development'];

  const generateEmployeeId = () => {
    const department = form.getValues('employment.department');
    if (!department) {
      toast({
        title: "Department Required",
        description: "Please select a department first",
        variant: "destructive"
      });
      return;
    }
    
    const prefix = department.substring(0, 2).toUpperCase();
    const timestamp = Date.now().toString().slice(-4);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    const id = `${prefix}${timestamp}${random}`;
    
    form.setValue('employment.employeeId', id);
    toast({
      title: "Employee ID Generated",
      description: `Generated ID: ${id}`
    });
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
            Complete employee onboarding with comprehensive validation for multi-country business operations.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="employment">Employment</TabsTrigger>
                <TabsTrigger value="compensation">Compensation</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

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
                      <FormField
                        control={form.control}
                        name="personalInfo.firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="personalInfo.lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="personalInfo.email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john.smith@company.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="personalInfo.phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1-555-123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="personalInfo.address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main Street" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="personalInfo.city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="personalInfo.state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Province</FormLabel>
                            <FormControl>
                              <Input placeholder="NY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="personalInfo.zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP/Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="personalInfo.dateOfBirth"
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

                    {/* Emergency Contact */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Emergency Contact</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="personalInfo.emergencyContact.name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Contact Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Jane Smith" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="personalInfo.emergencyContact.relationship"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Relationship</FormLabel>
                                <FormControl>
                                  <Input placeholder="Spouse" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="personalInfo.emergencyContact.phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+1-555-987-6543" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="employment" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Employment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="employment.employeeId"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Employee ID *</FormLabel>
                            <FormControl>
                              <Input placeholder="ENG001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generateEmployeeId}
                        className="mt-8"
                      >
                        Generate ID
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="employment.department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Department *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {departments.map((dept) => (
                                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="employment.position"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Position *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select position" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {positions.map((pos) => (
                                  <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="employment.manager"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Manager</FormLabel>
                            <FormControl>
                              <Input placeholder="Manager Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="employment.startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="employment.employmentType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Employment Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="full-time">Full-time</SelectItem>
                                <SelectItem value="part-time">Part-time</SelectItem>
                                <SelectItem value="contract">Contract</SelectItem>
                                <SelectItem value="intern">Intern</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="employment.workLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Work Location</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="office">Office</SelectItem>
                                <SelectItem value="remote">Remote</SelectItem>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="employment.scheduleType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Schedule Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="flexible">Flexible</SelectItem>
                                <SelectItem value="shift">Shift</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
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
                      <FormField
                        control={form.control}
                        name="compensation.baseSalary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Base Salary *</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="75000" 
                                {...field}
                                onChange={e => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="compensation.payType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pay Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="salary">Salary</SelectItem>
                                <SelectItem value="hourly">Hourly</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="compensation.payFrequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pay Frequency</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="compensation.currency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Currency</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="USD">USD - US Dollar</SelectItem>
                                <SelectItem value="EUR">EUR - Euro</SelectItem>
                                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                                <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                                <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                                <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                                <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                                <SelectItem value="MXN">MXN - Mexican Peso</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="compensation.bonusEligible"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Bonus Eligible
                              </FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Benefits</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {benefits.map((benefit) => (
                          <FormField
                            key={benefit}
                            control={form.control}
                            name="compensation.benefits"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={benefit}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(benefit)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, benefit])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== benefit
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {benefit}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
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
                      Required Documents & Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="documents.hasI9"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">I-9 Form</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Employment eligibility verification
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="documents.hasW4"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">W-4 Form</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Tax withholding information
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="documents.hasDirectDeposit"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Direct Deposit</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Banking information for payroll
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="documents.backgroundCheckComplete"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Background Check</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Background verification completed
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : employee ? "Update Employee" : "Add Employee"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}