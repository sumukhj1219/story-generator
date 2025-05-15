'use client';

import { useState } from "react";
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import { useTemplateContext } from "~/_contexts/template-context";
import { Card, CardContent } from "~/components/ui/card";

import { DraggableImage } from "../drag-and-drop/DraggableImage";
import { DroppableCell } from "../drag-and-drop/DroppableCell";

export function Temp3() {
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

    const draggedImageCellIndex = cellContents.findIndex(i => i === draggedImageIndex);
    if (draggedImageCellIndex === -1) return;

    setCellContents((prev) => {
      const newContents = [...prev];
      [newContents[draggedImageCellIndex], newContents[targetCellIndex]] = [
        newContents[targetCellIndex],
        newContents[draggedImageCellIndex],
      ];
      return newContents;
    });
  };

  const layoutClasses = [
    "col-span-1 row-span-2 rotate-10",   // 0
    "col-span-2 row-span-2",   // 1
    "col-span-1 row-span-2",   // 2
    "col-span-1 row-span-1",   // 3
    "col-span-1 row-span-1",   // 4
    "col-span-2 row-span-2",   // 5
  ];

  const getImageForCell = (cellIndex: number) => {
    const imgIndex = cellContents[cellIndex];
    return imgIndex !== null && imgIndex !== undefined ? images[imgIndex] ?? null : null;
  };

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
