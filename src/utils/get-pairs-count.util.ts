export function getPairsCount({ rows, cols }: { rows: number, cols: number }): number {
  return rows * cols / 2;
}