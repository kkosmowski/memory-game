import { BoardSize } from './enums/board-size.enum';
import { Difficulty } from './enums/difficulty.enum';

// v1 = estimated
// v2 = slightly tested
// v3 = tested but can be improved
// v4 = rather optimal
// no comment = optimal

export const gameTimes = {
  [BoardSize.ExtraSmall]: {
    [Difficulty.Easy]: 10.5,
    [Difficulty.Medium]: 8.7,
    [Difficulty.Hard]: 6.5,
    [Difficulty.Impossible]: 3.7,
  },
  [BoardSize.Small]: {
    [Difficulty.Easy]: 21.6,
    [Difficulty.Medium]: 18.4,
    [Difficulty.Hard]: 15.2,
    [Difficulty.Impossible]: 11, // v4
  },
  [BoardSize.Medium]: {
    [Difficulty.Easy]: 48.6,
    [Difficulty.Medium]: 41,
    [Difficulty.Hard]: 33.7,
    [Difficulty.Impossible]: 28.7, // v3
  },
  [BoardSize.Large]: {
    [Difficulty.Easy]: 89, // v4
    [Difficulty.Medium]: 73.6, // v3
    [Difficulty.Hard]: 63, // v2
    [Difficulty.Impossible]: 59, // v1
  },
  [BoardSize.ExtraLarge]: {
    [Difficulty.Easy]: 142, // v3
    [Difficulty.Medium]: 117.6, // v3
    [Difficulty.Hard]: 105, // v3
    [Difficulty.Impossible]: 92, // v3
  },
  [BoardSize.Huge]: {
    [Difficulty.Easy]: 198, // v1
    [Difficulty.Medium]: 168, // v1
    [Difficulty.Hard]: 147, // v1
    [Difficulty.Impossible]: 130, // v1
  },
  [BoardSize.Gigantic]: { // @todo
    [Difficulty.Easy]: 300, // v0
    [Difficulty.Medium]: 270, // v0
    [Difficulty.Hard]: 240, // v0
    [Difficulty.Impossible]: 220, // v0
  },
};