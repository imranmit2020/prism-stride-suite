import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Dashboard from "./Dashboard";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard on app load
    navigate("/dashboard");
  }, [navigate]);

  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
};

export default Index;
