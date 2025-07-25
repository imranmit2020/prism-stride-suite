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
    console.log("Sign in attempt:", { email, password });
    onAuthenticated("user");
  };

  const handleCreateUser = (userData: any) => {
    // For now, simulate successful user creation
    // In real implementation, this would create user via your backend
    console.log("User creation attempt:", userData);
    setCurrentView("signin");
  };

  const handleSwitchToSignUp = () => {
    setCurrentView("signup");
  };

  const handleSwitchToSignIn = () => {
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