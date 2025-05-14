'use client';

import React, { createContext, useContext, useState} from 'react';
import type { TemplateContextType } from '~/types/TemplateInterfaces';

const TemplateContext = createContext<TemplateContextType | null>(null);

interface TemplateContextProviderProps {
  children: React.ReactNode;
}

export const TemplateContextProvider = ({ children }: TemplateContextProviderProps) => {
  const [activeTemplate, setActiveTemplate] = useState<number>(1);
  const [images, setImages] = useState<string[]>([])

  return (
    <TemplateContext.Provider value={{ activeTemplate, setActiveTemplate, images, setImages}}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplateContext = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplateContext must be used within a TemplateContextProvider');
  }
  return context;
};
