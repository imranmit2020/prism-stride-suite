import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crystal, Calendar, TrendingUp } from "lucide-react";

export function AIFutureSelfSimulator() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crystal className="h-5 w-5" />
            Future Self Simulator
          </CardTitle>
          <CardDescription>
            AI simulation of your potential future based on current patterns and decisions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">6 Months From Now</h3>
              <p className="text-muted-foreground">
                Based on current habits and trajectory, you'll likely have achieved 4 out of 7 goals.
              </p>
            </div>
            <Button className="w-full">
              Run Full Simulation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}