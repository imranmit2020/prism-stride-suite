import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, TrendingDown } from "lucide-react";

export function AIPersonalRiskAssessment() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Personal Risk Assessment
          </CardTitle>
          <CardDescription>
            AI-powered analysis of personal risks and mitigation strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Burnout Risk</span>
              <Badge variant="destructive">Medium</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Health Risk</span>
              <Badge variant="secondary">Low</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Financial Risk</span>
              <Badge variant="secondary">Low</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}