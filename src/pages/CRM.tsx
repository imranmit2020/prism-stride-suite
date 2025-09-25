import { CRMInterface } from "@/components/crm/CRMInterface";

interface CRMProps {
  isHomeMode?: boolean;
}

export default function CRM({ isHomeMode = false }: CRMProps) {
  if (isHomeMode) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Personal Contacts</h1>
          <p className="text-muted-foreground mt-2">
            CRM tools are not available in Personal Mode. Use Personal Finance for expense tracking.
          </p>
        </div>
        <div className="card-enhanced p-6">
          <h3 className="text-lg font-semibold mb-4">Contact Management</h3>
          <p className="text-muted-foreground">Basic contact management for personal use coming soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI CRM Intelligence</h1>
        <p className="text-muted-foreground mt-2">
          Advanced AI that predicts relationships, prevents churn, and maximizes customer lifetime value.
        </p>
      </div>
      <CRMInterface />
    </div>
  );
}