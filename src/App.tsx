import { Memory } from './components/Memory/Memory';
import { useEffect, useState } from 'react';
import { StartScreen } from './components/StartScreen/StartScreen';
import { GameSettings } from './interfaces/game-settings.interface';
import { Difficulty } from './enums/difficulty.enum';
import { EndScreen } from './components/EndScreen/EndScreen';
import { getPairsCount } from './utils/get-pairs-count.util';
import { StorageUtil } from './utils/storage.util';
import { STORAGE_SETTINGS_KEY } from './consts/storage.consts';

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
  const [elapsedTime, setElapsedTime] = useState<string>('');
  const [userWon, setUserWon] = useState<boolean>(true);

  useEffect(() => {
    checkStorageForGameSettings();
  }, []);

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
    setElapsedTime((timeInSeconds).toFixed(2) + 's');
    if (settings.difficulty !== Difficulty.Relaxing) {
      setUserWon(timeInSeconds < settings.gameTime);
    }
  };

  const onSettingsChange = (newSettings: GameSettings): void => {
    setSettings(newSettings);
  };

  const onTimerEnd = (): void => {
    setFinished(true);
    setUserWon(false);
    setElapsedTime(settings.gameTime + 's');
  };

  const checkStorageForGameSettings = (): void => {
    console.log('checkStorageForGameSettings');
    const savedSettings: GameSettings | null = StorageUtil.get(STORAGE_SETTINGS_KEY);
    if (savedSettings) {
      setSettings(savedSettings);
    }
  };

  return initialized
    ? finished
      ? <EndScreen
        win={ userWon }
        onRestart={ onRestart }
        difficulty={ settings.difficulty }
        elapsed={ elapsedTime }
      />
      : <Memory onFinish={ onFinish } onTimerEnd={ onTimerEnd } settings={ settings } />
    : <StartScreen
      onStart={ onStart }
      onSettingsChange={ onSettingsChange }
      gameSettings={ settings }
    />;
}

export default App;
