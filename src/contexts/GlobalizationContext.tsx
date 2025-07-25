import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  decimalPlaces: number;
  thousandsSeparator: string;
  decimalSeparator: string;
  symbolPosition: 'before' | 'after';
}

interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  rtl: boolean;
}

interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  currency: CurrencyConfig;
  language: LanguageConfig;
  timeZone: string;
  dateFormat: string;
  timeFormat: '12' | '24';
}

interface GlobalizationContextType {
  currentCountry: CountryConfig;
  currentCurrency: CurrencyConfig;
  currentLanguage: LanguageConfig;
  availableCountries: CountryConfig[];
  availableCurrencies: CurrencyConfig[];
  availableLanguages: LanguageConfig[];
  setCountry: (countryCode: string) => void;
  setCurrency: (currencyCode: string) => void;
  setLanguage: (languageCode: string) => void;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
  formatTime: (date: Date) => string;
  detectLocation: () => Promise<void>;
  t: (key: string) => string;
}

const GlobalizationContext = createContext<GlobalizationContextType | undefined>(undefined);

const defaultCountries: CountryConfig[] = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: { code: 'USD', symbol: '$', name: 'US Dollar', decimalPlaces: 2, thousandsSeparator: ',', decimalSeparator: '.', symbolPosition: 'before' },
    language: { code: 'en', name: 'English', nativeName: 'English', rtl: false },
    timeZone: 'America/New_York',
    dateFormat: 'MM/dd/yyyy',
    timeFormat: '12'
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: { code: 'GBP', symbol: '£', name: 'British Pound', decimalPlaces: 2, thousandsSeparator: ',', decimalSeparator: '.', symbolPosition: 'before' },
    language: { code: 'en', name: 'English', nativeName: 'English', rtl: false },
    timeZone: 'Europe/London',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24'
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    currency: { code: 'EUR', symbol: '€', name: 'Euro', decimalPlaces: 2, thousandsSeparator: '.', decimalSeparator: ',', symbolPosition: 'after' },
    language: { code: 'de', name: 'German', nativeName: 'Deutsch', rtl: false },
    timeZone: 'Europe/Berlin',
    dateFormat: 'dd.MM.yyyy',
    timeFormat: '24'
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    currency: { code: 'EUR', symbol: '€', name: 'Euro', decimalPlaces: 2, thousandsSeparator: ' ', decimalSeparator: ',', symbolPosition: 'after' },
    language: { code: 'fr', name: 'French', nativeName: 'Français', rtl: false },
    timeZone: 'Europe/Paris',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24'
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    currency: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', decimalPlaces: 0, thousandsSeparator: ',', decimalSeparator: '.', symbolPosition: 'before' },
    language: { code: 'ja', name: 'Japanese', nativeName: '日本語', rtl: false },
    timeZone: 'Asia/Tokyo',
    dateFormat: 'yyyy/MM/dd',
    timeFormat: '24'
  },
  {
    code: 'CN',
    name: 'China',
    flag: '🇨🇳',
    currency: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', decimalPlaces: 2, thousandsSeparator: ',', decimalSeparator: '.', symbolPosition: 'before' },
    language: { code: 'zh', name: 'Chinese', nativeName: '中文', rtl: false },
    timeZone: 'Asia/Shanghai',
    dateFormat: 'yyyy-MM-dd',
    timeFormat: '24'
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    currency: { code: 'INR', symbol: '₹', name: 'Indian Rupee', decimalPlaces: 2, thousandsSeparator: ',', decimalSeparator: '.', symbolPosition: 'before' },
    language: { code: 'en', name: 'English', nativeName: 'English', rtl: false },
    timeZone: 'Asia/Kolkata',
    dateFormat: 'dd-MM-yyyy',
    timeFormat: '12'
  },
  {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    currency: { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', decimalPlaces: 2, thousandsSeparator: '.', decimalSeparator: ',', symbolPosition: 'before' },
    language: { code: 'pt', name: 'Portuguese', nativeName: 'Português', rtl: false },
    timeZone: 'America/Sao_Paulo',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24'
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    currency: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', decimalPlaces: 2, thousandsSeparator: ',', decimalSeparator: '.', symbolPosition: 'before' },
    language: { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
    timeZone: 'Asia/Dubai',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '12'
  }
];

// Simple translations object - in a real app, this would be much more comprehensive
const translations: Record<string, Record<string, string>> = {
  en: {
    'dashboard': 'Dashboard',
    'accounting': 'Accounting',
    'inventory': 'Inventory',
    'settings': 'Settings',
    'welcome': 'Welcome',
    'total_revenue': 'Total Revenue',
    'orders': 'Orders',
    'customers': 'Customers',
    'products': 'Products'
  },
  de: {
    'dashboard': 'Dashboard',
    'accounting': 'Buchhaltung',
    'inventory': 'Inventar',
    'settings': 'Einstellungen',
    'welcome': 'Willkommen',
    'total_revenue': 'Gesamtumsatz',
    'orders': 'Bestellungen',
    'customers': 'Kunden',
    'products': 'Produkte'
  },
  fr: {
    'dashboard': 'Tableau de bord',
    'accounting': 'Comptabilité',
    'inventory': 'Inventaire',
    'settings': 'Paramètres',
    'welcome': 'Bienvenue',
    'total_revenue': 'Chiffre d\'affaires total',
    'orders': 'Commandes',
    'customers': 'Clients',
    'products': 'Produits'
  },
  ja: {
    'dashboard': 'ダッシュボード',
    'accounting': '会計',
    'inventory': '在庫',
    'settings': '設定',
    'welcome': 'ようこそ',
    'total_revenue': '総収益',
    'orders': '注文',
    'customers': '顧客',
    'products': '製品'
  },
  zh: {
    'dashboard': '仪表板',
    'accounting': '会计',
    'inventory': '库存',
    'settings': '设置',
    'welcome': '欢迎',
    'total_revenue': '总收入',
    'orders': '订单',
    'customers': '客户',
    'products': '产品'
  },
  pt: {
    'dashboard': 'Painel',
    'accounting': 'Contabilidade',
    'inventory': 'Inventário',
    'settings': 'Configurações',
    'welcome': 'Bem-vindo',
    'total_revenue': 'Receita Total',
    'orders': 'Pedidos',
    'customers': 'Clientes',
    'products': 'Produtos'
  },
  ar: {
    'dashboard': 'لوحة التحكم',
    'accounting': 'المحاسبة',
    'inventory': 'المخزون',
    'settings': 'الإعدادات',
    'welcome': 'مرحباً',
    'total_revenue': 'إجمالي الإيرادات',
    'orders': 'الطلبات',
    'customers': 'العملاء',
    'products': 'المنتجات'
  }
};

export function GlobalizationProvider({ children }: { children: ReactNode }) {
  const [currentCountry, setCurrentCountry] = useState<CountryConfig>(defaultCountries[0]);
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyConfig>(defaultCountries[0].currency);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageConfig>(defaultCountries[0].language);

  const availableCountries = defaultCountries;
  const availableCurrencies = Array.from(new Set(defaultCountries.map(c => c.currency.code)))
    .map(code => defaultCountries.find(c => c.currency.code === code)!.currency);
  const availableLanguages = Array.from(new Set(defaultCountries.map(c => c.language.code)))
    .map(code => defaultCountries.find(c => c.language.code === code)!.language);

  // Load saved preferences or detect location on mount
  useEffect(() => {
    const savedCountryCode = localStorage.getItem('prism-country');
    const savedCurrencyCode = localStorage.getItem('prism-currency');
    const savedLanguageCode = localStorage.getItem('prism-language');

    if (savedCountryCode && savedCurrencyCode && savedLanguageCode) {
      const country = availableCountries.find(c => c.code === savedCountryCode);
      const currency = availableCurrencies.find(c => c.code === savedCurrencyCode);
      const language = availableLanguages.find(l => l.code === savedLanguageCode);

      if (country) setCurrentCountry(country);
      if (currency) setCurrentCurrency(currency);
      if (language) setCurrentLanguage(language);
    } else {
      detectLocation();
    }
  }, []);

  const detectLocation = async (): Promise<void> => {
    try {
      // Try to detect country from browser timezone
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const detectedCountry = defaultCountries.find(c => c.timeZone === timeZone);

      if (detectedCountry) {
        setCountry(detectedCountry.code);
        return;
      }

      // Try to detect from browser language
      const browserLanguage = navigator.language.split('-')[0];
      const languageBasedCountry = defaultCountries.find(c => c.language.code === browserLanguage);

      if (languageBasedCountry) {
        setCountry(languageBasedCountry.code);
        return;
      }

      // Try to fetch location from IP (fallback)
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const detectedByIP = defaultCountries.find(c => c.code === data.country_code);
        
        if (detectedByIP) {
          setCountry(detectedByIP.code);
        }
      } catch (error) {
        console.log('IP detection failed, using default');
      }
    } catch (error) {
      console.log('Location detection failed, using default');
    }
  };

  const setCountry = (countryCode: string) => {
    const country = availableCountries.find(c => c.code === countryCode);
    if (country) {
      setCurrentCountry(country);
      setCurrentCurrency(country.currency);
      setCurrentLanguage(country.language);
      
      // Save to localStorage
      localStorage.setItem('prism-country', country.code);
      localStorage.setItem('prism-currency', country.currency.code);
      localStorage.setItem('prism-language', country.language.code);

      // Set document direction for RTL languages
      document.dir = country.language.rtl ? 'rtl' : 'ltr';
    }
  };

  const setCurrency = (currencyCode: string) => {
    const currency = availableCurrencies.find(c => c.code === currencyCode);
    if (currency) {
      setCurrentCurrency(currency);
      localStorage.setItem('prism-currency', currency.code);
    }
  };

  const setLanguage = (languageCode: string) => {
    const language = availableLanguages.find(l => l.code === languageCode);
    if (language) {
      setCurrentLanguage(language);
      localStorage.setItem('prism-language', language.code);
      document.dir = language.rtl ? 'rtl' : 'ltr';
    }
  };

  const formatCurrency = (amount: number): string => {
    const { symbol, decimalPlaces, thousandsSeparator, decimalSeparator, symbolPosition } = currentCurrency;
    
    // Format the number
    const rounded = Math.round(amount * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
    const [integerPart, fractionalPart = ''] = rounded.toFixed(decimalPlaces).split('.');
    
    // Add thousands separators
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
    
    // Combine parts
    let formattedAmount = formattedInteger;
    if (decimalPlaces > 0) {
      formattedAmount += decimalSeparator + fractionalPart;
    }
    
    // Add currency symbol
    return symbolPosition === 'before' 
      ? `${symbol}${formattedAmount}`
      : `${formattedAmount} ${symbol}`;
  };

  const formatDate = (date: Date): string => {
    const { dateFormat } = currentCountry;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    
    return dateFormat
      .replace('dd', day)
      .replace('MM', month)
      .replace('yyyy', year);
  };

  const formatTime = (date: Date): string => {
    const { timeFormat } = currentCountry;
    
    if (timeFormat === '12') {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else {
      return date.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    }
  };

  const t = (key: string): string => {
    return translations[currentLanguage.code]?.[key] || translations['en'][key] || key;
  };

  const value: GlobalizationContextType = {
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
  };

  return (
    <GlobalizationContext.Provider value={value}>
      {children}
    </GlobalizationContext.Provider>
  );
}

export function useGlobalization() {
  const context = useContext(GlobalizationContext);
  if (context === undefined) {
    throw new Error('useGlobalization must be used within a GlobalizationProvider');
  }
  return context;
}