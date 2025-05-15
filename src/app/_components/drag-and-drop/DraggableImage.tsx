"use client";

import { useDraggable } from "@dnd-kit/core";

interface DraggableImageProps {
  id: string;
  index: number;
  image: string | null;
}

export function DraggableImage({ id, index, image }: DraggableImageProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        zIndex: 10,
        position: "relative",
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="w-full h-full flex items-center justify-center"
    >
      {image ? (
        <img
          src={image}
          alt={`image-${index}`}
          className="w-full h-full object-cover rounded-md"
        />
      ) : (
        <span className="text-center text-sm text-gray-500">No {index + 1}</span>
      )}
    </div>
  );
}
