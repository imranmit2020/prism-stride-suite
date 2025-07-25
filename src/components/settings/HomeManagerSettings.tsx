import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database, 
  Download, 
  Upload,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Lock,
  Eye,
  Calendar,
  DollarSign,
  Home,
  Settings,
  Trash2,
  RefreshCw
} from "lucide-react";

export function HomeManagerSettings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    budget: true,
    bills: true,
    goals: false,
    reports: true,
    security: true
  });
  const [privacy, setPrivacy] = useState({
    analytics: true,
    dataCollection: false,
    thirdParty: false
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="flex flex-wrap h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full gap-1 mb-6">
          <TabsTrigger value="profile" className="px-3 py-2 text-xs font-medium">Profile</TabsTrigger>
          <TabsTrigger value="appearance" className="px-3 py-2 text-xs font-medium">Appearance</TabsTrigger>
          <TabsTrigger value="notifications" className="px-3 py-2 text-xs font-medium">Notifications</TabsTrigger>
          <TabsTrigger value="privacy" className="px-3 py-2 text-xs font-medium">Privacy</TabsTrigger>
          <TabsTrigger value="data" className="px-3 py-2 text-xs font-medium">Data</TabsTrigger>
          <TabsTrigger value="account" className="px-3 py-2 text-xs font-medium">Account</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                      <SelectItem value="cst">Central Time (CST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="cad">CAD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Household Information
              </CardTitle>
              <CardDescription>
                Configure your household settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="householdName">Household Name</Label>
                <Input id="householdName" placeholder="The Smith Family" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="members">Number of Members</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select members" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 person</SelectItem>
                      <SelectItem value="2">2 people</SelectItem>
                      <SelectItem value="3">3 people</SelectItem>
                      <SelectItem value="4">4 people</SelectItem>
                      <SelectItem value="5+">5+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income">Household Income</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under30k">Under $30,000</SelectItem>
                      <SelectItem value="30-50k">$30,000 - $50,000</SelectItem>
                      <SelectItem value="50-75k">$50,000 - $75,000</SelectItem>
                      <SelectItem value="75-100k">$75,000 - $100,000</SelectItem>
                      <SelectItem value="over100k">Over $100,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button>Update Household</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme & Display
              </CardTitle>
              <CardDescription>
                Customize the appearance of your home manager
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark themes
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  <Moon className="h-4 w-4" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <Label className="text-base">Color Theme</Label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {["Blue", "Green", "Purple", "Orange", "Red", "Pink"].map((color) => (
                    <div key={color} className="flex flex-col items-center gap-2">
                      <div 
                        className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                          color === "Blue" ? "bg-blue-500 border-blue-600" :
                          color === "Green" ? "bg-green-500 border-green-600" :
                          color === "Purple" ? "bg-purple-500 border-purple-600" :
                          color === "Orange" ? "bg-orange-500 border-orange-600" :
                          color === "Red" ? "bg-red-500 border-red-600" :
                          "bg-pink-500 border-pink-600"
                        }`}
                      />
                      <span className="text-xs">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="extra-large">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose when and how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Budget Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when you exceed budget limits
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.budget} 
                    onCheckedChange={(checked) => setNotifications(prev => ({...prev, budget: checked}))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Bill Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Reminders for upcoming bill payments
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.bills} 
                    onCheckedChange={(checked) => setNotifications(prev => ({...prev, bills: checked}))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Goal Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Progress updates on savings goals
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.goals} 
                    onCheckedChange={(checked) => setNotifications(prev => ({...prev, goals: checked}))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Report Generation</Label>
                    <p className="text-sm text-muted-foreground">
                      When reports are ready for download
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.reports} 
                    onCheckedChange={(checked) => setNotifications(prev => ({...prev, reports: checked}))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Important security and login notifications
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.security} 
                    onCheckedChange={(checked) => setNotifications(prev => ({...prev, security: checked}))}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Notification Methods</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <Label>Email Notifications</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4" />
                    <Label>Push Notifications</Label>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Control your data privacy and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Analytics Collection</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve the app by sharing usage analytics
                    </p>
                  </div>
                  <Switch 
                    checked={privacy.analytics} 
                    onCheckedChange={(checked) => setPrivacy(prev => ({...prev, analytics: checked}))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Data Collection</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow collection of financial data for insights
                    </p>
                  </div>
                  <Switch 
                    checked={privacy.dataCollection} 
                    onCheckedChange={(checked) => setPrivacy(prev => ({...prev, dataCollection: checked}))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Third-party Integration</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow third-party services for enhanced features
                    </p>
                  </div>
                  <Switch 
                    checked={privacy.thirdParty} 
                    onCheckedChange={(checked) => setPrivacy(prev => ({...prev, thirdParty: checked}))}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Security Settings</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    View Login Activity
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Two-Factor Authentication
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Management */}
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
              <CardDescription>
                Export, import, and manage your personal data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Export Data</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export Financial Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export Reports
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export All Data
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Import Data</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Import Bank Statements
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Import Budget Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Import from File
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Data Storage</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Data Storage Location</span>
                    <Badge variant="outline">Local Device</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Storage Used</span>
                    <Badge>245 MB</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Backup Status</span>
                    <Badge variant="default">Up to date</Badge>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Create Backup
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Account Management
              </CardTitle>
              <CardDescription>
                Manage your account and subscription settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Account Type</h4>
                    <p className="text-sm text-muted-foreground">Personal Home Manager</p>
                  </div>
                  <Badge variant="default">Free</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Member Since</h4>
                    <p className="text-sm text-muted-foreground">March 2024</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Data Retention</h4>
                    <p className="text-sm text-muted-foreground">Keep data for 2 years</p>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium text-destructive">Danger Zone</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full text-orange-600 hover:text-orange-700">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset All Settings
                  </Button>
                  <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete All Data
                  </Button>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}