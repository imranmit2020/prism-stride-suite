import { MarketingInterface } from "@/components/marketing/MarketingInterface";
import { useHomeMode } from "@/contexts/HomeModeContext";

export default function Marketing() {
  const { isHomeMode } = useHomeMode();
  if (isHomeMode) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Personal Finance</h1>
          <p className="text-muted-foreground mt-2">
            Marketing tools are not available in Personal Mode. Use Personal Finance instead.
          </p>
        </div>
        <div className="card-enhanced p-6">
          <h3 className="text-lg font-semibold mb-4">Personal Finance Management</h3>
          <p className="text-muted-foreground">Switch to Accounting module for personal finance tools.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Marketing Suite</h1>
        <p className="text-muted-foreground mt-2">
          Revolutionary AI-powered marketing tools that predict viral content and optimize campaigns.
        </p>
      </div>
      <MarketingInterface />
    </div>
  );
}