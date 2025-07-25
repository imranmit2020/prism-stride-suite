import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { GraduationCap, Brain, Target, TrendingUp, Zap, BookOpen, Clock, User, Star, Lightbulb } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AILearningArchitect() {
  const [learnerData, setLearnerData] = useState({
    name: "",
    role: "",
    department: "",
    experience: "",
    learningGoals: "",
    timeAvailability: "",
    learningStyle: "",
    currentSkills: "",
    enableAI: true
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const learningAnalysis = {
    learningScore: 89,
    successProbability: 92,
    completionPrediction: 87,
    confidence: 95,
    skillGapAnalysis: [
      { skill: "Advanced Data Analysis", currentLevel: 45, targetLevel: 85, priority: "High", timeToMaster: "6 weeks" },
      { skill: "Machine Learning", currentLevel: 25, targetLevel: 75, priority: "Medium", timeToMaster: "12 weeks" },
      { skill: "Project Management", currentLevel: 70, targetLevel: 90, priority: "Low", timeToMaster: "4 weeks" },
      { skill: "Communication Skills", currentLevel: 80, targetLevel: 95, priority: "Medium", timeToMaster: "3 weeks" }
    ],
    personalizedPath: {
      learningStyle: "Visual + Hands-on",
      optimalSessionLength: "45 minutes",
      bestLearningTime: "Morning (9-11 AM)",
      totalDuration: "16 weeks",
      modules: [
        { module: "Foundations", duration: "2 weeks", difficulty: "Beginner", completion: 0 },
        { module: "Core Concepts", duration: "4 weeks", difficulty: "Intermediate", completion: 0 },
        { module: "Advanced Techniques", duration: "6 weeks", difficulty: "Advanced", completion: 0 },
        { module: "Practical Application", duration: "4 weeks", difficulty: "Expert", completion: 0 }
      ]
    },
    adaptiveCurriculum: [
      {
        week: "Week 1-2",
        focus: "Foundation Building",
        activities: [
          "Interactive video courses on data fundamentals",
          "Hands-on exercises with real datasets",
          "Peer discussion forums"
        ],
        expectedOutcome: "Solid understanding of core concepts"
      },
      {
        week: "Week 3-6",
        focus: "Skill Development",
        activities: [
          "Project-based learning modules",
          "Mentorship sessions with industry experts",
          "Weekly progress assessments"
        ],
        expectedOutcome: "Practical application abilities"
      },
      {
        week: "Week 7-12",
        focus: "Advanced Mastery",
        activities: [
          "Complex real-world case studies",
          "Collaborative team projects",
          "Industry certification preparation"
        ],
        expectedOutcome: "Professional-level competency"
      }
    ],
    performancePrediction: {
      engagementRate: 94,
      retentionRate: 89,
      skillTransfer: 87,
      careerImpact: "High",
      promotionProbability: 76
    },
    adaptiveFeatures: [
      { feature: "Difficulty Auto-adjustment", enabled: true, impact: "Maintains optimal challenge level" },
      { feature: "Learning Pace Optimization", enabled: true, impact: "Prevents burnout and ensures retention" },
      { feature: "Content Personalization", enabled: true, impact: "Increases engagement by 34%" },
      { feature: "Progress Prediction", enabled: true, impact: "Early intervention for at-risk learners" }
    ],
    aiRecommendations: [
      {
        type: "Learning Strategy",
        suggestion: "Combine visual tutorials with hands-on coding for optimal retention",
        confidence: 96,
        impact: "+28% skill acquisition speed"
      },
      {
        type: "Schedule Optimization",
        suggestion: "Schedule learning sessions for 9-11 AM when focus is highest",
        confidence: 91,
        impact: "+15% completion rate"
      },
      {
        type: "Motivation Boost",
        suggestion: "Set micro-goals with immediate feedback and rewards",
        confidence: 89,
        impact: "+22% engagement"
      }
    ]
  };

  const handleLearningAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 4000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            AI Learning Architect
          </CardTitle>
          <CardDescription>
            Genius AI that crafts personalized learning journeys, predicts success, and adapts in real-time
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learner Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Learner Profile</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch 
                id="ai-learning" 
                checked={learnerData.enableAI}
                onCheckedChange={(checked) => setLearnerData({...learnerData, enableAI: checked})}
              />
              <Label htmlFor="ai-learning">Enable AI Learning Architecture</Label>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="learner-name">Full Name</Label>
                <Input 
                  id="learner-name" 
                  value={learnerData.name}
                  onChange={(e) => setLearnerData({...learnerData, name: e.target.value})}
                  placeholder="Enter learner name"
                />
              </div>
              <div>
                <Label htmlFor="role">Current Role</Label>
                <Input 
                  id="role"
                  value={learnerData.role}
                  onChange={(e) => setLearnerData({...learnerData, role: e.target.value})}
                  placeholder="Job title/role"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <Select value={learnerData.department} onValueChange={(value) => setLearnerData({...learnerData, department: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input 
                  id="experience"
                  value={learnerData.experience}
                  onChange={(e) => setLearnerData({...learnerData, experience: e.target.value})}
                  placeholder="5 years"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="learning-goals">Learning Goals</Label>
              <Textarea 
                id="learning-goals"
                value={learnerData.learningGoals}
                onChange={(e) => setLearnerData({...learnerData, learningGoals: e.target.value})}
                placeholder="What skills do you want to develop? What are your career goals?"
                className="h-20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="time-availability">Time Availability</Label>
                <Input 
                  id="time-availability"
                  value={learnerData.timeAvailability}
                  onChange={(e) => setLearnerData({...learnerData, timeAvailability: e.target.value})}
                  placeholder="5 hours/week"
                />
              </div>
              <div>
                <Label htmlFor="learning-style">Preferred Learning Style</Label>
                <Select value={learnerData.learningStyle} onValueChange={(value) => setLearnerData({...learnerData, learningStyle: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visual">Visual</SelectItem>
                    <SelectItem value="auditory">Auditory</SelectItem>
                    <SelectItem value="kinesthetic">Hands-on</SelectItem>
                    <SelectItem value="reading">Reading/Writing</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="current-skills">Current Skills Assessment</Label>
              <Textarea 
                id="current-skills"
                value={learnerData.currentSkills}
                onChange={(e) => setLearnerData({...learnerData, currentSkills: e.target.value})}
                placeholder="List your current skills and proficiency levels..."
                className="h-20"
              />
            </div>

            <Button 
              onClick={handleLearningAnalysis} 
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-pulse" />
                  AI Architecting Learning Path...
                </>
              ) : (
                <>
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Design AI Learning Journey
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Learning Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Learning Assessment
              <Badge variant="secondary" className="ml-auto">
                {learningAnalysis.confidence}% Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{learningAnalysis.learningScore}</div>
                <p className="text-sm text-muted-foreground">Learning Readiness Score</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">{learningAnalysis.successProbability}%</div>
                  <div className="text-sm text-muted-foreground">Success Probability</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">{learningAnalysis.completionPrediction}%</div>
                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Learning Path Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Learning Style:</span>
                    <span className="font-semibold">{learningAnalysis.personalizedPath.learningStyle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Session Length:</span>
                    <span className="font-semibold">{learningAnalysis.personalizedPath.optimalSessionLength}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Time:</span>
                    <span className="font-semibold">{learningAnalysis.personalizedPath.bestLearningTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Duration:</span>
                    <span className="font-semibold">{learningAnalysis.personalizedPath.totalDuration}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Gap Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              AI Skill Gap Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {learningAnalysis.skillGapAnalysis.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{skill.skill}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={skill.priority === 'High' ? 'default' : skill.priority === 'Medium' ? 'secondary' : 'outline'}>
                      {skill.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{skill.timeToMaster}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Current: {skill.currentLevel}%</span>
                    <span>Target: {skill.targetLevel}%</span>
                  </div>
                  <Progress value={skill.currentLevel} className="h-2" />
                  <Progress value={skill.targetLevel} className="h-1 opacity-50" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance Prediction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Prediction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{learningAnalysis.performancePrediction.engagementRate}%</div>
                <div className="text-sm text-muted-foreground">Engagement Rate</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">{learningAnalysis.performancePrediction.retentionRate}%</div>
                <div className="text-sm text-muted-foreground">Retention Rate</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Skill Transfer</span>
                <span className="font-semibold">{learningAnalysis.performancePrediction.skillTransfer}%</span>
              </div>
              <Progress value={learningAnalysis.performancePrediction.skillTransfer} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="text-sm">Career Impact</span>
                <Badge variant="default">{learningAnalysis.performancePrediction.careerImpact}</Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Promotion Probability</span>
                <span className="font-semibold text-green-600">{learningAnalysis.performancePrediction.promotionProbability}%</span>
              </div>
            </div>

            <div className="pt-3">
              <h4 className="font-semibold text-sm mb-2">Adaptive Features</h4>
              {learningAnalysis.adaptiveFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${feature.enabled ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-xs">{feature.feature}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{feature.enabled ? 'Active' : 'Inactive'}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Adaptive Curriculum */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            AI Adaptive Curriculum
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningAnalysis.adaptiveCurriculum.map((phase, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{phase.week}</h4>
                  <Badge variant="outline">{phase.focus}</Badge>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium mb-2">Activities</h5>
                    <ul className="space-y-1">
                      {phase.activities.map((activity, actIndex) => (
                        <li key={actIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Lightbulb className="h-3 w-3 mt-1 flex-shrink-0" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-2">Expected Outcome</h5>
                    <p className="text-sm text-muted-foreground">{phase.expectedOutcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Learning Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {learningAnalysis.aiRecommendations.map((rec, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{rec.type}</Badge>
                <span className="text-xs text-muted-foreground">{rec.confidence}% confidence</span>
              </div>
              <p className="text-sm font-medium">{rec.suggestion}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 font-semibold">{rec.impact}</span>
                <Button size="sm" variant="outline">Apply</Button>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">Launch Learning Journey</h4>
                <p className="text-sm text-muted-foreground">AI-Optimized Path Ready</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Star className="mr-2 h-4 w-4" />
                Start Learning Journey
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}