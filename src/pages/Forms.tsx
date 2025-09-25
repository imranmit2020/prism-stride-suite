import { FormsInterface } from "@/components/forms/FormsInterface";

interface FormsProps {
  isHomeMode?: boolean;
}

export default function Forms({ isHomeMode = false }: FormsProps) {
  if (isHomeMode) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Personal Forms</h1>
          <p className="text-muted-foreground mt-2">
            AI Forms are not available in Personal Mode. Use Settings for personal preferences.
          </p>
        </div>
        <div className="card-enhanced p-6">
          <h3 className="text-lg font-semibold mb-4">Personal Forms</h3>
          <p className="text-muted-foreground">Basic forms for personal use coming soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Forms Suite</h1>
        <p className="text-muted-foreground mt-2">
          Revolutionary AI-powered forms that predict, optimize, and transform your business processes.
        </p>
      </div>
      <FormsInterface />
    </div>
  );
}