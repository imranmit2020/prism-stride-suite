import { SettingsInterface } from "@/components/settings/SettingsInterface";
import { HomeManagerSettings } from "@/components/settings/HomeManagerSettings";
import { useHomeMode } from "@/contexts/HomeModeContext";

export default function Settings() {
  const { isHomeMode } = useHomeMode();
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