'use client';

import React from 'react';
import { Temp1 } from '../templates/temp1';
import { Temp2 } from '../templates/temp2';
import { Temp3 } from '../templates/temp3';
import { useTemplateContext } from '~/_contexts/template-context';
import { ScrollArea } from '~/components/ui/scroll-area';

export const templates = [
  { id: 1, name: 'Template 1', template: Temp1 },
  { id: 2, name: 'Template 2', template: Temp2 },
  { id: 3, name: 'Template 3', template: Temp3 },
];

const TemplateSidebar = () => {
  const { activeTemplate, setActiveTemplate } = useTemplateContext();

  return (
      <div className="flex flex-col items-center justify-center gap-4 p-2 min-h-full">
        {templates.map((t) => {
          const TemplateComp = t.template;
          return (
            <div
              key={t.id}
              onClick={() => setActiveTemplate(t.id)}
              className={`w-full max-w-xs cursor-pointer rounded-md p-2 transition-all ${
                activeTemplate === t.id
                  ? 'border-2 border-blue-500'
                  : 'border border-gray-600'
              }`}
            >
              <div className="w-full h-64 overflow-hidden rounded-md">
                <TemplateComp />
              </div>
            </div>
          );
        })}
      </div>
  );
};

export default TemplateSidebar;
