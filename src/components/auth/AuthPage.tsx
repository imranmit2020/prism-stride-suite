import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock, User, Building2, Home, Briefcase, Shield } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentView, setCurrentView] = useState<"login" | "signup" | "forgot" | "reset">("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "", rememberMe: false });
  const [forgotPasswordForm, setForgotPasswordForm] = useState({ email: "" });
  const [resetPasswordForm, setResetPasswordForm] = useState({ 
    password: "", 
    confirmPassword: "" 
  });
  const [signupForm, setSignupForm] = useState({ 
    email: "", 
    password: "", 
    confirmPassword: "",
    fullName: "",
    preferredMode: "business" as "business" | "personal"
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if user is already logged in and handle password reset flow
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Check if this is a password reset flow
      const access_token = searchParams.get('access_token');
      const refresh_token = searchParams.get('refresh_token');
      const type = searchParams.get('type');
      
      if (access_token && refresh_token && type === 'recovery') {
        // Set the session for password reset
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token
        });
        
        if (!error) {
          setCurrentView("reset");
          return;
        }
      }
      
      if (session && type !== 'recovery') {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate, searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (error) {
        throw error;
      }

      // Handle session persistence based on remember me
      if (data.session && loginForm.rememberMe) {
        // Store a flag in localStorage to indicate long-term session preference
        localStorage.setItem('rememberMe', 'true');
        // The session will persist automatically due to Supabase client configuration
      } else {
        // Remove any previous remember me preference
        localStorage.removeItem('rememberMe');
      }


      if (data.user) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in."
        });
        navigate("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      
      if (error.message === "Invalid login credentials") {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please check your credentials and try again.",
          variant: "destructive"
        });
      } else if (error.message.includes("Email not confirmed")) {
        toast({
          title: "Email Not Confirmed",
          description: "Please check your email and click the confirmation link.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Login Error",
          description: error.message || "An unexpected error occurred. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate passwords match
    if (signupForm.password !== signupForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (signupForm.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: signupForm.email,
        password: signupForm.password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: signupForm.fullName,
              preferred_mode: signupForm.preferredMode
            }
          }
      });

      if (error) {
        if (error.message === "User already registered") {
          toast({
            title: "Account Exists",
            description: "An account with this email already exists. Please try logging in instead.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Signup Error",
            description: error.message,
            variant: "destructive"
          });
        }
        return;
      }

      if (data.user) {
        if (data.user.email_confirmed_at) {
          toast({
            title: "Account Created!",
            description: "Welcome! You can now start using the application."
          });
          navigate("/");
        } else {
          toast({
            title: "Check Your Email",
            description: "We've sent you a confirmation link. Please check your email to activate your account."
          });
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const resetUrl = `${window.location.origin}/auth`;
      const { error } = await supabase.auth.resetPasswordForEmail(
        forgotPasswordForm.email,
        {
          redirectTo: resetUrl
        }
      );

      if (error) {
        toast({
          title: "Reset Password Error",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      // Send custom branded email
      try {
        await fetch(`https://aqliyaglegptltfayjuh.supabase.co/functions/v1/send-password-reset`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxbGl5YWdsZWdwdGx0ZmF5anVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0Njg2MTQsImV4cCI6MjA2OTA0NDYxNH0.PPX7qrtv54Y59JPH9FNGNDcCJh4ICg97wgA7IfjjCtU`
          },
          body: JSON.stringify({
            email: forgotPasswordForm.email,
            resetUrl: resetUrl
          })
        });
      } catch (emailError) {
        console.error("Custom email error:", emailError);
        // Continue even if custom email fails
      }

      toast({
        title: "Password Reset Email Sent",
        description: "Check your email for a link to reset your password from BizStack."
      });
      setCurrentView("login");
    } catch (error) {
      console.error("Forgot password error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate passwords match
    if (resetPasswordForm.password !== resetPasswordForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (resetPasswordForm.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: resetPasswordForm.password
      });

      if (error) {
        toast({
          title: "Password Update Error",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      if (data.user) {
        // Send confirmation email
        try {
          await fetch(`https://aqliyaglegptltfayjuh.supabase.co/functions/v1/send-password-confirmation`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxbGl5YWdsZWdwdGx0ZmF5anVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0Njg2MTQsImV4cCI6MjA2OTA0NDYxNH0.PPX7qrtv54Y59JPH9FNGNDcCJh4ICg97wgA7IfjjCtU`
            },
            body: JSON.stringify({
              email: data.user.email,
              userName: data.user.user_metadata?.full_name
            })
          });
        } catch (emailError) {
          console.error("Confirmation email error:", emailError);
        }

        toast({
          title: "Password Updated Successfully",
          description: "Your password has been changed. You can now use your new password to sign in."
        });
        
        // Sign out user so they can sign in with new password
        await supabase.auth.signOut();
        setCurrentView("login");
        // Clear the URL parameters
        window.history.replaceState({}, document.title, "/auth");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mesh flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-pulse"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-primary opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-accent opacity-20 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6 group">
            <div className="relative">
              <Building2 className="h-10 w-10 text-primary drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 h-10 w-10 bg-primary/20 rounded-full blur-md animate-pulse"></div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              BizStack
            </h1>
          </div>
          <p className="text-muted-foreground text-lg font-medium">
            Access your business management platform
          </p>
          <div className="w-16 h-1 bg-gradient-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <Card className="backdrop-blur-xl bg-card/80 border-border/50 shadow-large animate-scale-in">
          <CardHeader className="space-y-4 text-center pb-6">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {currentView === "reset" ? "Set New Password" : "Welcome"}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              {currentView === "reset" 
                ? "Choose a strong password for your account" 
                : "Sign in to your account or create a new one"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentView === "reset" ? (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center">
                    <Shield className="h-12 w-12 text-primary mb-4" />
                  </div>
                  <h3 className="text-xl font-semibold">Create New Password</h3>
                  <p className="text-muted-foreground">Enter your new password below</p>
                </div>
                
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="reset-password" className="text-sm font-semibold text-foreground">New Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                      <Input
                        id="reset-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        className="pl-12 pr-12 h-12 bg-background/50 border-border/60 focus:border-primary focus:bg-background transition-all duration-300 text-base"
                        value={resetPasswordForm.password}
                        onChange={(e) => setResetPasswordForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 hover:bg-muted/50 rounded-lg transition-colors duration-200"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="reset-confirm-password" className="text-sm font-semibold text-foreground">Confirm New Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                      <Input
                        id="reset-confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                        className="pl-12 h-12 bg-background/50 border-border/60 focus:border-primary focus:bg-background transition-all duration-300 text-base"
                        value={resetPasswordForm.confirmPassword}
                        onChange={(e) => setResetPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-primary hover:shadow-primary/25 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-base font-semibold" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Updating Password...
                      </div>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </form>
              </div>
            ) : currentView === "forgot" ? (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">Reset Password</h3>
                  <p className="text-muted-foreground">Enter your email to receive a reset link</p>
                </div>
                
                <form onSubmit={handleForgotPassword} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="forgot-email" className="text-sm font-semibold text-foreground">Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                      <Input
                        id="forgot-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-12 h-12 bg-background/50 border-border/60 focus:border-primary focus:bg-background transition-all duration-300 text-base"
                        value={forgotPasswordForm.email}
                        onChange={(e) => setForgotPasswordForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-primary hover:shadow-primary/25 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-base font-semibold" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </form>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setCurrentView("login")}
                    className="text-sm text-primary hover:underline"
                  >
                    Back to Sign In
                  </button>
                </div>
              </div>
            ) : (
              <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as "login" | "signup")} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-12 bg-muted/50 backdrop-blur-sm p-1">
                  <TabsTrigger value="login" className="text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-300">
                    Sign Up
                  </TabsTrigger>
                </TabsList>
              
              <TabsContent value="login" className="space-y-6 mt-8">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="login-email" className="text-sm font-semibold text-foreground">Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-12 h-12 bg-background/50 border-border/60 focus:border-primary focus:bg-background transition-all duration-300 text-base"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="login-password" className="text-sm font-semibold text-foreground">Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-12 pr-12 h-12 bg-background/50 border-border/60 focus:border-primary focus:bg-background transition-all duration-300 text-base"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 hover:bg-muted/50 rounded-lg transition-colors duration-200"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="remember-me"
                        checked={loginForm.rememberMe}
                        onCheckedChange={(checked) => setLoginForm(prev => ({ ...prev, rememberMe: !!checked }))}
                        className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label htmlFor="remember-me" className="text-sm font-medium text-foreground cursor-pointer">
                        Remember me on this device
                      </Label>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentView("forgot")}
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-primary hover:shadow-primary/25 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-base font-semibold" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing in...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-6 mt-8">
                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="signup-name" className="text-sm font-semibold text-foreground">Full Name</Label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-12 h-12 bg-background/50 border-border/60 focus:border-primary focus:bg-background transition-all duration-300 text-base"
                        value={signupForm.fullName}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, fullName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="signup-email" className="text-sm font-semibold text-foreground">Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-12 h-12 bg-background/50 border-border/60 focus:border-primary focus:bg-background transition-all duration-300 text-base"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Mode Selection */}
                  <div className="space-y-4">
                    <Label className="text-sm font-semibold text-foreground">Choose Your Mode</Label>
                    <RadioGroup 
                      value={signupForm.preferredMode} 
                      onValueChange={(value) => setSignupForm(prev => ({ ...prev, preferredMode: value as "business" | "personal" }))}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="business" id="business" className="peer sr-only" />
                        <Label
                          htmlFor="business"
                          className="flex flex-col items-center justify-center rounded-xl border-2 border-border/60 bg-background/50 p-6 hover:bg-background hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all duration-300 group"
                        >
                          <Briefcase className="mb-3 h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                          <div className="font-semibold text-foreground">Business</div>
                          <div className="text-sm text-muted-foreground text-center mt-2">
                            For companies, teams, and professional use
                          </div>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="personal" id="personal" className="peer sr-only" />
                        <Label
                          htmlFor="personal"
                          className="flex flex-col items-center justify-center rounded-xl border-2 border-border/60 bg-background/50 p-6 hover:bg-background hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all duration-300 group"
                        >
                          <Home className="mb-3 h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                          <div className="font-semibold text-foreground">Personal</div>
                          <div className="text-sm text-muted-foreground text-center mt-2">
                            For personal finance and home management
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="signup-password" className="text-sm font-semibold text-foreground">Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-12 pr-12 h-12 bg-background/50 border-border/60 focus:border-primary focus:bg-background transition-all duration-300 text-base"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 hover:bg-muted/50 rounded-lg transition-colors duration-200"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="signup-confirm" className="text-sm font-semibold text-foreground">Confirm Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                      <Input
                        id="signup-confirm"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-12 h-12 bg-background/50 border-border/60 focus:border-primary focus:bg-background transition-all duration-300 text-base"
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-primary hover:shadow-primary/25 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-base font-semibold" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-8 animate-fade-in">
          <p className="text-sm text-muted-foreground leading-relaxed">
            By signing up, you agree to our{" "}
            <span className="text-primary hover:underline cursor-pointer transition-colors duration-200">
              terms of service
            </span>{" "}
            and{" "}
            <span className="text-primary hover:underline cursor-pointer transition-colors duration-200">
              privacy policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}