import { BoardSize } from './enums/board-size.enum';
import { Difficulty } from './enums/difficulty.enum';

// v1 = estimated
// v2 = slightly tested
// v3 = tested but can be improved
// v4 = rather optimal
// no comment = optimal

export const gameTimes = {
  [BoardSize.ExtraSmall]: {
    [Difficulty.Easy]: 12,
    [Difficulty.Medium]: 9,
    [Difficulty.Hard]: 7.2,
  },
  [BoardSize.Small]: {
    [Difficulty.Easy]: 24, // v3
    [Difficulty.Medium]: 20, // v3
    [Difficulty.Hard]: 17, // v3
  },
  [BoardSize.Medium]: {
    [Difficulty.Easy]: 50, // v3
    [Difficulty.Medium]: 41, // v3
    [Difficulty.Hard]: 35, // v2
  },
  [BoardSize.Large]: {
    [Difficulty.Easy]: 84, // v2
    [Difficulty.Medium]: 70, // v1
    [Difficulty.Hard]: 65, // v1
  },
  [BoardSize.ExtraLarge]: { // @todo
    [Difficulty.Easy]: 15, // v0
    [Difficulty.Medium]: 10, // v0
    [Difficulty.Hard]: 8, // v0
  },
  [BoardSize.Huge]: { // @todo
    [Difficulty.Easy]: 15, // v0
    [Difficulty.Medium]: 10, // v0
    [Difficulty.Hard]: 8, // v0
  },
  [BoardSize.Gigantic]: { // @todo
    [Difficulty.Easy]: 9999, // v0
    [Difficulty.Medium]: 10, // v0
    [Difficulty.Hard]: 8, // v0
  },
};