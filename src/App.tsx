import { Memory } from './components/Memory/Memory';
import { useEffect, useState } from 'react';
import { StartScreen } from './components/StartScreen/StartScreen';
import { GameSettings } from './interfaces/game-settings.interface';
import { Difficulty } from './enums/difficulty.enum';
import { EndScreen } from './components/EndScreen/EndScreen';
import { getPairsCount } from './utils/get-pairs-count.util';
import { StorageUtil } from './utils/storage.util';
import { STORAGE_SETTINGS_KEY } from './consts/storage.consts';
import { EndData } from './interfaces/end-data.interface';

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

  useEffect(() => {
    checkStorageForGameSettings();
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
  };

  const onSettingsChange = (newSettings: GameSettings): void => {
    setSettings(newSettings);
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
  };

  const checkStorageForGameSettings = (): void => {
    const savedSettings: GameSettings | null = StorageUtil.get(STORAGE_SETTINGS_KEY);
    if (savedSettings) {
      setSettings(savedSettings);
    }
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
    />;
}

export default App;
