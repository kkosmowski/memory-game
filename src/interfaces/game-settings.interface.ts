import { Difficulty } from "../enums/difficulty.enum";

export interface GameSettings {
  pairsCount: number;
  rows: number;
  cols: number;
  difficulty: Difficulty;
  gameTime: number;
}