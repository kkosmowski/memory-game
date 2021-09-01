import { GameSettings } from '../interfaces/game-settings.interface';
import { BoardSize } from '../enums/board-size.enum';
import { boardSizeChar } from '../consts/board-size.consts';

export const getBoardSizeFromGameSettings = (settings: GameSettings): BoardSize => {
  return `${ settings.rows }${ boardSizeChar }${ settings.cols }` as BoardSize;
};
