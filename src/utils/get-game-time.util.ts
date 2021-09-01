import { getBoardSizeFromGameSettings } from './get-board-size-from-game-settings.util';
import { GameSettings } from '../interfaces/game-settings.interface';
import { BoardSize } from '../enums/board-size.enum';
import { gameTimes } from '../game-times.consts';
import { Difficulty } from '../enums/difficulty.enum';

export const getGameTime = (settings: GameSettings): number => {
  const boardSize: BoardSize = getBoardSizeFromGameSettings(settings);
  if (settings.difficulty === Difficulty.Relaxing) {
    return 0;
  }
  return gameTimes[boardSize][settings.difficulty];
};