import { createContext, useContext, useState, ReactNode } from 'react';

interface HomeModeContextType {
  isHomeMode: boolean;
  setIsHomeMode: (isHome: boolean) => void;
}

const HomeModeContext = createContext<HomeModeContextType | undefined>(undefined);

export function HomeModeProvider({ children }: { children: ReactNode }) {
  const [isHomeMode, setIsHomeMode] = useState(false);

  return (
    <HomeModeContext.Provider value={{ isHomeMode, setIsHomeMode }}>
      {children}
    </HomeModeContext.Provider>
  );
}

export function useHomeMode() {
  const context = useContext(HomeModeContext);
  if (context === undefined) {
    throw new Error('useHomeMode must be used within a HomeModeProvider');
  }
  return context;
}