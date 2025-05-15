'use client';

import React from 'react';
import { useTemplateContext } from '~/_contexts/template-context';
import { templates } from './template-sidebar';
import MultiImageUpload from '../helpers/image-upload';

const StoryTemplate = () => {
  const { activeTemplate } = useTemplateContext();

  const selectedTemplate = templates.find((t) => t.id === activeTemplate);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <MultiImageUpload />
      {selectedTemplate ? (
        <div className="w-full flex justify-center"><selectedTemplate.template /></div>
      ) : (
        <p className="text-gray-500">No template selected</p>
      )}
    </div>
  );
};

export default StoryTemplate;
