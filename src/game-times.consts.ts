import { BoardSize } from './enums/board-size.enum';
import { Difficulty } from './enums/difficulty.enum';

// v1 = estimated
// v2 = slightly tested
// v3 = tested but can be improved
// v4 = rather optimal
// no comment = optimal

export const gameTimes = {
  [BoardSize.ExtraSmall]: {
    [Difficulty.Easy]: 11,
    [Difficulty.Medium]: 9,
    [Difficulty.Hard]: 7.3,
  },
  [BoardSize.Small]: {
    [Difficulty.Easy]: 23, // v4
    [Difficulty.Medium]: 19.4, // v4
    [Difficulty.Hard]: 16.8, // v4
  },
  [BoardSize.Medium]: {
    [Difficulty.Easy]: 51.7, // v4
    [Difficulty.Medium]: 44.5, // v4
    [Difficulty.Hard]: 35, // v34
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
    [Difficulty.Easy]: 300, // v0
    [Difficulty.Medium]: 10, // v0
    [Difficulty.Hard]: 8, // v0
  },
};