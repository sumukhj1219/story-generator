'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { TemplateContextType } from '~/types/TemplateInterfaces';

const TemplateContext = createContext<TemplateContextType | null>(null);

interface TemplateContextProviderProps {
  children: React.ReactNode;
}

export const TemplateContextProvider = ({ children }: TemplateContextProviderProps) => {
  const [activeTemplate, setActiveTemplate] = useState<number>(1);
  const [images, setImages] = useState<string[]>([])
  useEffect(() => {
    const stored = localStorage.getItem("images");
    if (stored) {
      try {
        setImages(JSON.parse(stored));
      } catch (err) {
        console.error("Invalid image data in localStorage");
      }
    }
  }, []);
  return (
    <TemplateContext.Provider value={{ activeTemplate, setActiveTemplate, images, setImages }}>
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
