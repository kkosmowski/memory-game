import { Memory } from './components/Memory/Memory';
import { useEffect, useState } from 'react';
import { StartScreen } from './components/StartScreen/StartScreen';
import { GameSettings } from './interfaces/game-settings.interface';
import { Difficulty } from './enums/difficulty.enum';
import { EndScreen } from './components/EndScreen/EndScreen';
import { getPairsCount } from './utils/get-pairs-count.util';
import { StorageUtil } from './utils/storage.util';
import { STORAGE_HIGH_SCORES_KEY, STORAGE_SETTINGS_KEY } from './consts/storage.consts';
import { EndData } from './interfaces/end-data.interface';
import { getGameTime } from './utils/get-game-time.util';
import { HighScores, HighScoresLists } from './interfaces/high-scores.interfaces';
import { getBoardSizeFromGameSettings } from './utils/get-board-size-from-game-settings.util';
import { NUMBER_OF_SCORES } from './consts/high-scores.consts';
import { BoardSize } from './enums/board-size.enum';

const cols = 4;
const rows = 3;

const defaultGameSettings: GameSettings = {
  pairsCount: getPairsCount({ rows, cols }),
  rows,
  cols,
  difficulty: Difficulty.Relaxing,
  gameTime: 0,
};

function App() {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [settings, setSettings] = useState<GameSettings>(defaultGameSettings);
  const [startingTime, setStartingTime] = useState<Date>();
  const [endData, setEndData] = useState<EndData | null>(null);
  const [storedHighScores, setStoredHighScores] = useState<HighScores | null>(null);

  useEffect(() => {
    checkStorageForGameSettings();
    checkStorageForHighScores();
  }, []);

  useEffect(() => {
    if (endData) {
      setFinished(true);
    }
  }, [endData]);

  const onStart = (): void => {
    setInitialized(true);
    setStartingTime(new Date());
  };

  const onRestart = (): void => {
    setFinished(false);
    setInitialized(false);
  };

  const onFinish = (): void => {
    setFinished(true);
    const timeInSeconds: number = ((new Date()).getTime() - startingTime!.getTime()) / 1000;
    setEndData({
      won: settings.difficulty !== Difficulty.Relaxing
        ? timeInSeconds < settings.gameTime
        : true,
      elapsed: (timeInSeconds).toFixed(2) + 's',
      points: {
        score: settings.pairsCount,
        total: settings.pairsCount
      },
      difficulty: settings.difficulty,
    });
    saveHighScores(true, +timeInSeconds.toFixed(2));
  };

  const onSettingsChange = (newSettings: GameSettings): void => {
    setSettings({
      ...newSettings,
      gameTime: getGameTime(newSettings)
    });
  };

  const onTimerEnd = (score: number): void => {
    setEndData({
      won: false,
      elapsed: settings.gameTime + 's',
      points: {
        score,
        total: settings.pairsCount
      },
      difficulty: settings.difficulty,
    });
    saveHighScores(false, settings.gameTime);
  };

  const checkStorageForGameSettings = (): void => {
    const savedSettings: GameSettings | null = StorageUtil.get<GameSettings>(STORAGE_SETTINGS_KEY);
    if (savedSettings) {
      setSettings(savedSettings);
    }
  };

  const checkStorageForHighScores = (): void => {
    const highScores: HighScores | null = StorageUtil.get<HighScores>(STORAGE_HIGH_SCORES_KEY);
    setStoredHighScores(highScores);
  };

  const saveHighScores = (won: boolean, time: number): void => {
    const currentBoardSize: BoardSize = getBoardSizeFromGameSettings(settings);
    let currentHighScores: HighScoresLists = {
      top: [],
      last: []
    };
    if (storedHighScores && storedHighScores[currentBoardSize]) {
      currentHighScores = storedHighScores[currentBoardSize];
    }

    if (won) {
      updateTopHighScores(currentHighScores.top, time);
    }
    updateLastHighScores(currentHighScores.last, time);
    setNewHighScores(currentBoardSize, currentHighScores);
  };

  const updateTopHighScores = (scores: number[], time: number): void => {
    if (scores.length < NUMBER_OF_SCORES || !scores[scores.length - 1] || scores[scores.length - 1] > time) {
      scores.push(time);
      scores.sort((timeA, timeB) => timeA - timeB);
      trimScoresIfNecessary(scores);
    }
  };

  const updateLastHighScores = (scores: number[], time: number): void => {
    scores.unshift(time);
    trimScoresIfNecessary(scores);
  };

  const trimScoresIfNecessary = (scores: number[]): void => {
    if (scores.length > NUMBER_OF_SCORES) {
      scores.length = NUMBER_OF_SCORES;
    }
  };

  const setNewHighScores = (boardSize: BoardSize, highScoresLists: HighScoresLists): void => {
    const newHighScores: HighScores = {
      ...storedHighScores!,
      [boardSize]: highScoresLists
    };
    setStoredHighScores(newHighScores);
    StorageUtil.set<HighScores>(STORAGE_HIGH_SCORES_KEY, newHighScores);
  };

  return initialized
    ? finished
      ? <EndScreen
        data={ endData! }
        onRestart={ onRestart }
      />
      : <Memory onFinish={ onFinish } onTimerEnd={ onTimerEnd } settings={ settings } />
    : <StartScreen
      onStart={ onStart }
      onSettingsChange={ onSettingsChange }
      gameSettings={ settings }
      highScores={ storedHighScores }
    />;
}

export default App;
