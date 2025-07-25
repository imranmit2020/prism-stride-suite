import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Scale, Heart, Briefcase, Users } from "lucide-react";

export function AILifeBalanceOptimizer() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Life Balance Optimization
          </CardTitle>
          <CardDescription>
            AI-powered analysis of your work-life balance and optimization recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>Work Focus</span>
              </div>
              <span>45%</span>
            </div>
            <Progress value={45} />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Personal Wellness</span>
              </div>
              <span>72%</span>
            </div>
            <Progress value={72} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}