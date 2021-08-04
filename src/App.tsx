import { Memory } from './components/Memory/Memory';
import { useState } from 'react';
import { StartScreen } from './components/StartScreen/StartScreen';
import { GameSettings } from './interfaces/game-settings.interface';
import { Difficulty } from './enums/difficulty.enum';
import { EndScreen } from './components/EndScreen/EndScreen';

const cols = 4;
const rows = 3;

const defaultGameSettings: GameSettings = {
  pairsCount: (cols * rows) / 2,
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
    setElapsedTime((((new Date()).getTime() - startingTime!.getTime()) / 1000).toFixed(2) + 's');
  };

  const onSettingsChange = (newSettings: GameSettings): void => {
    setSettings(newSettings);
  };

  return initialized
    ? finished
      ? <EndScreen
        onRestart={ onRestart }
        difficulty={ settings.difficulty }
        elapsed={ elapsedTime }
      />
      : <Memory onFinish={ onFinish } settings={ settings } />
    : <StartScreen
      onStart={ onStart }
      onSettingsChange={ onSettingsChange }
      gameSettings={ settings }
    />;
}

export default App;
