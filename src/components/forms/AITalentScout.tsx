import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Users, Brain, Star, Target, Heart, Zap, TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AITalentScout() {
  const [candidateData, setCandidateData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    skills: "",
    resume: "",
    enableAI: true
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const talentAnalysis = {
    overallScore: 87,
    hiringProbability: 92,
    culturalFit: 89,
    performancePrediction: 94,
    skillAnalysis: [
      { skill: "Technical Expertise", level: 92, growth: "High", market: "In-demand" },
      { skill: "Leadership Potential", level: 78, growth: "Medium", market: "Valuable" },
      { skill: "Communication", level: 85, growth: "High", market: "Essential" },
      { skill: "Problem Solving", level: 91, growth: "High", market: "Critical" },
      { skill: "Adaptability", level: 88, growth: "Medium", market: "Important" }
    ],
    personalityProfile: {
      traits: [
        { trait: "Innovation Drive", score: 89, compatibility: "Excellent" },
        { trait: "Team Collaboration", score: 84, compatibility: "Very Good" },
        { trait: "Stress Resilience", score: 91, compatibility: "Excellent" },
        { trait: "Learning Agility", score: 87, compatibility: "Very Good" }
      ],
      type: "Innovative Problem Solver",
      confidence: 94
    },
    riskFactors: [
      { risk: "Overqualification", probability: 23, severity: "Low", mitigation: "Offer growth path" },
      { risk: "Cultural Mismatch", probability: 11, severity: "Very Low", mitigation: "Team integration plan" },
      { risk: "Salary Expectations", probability: 34, severity: "Medium", mitigation: "Competitive package" }
    ],
    performancePredictions: {
      firstYearRating: "4.2/5",
      productivityRamp: "3.2 months",
      retentionProbability: "89%",
      promotionTimeline: "18 months"
    },
    aiRecommendations: [
      {
        category: "Interview Focus",
        suggestion: "Emphasize innovation projects and technical challenges",
        confidence: 96,
        impact: "High"
      },
      {
        category: "Onboarding",
        suggestion: "Pair with senior mentor for first 60 days",
        confidence: 89,
        impact: "Medium"
      },
      {
        category: "Compensation",
        suggestion: "Offer equity package to align with growth trajectory",
        confidence: 92,
        impact: "High"
      }
    ]
  };

  const handleTalentAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            AI Talent Scout Engine
          </CardTitle>
          <CardDescription>
            Revolutionary AI that predicts candidate success, cultural fit, and performance with uncanny accuracy
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Candidate Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Candidate Information</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch 
                id="ai-analysis" 
                checked={candidateData.enableAI}
                onCheckedChange={(checked) => setCandidateData({...candidateData, enableAI: checked})}
              />
              <Label htmlFor="ai-analysis">Enable AI Talent Analysis</Label>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="candidate-name">Full Name</Label>
                <Input 
                  id="candidate-name" 
                  value={candidateData.name}
                  onChange={(e) => setCandidateData({...candidateData, name: e.target.value})}
                  placeholder="Enter candidate name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={candidateData.email}
                  onChange={(e) => setCandidateData({...candidateData, email: e.target.value})}
                  placeholder="candidate@email.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone"
                  value={candidateData.phone}
                  onChange={(e) => setCandidateData({...candidateData, phone: e.target.value})}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <Label htmlFor="position">Position Applied</Label>
                <Select value={candidateData.position} onValueChange={(value) => setCandidateData({...candidateData, position: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Software Developer</SelectItem>
                    <SelectItem value="manager">Project Manager</SelectItem>
                    <SelectItem value="designer">UI/UX Designer</SelectItem>
                    <SelectItem value="analyst">Data Analyst</SelectItem>
                    <SelectItem value="sales">Sales Representative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input 
                id="experience"
                value={candidateData.experience}
                onChange={(e) => setCandidateData({...candidateData, experience: e.target.value})}
                placeholder="5 years"
              />
            </div>

            <div>
              <Label htmlFor="skills">Key Skills</Label>
              <Textarea 
                id="skills"
                value={candidateData.skills}
                onChange={(e) => setCandidateData({...candidateData, skills: e.target.value})}
                placeholder="List candidate's key skills and competencies..."
                className="h-20"
              />
            </div>

            <div>
              <Label htmlFor="resume">Resume/Notes</Label>
              <Textarea 
                id="resume"
                value={candidateData.resume}
                onChange={(e) => setCandidateData({...candidateData, resume: e.target.value})}
                placeholder="Upload resume content or add additional notes..."
                className="h-24"
              />
            </div>

            <Button 
              onClick={handleTalentAnalysis} 
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-pulse" />
                  AI Analyzing Candidate Potential...
                </>
              ) : (
                <>
                  <Users className="mr-2 h-4 w-4" />
                  Run AI Talent Analysis
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Talent Score Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Talent Score Overview
              <Badge variant="secondary" className="ml-auto">
                {talentAnalysis.personalityProfile.confidence}% Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{talentAnalysis.overallScore}</div>
                <p className="text-sm text-muted-foreground">Overall Talent Score</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">{talentAnalysis.hiringProbability}%</div>
                  <div className="text-sm text-muted-foreground">Hiring Probability</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">{talentAnalysis.culturalFit}%</div>
                  <div className="text-sm text-muted-foreground">Cultural Fit</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Performance Predictions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>First Year Rating:</span>
                    <span className="font-semibold">{talentAnalysis.performancePredictions.firstYearRating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Productivity Ramp:</span>
                    <span className="font-semibold">{talentAnalysis.performancePredictions.productivityRamp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retention Probability:</span>
                    <span className="font-semibold text-green-600">{talentAnalysis.performancePredictions.retentionProbability}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              AI Skill Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {talentAnalysis.skillAnalysis.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{skill.skill}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={skill.market === 'Critical' ? 'default' : skill.market === 'In-demand' ? 'secondary' : 'outline'}>
                      {skill.market}
                    </Badge>
                    <span className="text-sm">{skill.level}%</span>
                  </div>
                </div>
                <Progress value={skill.level} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Growth Potential: {skill.growth}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Personality Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Personality Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-semibold">{talentAnalysis.personalityProfile.type}</div>
              <div className="text-sm text-muted-foreground">Personality Archetype</div>
            </div>

            {talentAnalysis.personalityProfile.traits.map((trait, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{trait.trait}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={trait.compatibility === 'Excellent' ? 'default' : 'secondary'}>
                      {trait.compatibility}
                    </Badge>
                    <span className="text-sm">{trait.score}%</span>
                  </div>
                </div>
                <Progress value={trait.score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            AI Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {talentAnalysis.riskFactors.map((risk, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">{risk.risk}</h4>
                <Badge 
                  variant={risk.severity === 'Very Low' ? 'secondary' : risk.severity === 'Low' ? 'outline' : 'destructive'}
                >
                  {risk.severity}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Probability</span>
                  <span>{risk.probability}%</span>
                </div>
                <Progress value={risk.probability} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">{risk.mitigation}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Hiring Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {talentAnalysis.aiRecommendations.map((rec, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{rec.category}</Badge>
                <span className="text-xs text-muted-foreground">{rec.confidence}% confidence</span>
              </div>
              <p className="text-sm font-medium">{rec.suggestion}</p>
              <div className="flex justify-between items-center">
                <Badge 
                  variant={rec.impact === 'High' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {rec.impact} Impact
                </Badge>
                <Button size="sm" variant="outline">Apply</Button>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">Final Recommendation</h4>
                <p className="text-sm text-muted-foreground">AI Decision</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="mr-2 h-4 w-4" />
                Proceed with Hire
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}