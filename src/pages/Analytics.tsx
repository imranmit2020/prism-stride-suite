import { AnalyticsInterface } from "@/components/analytics/AnalyticsInterface";
import { PersonalFinanceAnalyticsInterface } from "@/components/personal-analytics/PersonalFinanceAnalyticsInterface";
import { useHomeMode } from "@/contexts/HomeModeContext";

export default function Analytics() {
  const { isHomeMode } = useHomeMode();
  if (isHomeMode) {
    return <PersonalFinanceAnalyticsInterface />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Advanced AI-powered business intelligence and predictive analytics.
        </p>
      </div>
      <AnalyticsInterface />
    </div>
  );
}