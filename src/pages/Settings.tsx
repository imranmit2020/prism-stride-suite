import { SettingsInterface } from "@/components/settings/SettingsInterface";
import { HomeManagerSettings } from "@/components/settings/HomeManagerSettings";

interface SettingsProps {
  isHomeMode?: boolean;
}

export default function Settings({ isHomeMode = false }: SettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {isHomeMode ? "Personal Settings" : "AI Settings"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isHomeMode 
            ? "Configure your personal preferences and account settings."
            : "Advanced AI configuration and optimization settings for your business."
          }
        </p>
      </div>
      {isHomeMode ? (
        <HomeManagerSettings />
      ) : (
        <SettingsInterface />
      )}
    </div>
  );
}