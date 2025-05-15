'use client';

import React from 'react';
import { Temp1 } from '../templates/temp1';
import { Temp2 } from '../templates/temp2';
import { useTemplateContext } from '~/_contexts/template-context';
import MultiImageUpload from '../helpers/image-upload';
import { Temp3 } from '../templates/temp3';

export const templates = [
  { id: 1, template: Temp1 },
  { id: 2, template: Temp2  },
  { id: 3, template: Temp3  },

];

const TemplateSidebar = () => {
  const { activeTemplate, setActiveTemplate } = useTemplateContext();

  return (
    <div className="flex flex-col items-center justify-center my-auto">
      {templates.map((t) => (
        <div
          key={t.id}
          onClick={() => setActiveTemplate(t.id)}
          className={`m-4 cursor-pointer rounded-md p-1 transition-all ${
            activeTemplate === t.id ? 'border-2 border-blue-500' : 'border'
          }`}
        >
          <t.template />
        </div>
      ))}
    </div>
  );
};

export default TemplateSidebar;
