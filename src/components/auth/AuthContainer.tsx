import { useState } from "react";
import { SignInScreen } from "./SignInScreen";
import { CreateUserScreen } from "./CreateUserScreen";

type AuthView = "signin" | "signup";

interface AuthContainerProps {
  onAuthenticated: (userType: string) => void;
}

export function AuthContainer({ onAuthenticated }: AuthContainerProps) {
  const [currentView, setCurrentView] = useState<AuthView>("signin");

  const handleSignIn = (email: string, password: string) => {
    // For now, simulate successful login
    // In real implementation, this would validate against your backend
    console.log("🔐 Sign in attempt:", { email, maskedPassword: password.replace(/./g, '*') });
    try {
      onAuthenticated("user");
      console.log("✅ Authentication successful");
    } catch (error) {
      console.error("❌ Authentication failed:", error);
    }
  };

  const handleCreateUser = (userData: any) => {
    // For now, simulate successful user creation
    // In real implementation, this would create user via your backend
    console.log("👤 User creation attempt:", { ...userData, password: userData.password ? '***' : undefined });
    try {
      setCurrentView("signin");
      console.log("✅ User creation successful, redirecting to sign in");
    } catch (error) {
      console.error("❌ User creation failed:", error);
    }
  };

  const handleSwitchToSignUp = () => {
    console.log("🔄 Switching to Sign Up view");
    setCurrentView("signup");
  };

  const handleSwitchToSignIn = () => {
    console.log("🔄 Switching to Sign In view");
    setCurrentView("signin");
  };

  if (currentView === "signup") {
    return (
      <CreateUserScreen 
        onCreateUser={handleCreateUser}
        onSwitchToSignIn={handleSwitchToSignIn}
      />
    );
  }

  return (
    <SignInScreen 
      onSignIn={handleSignIn}
      onSwitchToSignUp={handleSwitchToSignUp}
    />
  );
}