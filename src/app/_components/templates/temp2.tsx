"use client"
import { useEffect, useState } from "react";
import { useTemplateContext } from "~/_contexts/template-context";
import { Card, CardContent } from "~/components/ui/card";


export function Temp2() {
  const { images } = useTemplateContext()
  const getImage = (index: number) => {
    return images[index] ? (
      <img
        src={images[index]}
        alt={`image-${index}`}
        className="w-full h-full object-cover rounded-md"
      />
    ) : (
      <span className="text-center text-sm text-gray-500">No {index + 1}</span>
    );
  };

  return (
    <Card className="w-[250px] h-[300px] overflow-hidden bg-neutral-800">
      <CardContent className="p-2 h-full">
        <div className="grid grid-cols-3 grid-rows-6 gap-2 h-full">
          <div className="col-span-1 row-span-2 bg-neutral-700 flex items-center justify-center rounded-md border border-dashed">
            {getImage(0)}
          </div>
          <div className="col-span-1 row-span-4 bg-neutral-700 flex items-center justify-center rounded-md border border-dashed">
            {getImage(1)}
          </div>
          <div className="col-span-2 row-span-2 bg-neutral-700 flex items-center justify-center rounded-md border border-dashed gap-x-1">
            {getImage(2)}
          </div>
          <div className="col-span-2 row-span-2 bg-neutral-700 flex items-center justify-center rounded-md border border-dashed">
            {getImage(3)}
          </div>
          <div className="col-span-1 row-span-2 bg-neutral-700 flex items-center justify-center rounded-md border border-dashed">
            {getImage(4)}
          </div>
          <div className="col-span-2 row-span-2 bg-neutral-700 flex items-center justify-center rounded-md border border-dashed">
            {getImage(5)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}