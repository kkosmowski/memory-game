import { Difficulty } from '../enums/difficulty.enum';
import { GamePoints } from './game-points.interface';

export interface EndData {
  won: boolean;
  elapsed: string;
  points: GamePoints;
  difficulty: Difficulty;
}