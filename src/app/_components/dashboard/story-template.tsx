'use client';

import React from 'react';
import { useTemplateContext } from '~/_contexts/template-context';
import { templates } from './template-sidebar';
import MultiImageUpload from '../helpers/image-upload';

const StoryTemplate = () => {
  const { activeTemplate } = useTemplateContext();

  const selectedTemplate = templates.find((t) => t.id === activeTemplate);
  console.log(activeTemplate)
  return (
    <div className="flex items-center justify-center h-full">
      <MultiImageUpload />
      {selectedTemplate ? selectedTemplate.template : <p>No template selected</p>}
    </div>
  );
};

export default StoryTemplate;
