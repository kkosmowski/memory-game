import { Difficulty } from "../enums/difficulty.enum";

export interface GameSettings {
  cardsCount: number;
  rows: number;
  cols: number;
  difficulty: Difficulty;
}