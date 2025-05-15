export function swapDragDropItems(
  cellContents: (number | null)[],
  draggedImageIndex: number,
  targetCellIndex: number
): (number | null)[] {
  const currentCellIndex = cellContents.findIndex(
    (imgIdx) => imgIdx === draggedImageIndex
  );
  if (currentCellIndex === -1) return cellContents;

  const newContents = [...cellContents];
  const targetImage = newContents[targetCellIndex];

  newContents[targetCellIndex] = draggedImageIndex;
  newContents[currentCellIndex] = targetImage ?? null;

  return newContents;
}
