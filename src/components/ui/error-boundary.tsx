import React from "react";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error("🚨 Error Boundary caught an error:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("🚨 Error Boundary - Component stack:", errorInfo.componentStack);
    console.error("🚨 Error Boundary - Error details:", error);
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    console.log("🔄 Error Boundary - Retrying...");
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} retry={this.handleRetry} />;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-destructive">Something went wrong</CardTitle>
              <CardDescription>
                An unexpected error occurred. Please try again or contact support if the problem persists.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="p-3 bg-muted rounded-md text-sm font-mono overflow-auto max-h-32">
                  {this.state.error.message}
                </div>
              )}
              <Button onClick={this.handleRetry} className="w-full">
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}