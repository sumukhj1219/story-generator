import React from 'react';
import { Separator } from '~/components/ui/separator';
import { Temp1 } from '../templates/temp1';
import TemplateSidebar from './template-sidebar';
import StoryTemplate from './story-template';

const Dashboard = () => {

    return (
        <div className="grid grid-cols-5 h-full">

            <div className="col-span-1 flex flex-col items-center p-4 ">
                <h2 className="text-lg font-semibold mb-4">Songs Selection</h2>
                <div className="flex items-center justify-center w-full h-32 bg-gray-100 rounded-md">
                    <p className="text-gray-500">Song List / Search UI</p>
                </div>
            </div>

            <div className="flex items-center justify-center">
                <Separator orientation="vertical" className="h-full" />
            </div>

            <div className="col-span-1 flex flex-col items-center justify-center p-4 ">
                <h2 className="text-lg font-semibold mb-4">Your Story Template</h2>
                <StoryTemplate />
            </div>

            <div className="flex items-center justify-center">
                <Separator orientation="vertical" className="h-full" />
            </div>

            <div className="col-span-1 flex flex-col items-center p-4 ">
                <h2 className="text-lg font-semibold mb-4">Template Selection</h2>
                <TemplateSidebar />
            </div>

        </div>
    );
};

export default Dashboard;
