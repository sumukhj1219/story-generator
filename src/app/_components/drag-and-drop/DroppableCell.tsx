"use client";

import { useDroppable } from "@dnd-kit/core";

interface DroppableCellProps {
  id: string;
  children: React.ReactNode;
  layoutClass: string;
}

export function DroppableCell({ id, children, layoutClass }: DroppableCellProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`bg-neutral-700 flex items-center justify-center border-4 border-white ${layoutClass}`}
    >
      {children}
    </div>
  );
}
