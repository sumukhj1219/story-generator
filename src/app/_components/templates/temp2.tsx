"use client";

import { useState } from "react";
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import { useTemplateContext } from "~/_contexts/template-context";
import { Card, CardContent } from "~/components/ui/card";

import { DraggableImage } from "../drag-and-drop/DraggableImage";
import { DroppableCell } from "../drag-and-drop/DroppableCell";
import { swapDragDropItems } from "../drag-and-drop/dragDropUtils";

export function Temp2() {
  const { images } = useTemplateContext();

  const [cellContents, setCellContents] = useState<(number | null)[]>([
    0, 1, 2, 3, 4, 5,
  ]);

 const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;
  if (!over) return;

  const activeId = String(active.id);
  const overId = String(over.id);

  if (activeId === overId) return;
  if (!activeId.startsWith("image-") || !overId.startsWith("cell-")) return;

  const draggedImageIndex = Number(activeId.replace("image-", ""));
  const targetCellIndex = Number(overId.replace("cell-", ""));

  setCellContents((prev) =>
    swapDragDropItems(prev, draggedImageIndex, targetCellIndex)
  );
};


  const getImageForCell = (cellIndex: number) => {
    const imgIndex = cellContents[cellIndex];
    if (imgIndex === null || imgIndex === undefined) return null;
    return images[imgIndex] ?? null;
  };

  const layoutClasses = [
    "col-span-1 row-span-2",
    "col-span-1 row-span-4",
    "col-span-2 row-span-2",
    "col-span-2 row-span-2",
    "col-span-1 row-span-2",
    "col-span-2 row-span-2",
  ];

  return (
    <Card className="w-[250px] h-[300px] overflow-hidden bg-neutral-800">
      <CardContent className="p-2 h-full">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-3 grid-rows-6 gap-2 h-full">
            {cellContents.map((imgIndex, cellIdx) => (
              <DroppableCell
                key={cellIdx}
                id={`cell-${cellIdx}`}
                layoutClass={layoutClasses[cellIdx] ?? "col-span-1 row-span-1"}
              >
                {imgIndex !== null ? (
                  <DraggableImage
                    id={`image-${imgIndex}`}
                    index={imgIndex}
                    image={getImageForCell(cellIdx)}
                  />
                ) : (
                  <span className="text-center text-sm text-gray-500">Empty</span>
                )}
              </DroppableCell>
            ))}
          </div>
        </DndContext>
      </CardContent>
    </Card>
  );
}
