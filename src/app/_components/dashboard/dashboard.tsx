'use client';
import React from 'react';
import TemplateSidebar from './template-sidebar';
import StoryTemplate from './story-template';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 h-screen  text-white">
     

      <div className="col-span-8 flex flex-col overflow-hidden items-center justify-center border-r border-zinc-700 p-6">
        <h2 className="text-2xl font-semibold mb-6">Your Story Template</h2>
        <StoryTemplate />
      </div>

      <div className="col-span-3 flex flex-col h-screen p-6">
        <h2 className="text-xl font-semibold mb-4">Template Selection</h2>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
          <TemplateSidebar />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
