import { Difficulty } from '../enums/difficulty.enum';
import { GamePoints } from './game-points.interface';
import { BoardSize } from '../enums/board-size.enum';

export interface EndData {
  won: boolean;
  elapsed: number;
  points: GamePoints;
  difficulty: Difficulty;
  boardSize: BoardSize;
}