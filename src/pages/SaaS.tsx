import { SaaSInterface } from "@/components/saas/SaaSInterface";
import { PersonalGoalsInterface } from "@/components/personal-finance/PersonalGoalsInterface";

interface SaaSProps {
  isHomeMode?: boolean;
}

export default function SaaS({ isHomeMode = false }: SaaSProps) {
  if (isHomeMode) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Goals & Investments</h1>
          <p className="text-muted-foreground mt-2">
            Manage your financial goals, savings accounts, and investment portfolio.
          </p>
        </div>
        <PersonalGoalsInterface />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI SaaS Optimization</h1>
        <p className="text-muted-foreground mt-2">
          Intelligent SaaS tools that predict user behavior, optimize pricing, and ensure product-market fit.
        </p>
      </div>
      <SaaSInterface />
    </div>
  );
}