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
    [Difficulty.Medium]: 8.9,
    [Difficulty.Hard]: 7.1,
  },
  [BoardSize.Small]: {
    [Difficulty.Easy]: 21.6,
    [Difficulty.Medium]: 18.4,
    [Difficulty.Hard]: 15.6,
  },
  [BoardSize.Medium]: {
    [Difficulty.Easy]: 48.6,
    [Difficulty.Medium]: 41,
    [Difficulty.Hard]: 33.7,
  },
  [BoardSize.Large]: {
    [Difficulty.Easy]: 85, // v3
    [Difficulty.Medium]: 73.6, // v3
    [Difficulty.Hard]: 63, // v2
  },
  [BoardSize.ExtraLarge]: {
    [Difficulty.Easy]: 147, // v1
    [Difficulty.Medium]: 131, // v1
    [Difficulty.Hard]: 116.5, // v1
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