import { Difficulty } from '../enums/difficulty.enum';
import { gameTimes } from '../game-times.consts';
import { BoardSize } from '../enums/board-size.enum';

export class ScoreUtil {
  static getScoreStyles = (difficulty: Difficulty | null): string => {
    switch (difficulty) {
      case Difficulty.Impossible:
        return 'color: #cd0505; text-shadow: 0 0 4px #cd050555';
      case Difficulty.Hard:
        return 'color: #de4a06';
      case Difficulty.Medium:
        return 'color: #d89800';
      case Difficulty.Easy:
        return 'color: #68c501';
      default:
        return '';
    }
  };

  static getReachedDifficultyForTime = (time: number, boardSize: BoardSize): Difficulty | null => {
    const difficultyTimes: [Difficulty, number][] = Object.entries(gameTimes[boardSize]) as [Difficulty, number][];
    for (let i = difficultyTimes.length - 1; i >= 0; i--) {
      const [difficulty, maxTime]: [Difficulty, number] = difficultyTimes[i];
      if (maxTime >= time) {
        return difficulty;
      }
    }
    return null;
  };
}