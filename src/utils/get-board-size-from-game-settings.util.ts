import { GameSettings } from '../interfaces/game-settings.interface';
import { BoardSize } from '../enums/board-size.enum';

export const getBoardSizeFromGameSettings = (settings: GameSettings): BoardSize => {
  return `${ settings.rows }×${ settings.cols }` as BoardSize;
};
