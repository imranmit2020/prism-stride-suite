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
      
      // Only redirect if user has session AND they're not in a special auth flow
      // Allow users to access auth page even if logged in (they might want to switch accounts)
      if (session && type !== 'recovery' && !searchParams.get('force_auth')) {
        // Don't auto-redirect, let user choose to sign out or continue
        console.log("User already has active session but is on auth page");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 relative">
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="w-full max-w-lg relative z-10">
        {/* Professional Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg"></div>
              <div className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-lg">
                <Building2 className="h-10 w-10 text-primary" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                BizStack
              </h1>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 tracking-wide">
                BUSINESS & PERSONAL MANAGEMENT
              </p>
            </div>
          </div>
          <div className="max-w-md mx-auto">
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              {currentView === "reset" 
                ? "Secure your account with a new password" 
                : "Comprehensive management platform for businesses and individuals"
              }
            </p>
            {currentView !== "reset" && currentView !== "forgot" && (
              <div className="flex items-center justify-center gap-6 mt-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Business</span>
                </div>
                <div className="w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>Personal</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Professional Card */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-xl shadow-slate-900/5 dark:shadow-slate-900/20">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          
          <CardHeader className="text-center pb-8 pt-8 px-8">
            <div className="mx-auto w-16 h-1 bg-gradient-to-r from-primary/50 to-primary rounded-full mb-6"></div>
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {currentView === "reset" ? "Reset Your Password" : 
               currentView === "forgot" ? "Forgot Your Password?" : 
               currentView === "signup" ? "Create Your Account" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400 text-base mt-3 leading-relaxed max-w-sm mx-auto">
              {currentView === "reset" 
                ? "Please enter a new secure password for your account" 
                : currentView === "forgot"
                ? "Enter your email address and we'll send you a secure reset link"
                : currentView === "signup"
                ? "Join BizStack to manage your business operations or personal finances efficiently"
                : "Access your dashboard and manage your business or personal activities"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            {currentView === "reset" ? (
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-full">
                      <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="reset-password" className="text-sm font-semibold text-slate-700 dark:text-slate-300">New Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors duration-200 z-10" />
                      <Input
                        id="reset-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your new password"
                        className="pl-12 pr-12 h-12 bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 focus:border-primary focus:bg-white dark:focus:bg-slate-700 transition-all duration-200 text-base rounded-lg"
                        value={resetPasswordForm.password}
                        onChange={(e) => setResetPasswordForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-md transition-colors duration-200 z-10"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-slate-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="reset-confirm-password" className="text-sm font-semibold text-foreground">Confirm New Password</Label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-primary rounded-xl opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 blur-xl"></div>
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300 z-10" />
                      <Input
                        id="reset-confirm-password"
                        type="password"
                        placeholder="Confirm your new password"
                        className="relative pl-12 h-14 bg-background/80 border-border/60 focus:border-primary focus:bg-background/90 transition-all duration-300 text-base rounded-xl shadow-sm"
                        value={resetPasswordForm.confirmPassword}
                        onChange={(e) => setResetPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-gradient-primary hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-300 text-base font-semibold rounded-xl" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Updating Password...
                      </div>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </form>
              </div>
            ) : currentView === "forgot" ? (
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="bg-gradient-accent p-4 rounded-full">
                      <Mail className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleForgotPassword} className="space-y-6">
                  <div className="space-y-4">
                    <Label htmlFor="forgot-email" className="text-sm font-semibold text-foreground">Email Address</Label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-accent rounded-xl opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 blur-xl"></div>
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors duration-300 z-10" />
                      <Input
                        id="forgot-email"
                        type="email"
                        placeholder="Enter your email address"
                        className="relative pl-12 h-14 bg-background/80 border-border/60 focus:border-accent focus:bg-background/90 transition-all duration-300 text-base rounded-xl shadow-sm"
                        value={forgotPasswordForm.email}
                        onChange={(e) => setForgotPasswordForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full h-14 bg-gradient-accent hover:shadow-xl hover:shadow-accent/25 hover:scale-[1.02] transition-all duration-300 text-base font-semibold rounded-xl" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending Reset Link...
                        </div>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setCurrentView("login")}
                      className="w-full h-12 hover:bg-muted/50 transition-colors duration-300 rounded-xl"
                    >
                      Back to Sign In
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as "login" | "signup")} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-14 bg-muted/30 backdrop-blur-sm p-1 rounded-xl border border-border/30">
                  <TabsTrigger 
                    value="login" 
                    className="text-sm font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    className="text-sm font-semibold data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg"
                  >
                    Create Account
                  </TabsTrigger>
                </TabsList>
              
                <TabsContent value="login" className="space-y-6 mt-8">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                      <Label htmlFor="login-email" className="text-sm font-semibold text-foreground">Email Address</Label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-primary rounded-xl opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 blur-xl"></div>
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300 z-10" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="Enter your email"
                          className="relative pl-12 h-14 bg-background/80 border-border/60 focus:border-primary focus:bg-background/90 transition-all duration-300 text-base rounded-xl shadow-sm"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Label htmlFor="login-password" className="text-sm font-semibold text-foreground">Password</Label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-primary rounded-xl opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 blur-xl"></div>
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300 z-10" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="relative pl-12 pr-12 h-14 bg-background/80 border-border/60 focus:border-primary focus:bg-background/90 transition-all duration-300 text-base rounded-xl shadow-sm"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 hover:bg-muted/50 rounded-lg transition-colors duration-200 z-10"
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

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="remember-me"
                          checked={loginForm.rememberMe}
                          onCheckedChange={(checked) => setLoginForm(prev => ({ ...prev, rememberMe: !!checked }))}
                          className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-md"
                        />
                        <Label htmlFor="remember-me" className="text-sm font-medium text-foreground cursor-pointer">
                          Remember me
                        </Label>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setCurrentView("forgot")}
                        className="text-sm text-primary hover:text-primary/80 hover:underline p-0 h-auto"
                      >
                        Forgot password?
                      </Button>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full h-14 bg-gradient-primary hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-300 text-base font-semibold rounded-xl" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
                    <div className="space-y-4">
                      <Label htmlFor="signup-name" className="text-sm font-semibold text-foreground">Full Name</Label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-accent rounded-xl opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 blur-xl"></div>
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors duration-300 z-10" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Enter your full name"
                          className="relative pl-12 h-14 bg-background/80 border-border/60 focus:border-accent focus:bg-background/90 transition-all duration-300 text-base rounded-xl shadow-sm"
                          value={signupForm.fullName}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, fullName: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Label htmlFor="signup-email" className="text-sm font-semibold text-foreground">Email Address</Label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-accent rounded-xl opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 blur-xl"></div>
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors duration-300 z-10" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          className="relative pl-12 h-14 bg-background/80 border-border/60 focus:border-accent focus:bg-background/90 transition-all duration-300 text-base rounded-xl shadow-sm"
                          value={signupForm.email}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Label htmlFor="signup-password" className="text-sm font-semibold text-foreground">Password</Label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-accent rounded-xl opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 blur-xl"></div>
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors duration-300 z-10" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="relative pl-12 pr-12 h-14 bg-background/80 border-border/60 focus:border-accent focus:bg-background/90 transition-all duration-300 text-base rounded-xl shadow-sm"
                          value={signupForm.password}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 hover:bg-muted/50 rounded-lg transition-colors duration-200 z-10"
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
                    
                    <div className="space-y-4">
                      <Label htmlFor="signup-confirm-password" className="text-sm font-semibold text-foreground">Confirm Password</Label>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-accent rounded-xl opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 blur-xl"></div>
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors duration-300 z-10" />
                        <Input
                          id="signup-confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                          className="relative pl-12 h-14 bg-background/80 border-border/60 focus:border-accent focus:bg-background/90 transition-all duration-300 text-base rounded-xl shadow-sm"
                          value={signupForm.confirmPassword}
                          onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Choose Your Mode</Label>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                        Select how you'll primarily use BizStack
                      </div>
                      <RadioGroup
                        value={signupForm.preferredMode}
                        onValueChange={(value) => setSignupForm(prev => ({ ...prev, preferredMode: value as "business" | "personal" }))}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div className="relative">
                          <RadioGroupItem value="business" id="business" className="sr-only" />
                          <Label 
                            htmlFor="business" 
                            className={`flex flex-col items-center justify-center p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                              signupForm.preferredMode === "business" 
                                ? "border-primary bg-primary/5 shadow-sm" 
                                : "border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/30"
                            }`}
                          >
                            <Briefcase className={`h-8 w-8 mb-3 ${signupForm.preferredMode === "business" ? "text-primary" : "text-slate-400"}`} />
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">Business</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center">Inventory, POS, Payroll & more</span>
                          </Label>
                        </div>
                        <div className="relative">
                          <RadioGroupItem value="personal" id="personal" className="sr-only" />
                          <Label 
                            htmlFor="personal" 
                            className={`flex flex-col items-center justify-center p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                              signupForm.preferredMode === "personal" 
                                ? "border-primary bg-primary/5 shadow-sm" 
                                : "border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/30"
                            }`}
                          >
                            <Home className={`h-8 w-8 mb-3 ${signupForm.preferredMode === "personal" ? "text-primary" : "text-slate-400"}`} />
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">Personal</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center">Budgets, Expenses & Goals</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full h-14 bg-gradient-accent hover:shadow-xl hover:shadow-accent/25 hover:scale-[1.02] transition-all duration-300 text-base font-semibold rounded-xl" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Creating Account...
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

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © 2024 BizStack. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}