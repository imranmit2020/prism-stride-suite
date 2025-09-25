import { ReportsInterface } from "@/components/reports/ReportsInterface";
import { PersonalReportsInterface } from "@/components/reports/PersonalReportsInterface";
import { useHomeMode } from "@/contexts/HomeModeContext";

export default function Reports() {
  const { isHomeMode } = useHomeMode();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {isHomeMode ? "Personal Reports" : "AI Reports"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isHomeMode 
            ? "Generate personal financial reports and household analytics."
            : "Comprehensive AI-powered business reports with automated insights and scheduling."
          }
        </p>
      </div>
      {isHomeMode ? (
        <PersonalReportsInterface />
      ) : (
        <ReportsInterface />
      )}
    </div>
  );
}