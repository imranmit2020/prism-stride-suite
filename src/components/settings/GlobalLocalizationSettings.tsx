import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGlobalization } from "@/contexts/GlobalizationContext";
import { Globe, DollarSign, Languages, Clock, MapPin, Zap } from "lucide-react";

export function GlobalLocalizationSettings() {
  const {
    currentCountry,
    currentCurrency,
    currentLanguage,
    availableCountries,
    availableCurrencies,
    availableLanguages,
    setCountry,
    setCurrency,
    setLanguage,
    formatCurrency,
    formatDate,
    formatTime,
    detectLocation,
    t
  } = useGlobalization();

  const [isDetecting, setIsDetecting] = useState(false);

  const handleAutoDetect = async () => {
    setIsDetecting(true);
    try {
      await detectLocation();
    } finally {
      setIsDetecting(false);
    }
  };

  const currentTime = new Date();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Global Localization Settings
          </h2>
          <p className="text-muted-foreground">Configure currency, language, and regional settings for your business</p>
        </div>
        <Badge variant="outline" className="px-4 py-2 border-blue-200">
          <Globe className="h-4 w-4 mr-2 text-blue-500" />
          Global Ready
        </Badge>
      </div>

      {/* Current Settings Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-700">
              <MapPin className="h-5 w-5 mr-2" />
              Current Country
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentCountry.flag}</span>
              <div>
                <div className="font-bold text-blue-700">{currentCountry.name}</div>
                <div className="text-sm text-blue-600">{currentCountry.code}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-700">
              <DollarSign className="h-5 w-5 mr-2" />
              Currency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-green-700">{currentCurrency.code}</div>
            <div className="text-sm text-green-600">{currentCurrency.name}</div>
            <div className="text-xs text-green-500 mt-1">
              Example: {formatCurrency(1234.56)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-purple-700">
              <Languages className="h-5 w-5 mr-2" />
              Language
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-purple-700">{currentLanguage.nativeName}</div>
            <div className="text-sm text-purple-600">{currentLanguage.name} ({currentLanguage.code})</div>
            {currentLanguage.rtl && (
              <Badge variant="outline" className="text-xs mt-1">RTL</Badge>
            )}
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-orange-700">
              <Clock className="h-5 w-5 mr-2" />
              Time Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-orange-700">{currentCountry.timeZone}</div>
            <div className="text-sm text-orange-600">
              {formatDate(currentTime)}
            </div>
            <div className="text-sm text-orange-600">
              {formatTime(currentTime)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Auto Detection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Automatic Location Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Automatically detect your location and configure optimal settings based on your timezone, 
                browser language, and IP location.
              </p>
            </div>
            <Button 
              onClick={handleAutoDetect} 
              disabled={isDetecting}
              className="ml-4"
            >
              <Zap className="h-4 w-4 mr-2" />
              {isDetecting ? 'Detecting...' : 'Auto Detect'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Manual Configuration */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Country Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Country / Region
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={currentCountry.code} onValueChange={setCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {availableCountries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Alert>
              <Globe className="h-4 w-4" />
              <AlertDescription>
                Setting a country will automatically configure currency, language, date format, and time zone.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Currency Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Currency
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={currentCurrency.code} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {availableCurrencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm bg-gray-100 px-1 rounded">
                        {currency.symbol}
                      </span>
                      <span>{currency.code} - {currency.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="bg-gray-50 p-3 rounded text-sm">
              <div className="font-medium mb-1">Preview:</div>
              <div>Small: {formatCurrency(123.45)}</div>
              <div>Large: {formatCurrency(1234567.89)}</div>
            </div>
          </CardContent>
        </Card>

        {/* Language Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Languages className="h-5 w-5 mr-2" />
              Language
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={currentLanguage.code} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {availableLanguages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm bg-gray-100 px-1 rounded">
                        {language.code}
                      </span>
                      <span>{language.nativeName}</span>
                      {language.rtl && (
                        <Badge variant="outline" className="text-xs">RTL</Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="bg-gray-50 p-3 rounded text-sm">
              <div className="font-medium mb-1">Translation Preview:</div>
              <div>{t('dashboard')}: {t('welcome')}</div>
              <div>{t('accounting')}: {t('total_revenue')}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Format Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Regional Format Examples
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Date & Time Formats</h4>
              <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
                <div><strong>Date:</strong> {formatDate(currentTime)}</div>
                <div><strong>Time:</strong> {formatTime(currentTime)}</div>
                <div><strong>Time Zone:</strong> {currentCountry.timeZone}</div>
                <div><strong>Format:</strong> {currentCountry.timeFormat}h clock</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Number & Currency Formats</h4>
              <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
                <div><strong>Small Amount:</strong> {formatCurrency(42.50)}</div>
                <div><strong>Large Amount:</strong> {formatCurrency(1234567.89)}</div>
                <div><strong>Thousands Sep:</strong> {currentCurrency.thousandsSeparator}</div>
                <div><strong>Decimal Sep:</strong> {currentCurrency.decimalSeparator}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="flex-1" onClick={handleAutoDetect} disabled={isDetecting}>
          <Zap className="h-4 w-4 mr-2" />
          {isDetecting ? 'Auto-Detecting...' : 'Auto-Detect Settings'}
        </Button>
        <Button variant="outline" className="flex-1" onClick={() => window.location.reload()}>
          <Globe className="h-4 w-4 mr-2" />
          Apply & Refresh
        </Button>
      </div>
    </div>
  );
}