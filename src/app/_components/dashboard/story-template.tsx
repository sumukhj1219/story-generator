'use client';

import React from 'react';
import { useTemplateContext } from '~/_contexts/template-context';
import { templates } from './template-sidebar';
import MultiImageUpload from '../helpers/image-upload';

const StoryTemplate = () => {
  const { activeTemplate } = useTemplateContext();

  const selectedTemplate = templates.find((t) => t.id === activeTemplate);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 p-6  rounded-lg shadow-md max-w-4xl mx-auto">
      <MultiImageUpload />

      {selectedTemplate ? (
        <div className="w-full max-h-[500px]  shadow-sm p-4 ">
          <selectedTemplate.template />
        </div>
      ) : (
        <p className="text-gray-400 italic text-center">No template selected</p>
      )}
    </div>
  );
};

export default StoryTemplate;
