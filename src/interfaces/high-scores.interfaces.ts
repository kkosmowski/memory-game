import { BoardSize } from '../enums/board-size.enum';
import { HighScoresListVariant } from '../enums/high-scores-list-variant.enum';

export type HighScoresLists = Record<HighScoresListVariant, number[]>;
export type HighScores = Record<BoardSize, HighScoresLists>;

