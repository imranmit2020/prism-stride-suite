import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, DollarSign, Target } from "lucide-react";

export function AITimeInvestmentROI() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time Investment ROI Analysis
          </CardTitle>
          <CardDescription>
            AI analysis of how your time investments generate returns across life areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Learning (10h/week)</span>
                <Badge variant="default">847% ROI</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Exercise (5h/week)</span>
                <Badge variant="default">623% ROI</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Social Time (8h/week)</span>
                <Badge variant="secondary">234% ROI</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}