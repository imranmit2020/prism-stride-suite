import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages, Globe, Brain, Zap, MessageSquare, Users } from "lucide-react";

interface LanguageIntelligence {
  id: string;
  language: string;
  code: string;
  marketPenetration: number;
  culturalAdaptation: number;
  aiConfidence: number;
  revenueImpact: number;
  conversionOptimization: number;
  sentimentScore: number;
  aiInsights: string;
  recommendations: string[];
}

interface CulturalPattern {
  id: string;
  region: string;
  pattern: string;
  impact: number;
  adaptation: string;
  aiSuggestion: string;
  confidence: number;
}

interface TranslationOptimization {
  id: string;
  content: string;
  originalLanguage: string;
  targetLanguage: string;
  baseTranslation: string;
  aiOptimizedTranslation: string;
  culturalScore: number;
  conversionImpact: number;
  aiReasoning: string;
}

export function AILanguageIntelligence() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  
  const [languageIntelligence] = useState<LanguageIntelligence[]>([
    {
      id: "1",
      language: "Mandarin Chinese",
      code: "zh-CN",
      marketPenetration: 89,
      culturalAdaptation: 94,
      aiConfidence: 97,
      revenueImpact: 156,
      conversionOptimization: 87,
      sentimentScore: 83,
      aiInsights: "High-context culture requires relationship-focused messaging with quantum cultural modeling",
      recommendations: ["Honor-based value propositions", "Group harmony emphasis", "Long-term relationship focus"]
    },
    {
      id: "2",
      language: "Arabic",
      code: "ar",
      marketPenetration: 76,
      culturalAdaptation: 91,
      aiConfidence: 89,
      revenueImpact: 134,
      conversionOptimization: 82,
      sentimentScore: 78,
      aiInsights: "Right-to-left cultural adaptation with family-centric value quantum optimization",
      recommendations: ["Family-first messaging", "Religious sensitivity", "Community trust building"]
    },
    {
      id: "3",
      language: "Japanese",
      code: "ja",
      marketPenetration: 92,
      culturalAdaptation: 96,
      aiConfidence: 94,
      revenueImpact: 178,
      conversionOptimization: 93,
      sentimentScore: 88,
      aiInsights: "Precision and quality-focused culture with AI-powered perfectionism modeling",
      recommendations: ["Quality emphasis", "Detailed specifications", "Respectful communication"]
    }
  ]);

  const [culturalPatterns] = useState<CulturalPattern[]>([
    {
      id: "1",
      region: "East Asia",
      pattern: "Indirect Communication Preference",
      impact: 87,
      adaptation: "Context-rich messaging with subtle value propositions",
      aiSuggestion: "Implement quantum harmony algorithms for message softening",
      confidence: 94
    },
    {
      id: "2",
      region: "Middle East",
      pattern: "Relationship-First Business Culture",
      impact: 91,
      adaptation: "Trust-building before transaction focus",
      aiSuggestion: "Deploy AI relationship nurturing protocols with cultural intelligence",
      confidence: 89
    },
    {
      id: "3",
      region: "Northern Europe",
      pattern: "Efficiency and Transparency Values",
      impact: 83,
      adaptation: "Direct, honest communication with clear benefits",
      aiSuggestion: "Activate AI precision communication with quantum transparency modeling",
      confidence: 96
    }
  ]);

  const [translationOptimizations] = useState<TranslationOptimization[]>([
    {
      id: "1",
      content: "Buy Now - Limited Time Offer!",
      originalLanguage: "English",
      targetLanguage: "Japanese",
      baseTranslation: "今すぐ購入 - 期間限定オファー！",
      aiOptimizedTranslation: "この特別な機会をお見逃しなく。心を込めてご提案いたします。",
      culturalScore: 94,
      conversionImpact: 127,
      aiReasoning: "Japanese culture values respectful, non-pushy communication with emotional connection"
    },
    {
      id: "2",
      content: "Join thousands of satisfied customers",
      originalLanguage: "English",
      targetLanguage: "Arabic",
      baseTranslation: "انضم إلى آلاف العملاء الراضين",
      aiOptimizedTranslation: "كن جزءاً من عائلتنا الكبيرة من العملاء المُكرمين",
      culturalScore: 89,
      conversionImpact: 143,
      aiReasoning: "Arabic culture emphasizes family bonds and honor - 'honored customers' resonates better than 'satisfied'"
    }
  ]);

  const totalLanguages = 47;
  const aiAccuracy = 96;
  const culturalAdaptationScore = 91;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Language Intelligence
          </h2>
          <p className="text-muted-foreground">Quantum-powered cultural adaptation and market-specific optimization</p>
        </div>
        <Badge variant="outline" className="px-4 py-2 border-purple-200">
          <Languages className="h-4 w-4 mr-2 text-purple-500" />
          Quantum Linguistics Active
        </Badge>
      </div>

      {/* Language Intelligence Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-purple-700">
              <Globe className="h-5 w-5 mr-2" />
              Active Languages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{totalLanguages}</div>
            <p className="text-sm text-purple-600 mt-1">Quantum Supported</p>
          </CardContent>
        </Card>

        <Card className="border-pink-200 bg-pink-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-pink-700">
              <Brain className="h-5 w-5 mr-2" />
              AI Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-700">{aiAccuracy}%</div>
            <Progress value={aiAccuracy} className="mt-2" />
            <p className="text-sm text-pink-600 mt-1">Neural Precision</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-700">
              <Users className="h-5 w-5 mr-2" />
              Cultural Adaptation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{culturalAdaptationScore}%</div>
            <Progress value={culturalAdaptationScore} className="mt-2" />
            <p className="text-sm text-blue-600 mt-1">Quantum Cultural IQ</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-700">
              <Zap className="h-5 w-5 mr-2" />
              Revenue Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">+158%</div>
            <p className="text-sm text-green-600 mt-1">Average Lift</p>
          </CardContent>
        </Card>
      </div>

      {/* Language Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Market Intelligence by Language
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select target language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (Global)</SelectItem>
                <SelectItem value="zh-CN">Mandarin Chinese</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            {languageIntelligence.map((lang) => (
              <div key={lang.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{lang.language} ({lang.code})</h4>
                    <p className="text-sm text-muted-foreground">{lang.aiInsights}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      +{lang.revenueImpact}%
                    </div>
                    <p className="text-sm text-muted-foreground">Revenue Impact</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Market Penetration:</span>
                    <div className="flex items-center mt-1">
                      <Progress value={lang.marketPenetration} className="flex-1 mr-2" />
                      <span className="font-medium">{lang.marketPenetration}%</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cultural Adaptation:</span>
                    <div className="flex items-center mt-1">
                      <Progress value={lang.culturalAdaptation} className="flex-1 mr-2" />
                      <span className="font-medium">{lang.culturalAdaptation}%</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Conversion Optimization:</span>
                    <div className="flex items-center mt-1">
                      <Progress value={lang.conversionOptimization} className="flex-1 mr-2" />
                      <span className="font-medium">{lang.conversionOptimization}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded p-3 text-xs">
                  <div className="mb-2"><strong>AI Recommendations:</strong></div>
                  <div className="flex flex-wrap gap-1">
                    {lang.recommendations.map((rec, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {rec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cultural Pattern Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Cultural Pattern Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {culturalPatterns.map((pattern) => (
            <div key={pattern.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{pattern.region}</h4>
                  <p className="text-sm text-muted-foreground">{pattern.pattern}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">
                    {pattern.impact}%
                  </div>
                  <p className="text-sm text-muted-foreground">Impact Score</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Adaptation Strategy:</span>
                  <p className="font-medium">{pattern.adaptation}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">AI Confidence:</span>
                  <div className="flex items-center mt-1">
                    <Progress value={pattern.confidence} className="flex-1 mr-2" />
                    <span className="font-medium">{pattern.confidence}%</span>
                  </div>
                </div>
              </div>

              <Alert>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI Suggestion:</strong> {pattern.aiSuggestion}
                </AlertDescription>
              </Alert>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Translation Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            AI Translation Optimization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {translationOptimizations.map((opt) => (
            <div key={opt.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">
                    {opt.originalLanguage} → {opt.targetLanguage}
                  </h4>
                  <p className="text-sm font-mono bg-gray-100 p-2 rounded mt-1">
                    <strong>Original:</strong> "{opt.content}"
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    +{opt.conversionImpact}%
                  </div>
                  <p className="text-sm text-muted-foreground">Conversion Impact</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Standard Translation:</span>
                  <p className="font-medium bg-red-50 p-2 rounded mt-1">{opt.baseTranslation}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">AI Optimized:</span>
                  <p className="font-medium bg-green-50 p-2 rounded mt-1">{opt.aiOptimizedTranslation}</p>
                </div>
              </div>

              <div className="flex items-center mb-2">
                <span className="text-sm text-muted-foreground mr-2">Cultural Score:</span>
                <Progress value={opt.culturalScore} className="flex-1 mr-2" />
                <span className="text-sm font-medium">{opt.culturalScore}%</span>
              </div>

              <Alert>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <strong>AI Reasoning:</strong> {opt.aiReasoning}
                </AlertDescription>
              </Alert>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Actions */}
      <div className="flex gap-4">
        <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
          <Languages className="h-4 w-4 mr-2" />
          Activate Global Intelligence
        </Button>
        <Button variant="outline" className="flex-1">
          <Brain className="h-4 w-4 mr-2" />
          Generate Cultural Report
        </Button>
        <Button variant="outline" className="flex-1">
          <Zap className="h-4 w-4 mr-2" />
          Auto-Optimize All Languages
        </Button>
      </div>
    </div>
  );
}