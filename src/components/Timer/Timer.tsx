import { ReactElement, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';

interface TimerProps {
  initialTime: number;
  onTimerEnd: () => void;
}

export function Timer({ initialTime, onTimerEnd }: TimerProps): ReactElement {
  const [percentage, setPercentage] = useState<number>(100);

  useEffect(() => {
    let currentTime = initialTime;
    const interval = 100;
    const decreaseTime = () => {
      currentTime -= interval / 1000;
      setPercentage(currentTime / initialTime * 100);
    };

    setTimeout(decreaseTime, 0);
    const timerInterval: NodeJS.Timeout = setInterval(() => {
      decreaseTime();
      if (currentTime < 0) {
        onTimerEnd();
        clearTimer();
      }
    }, interval);

    const clearTimer = (): void => clearInterval(timerInterval);
    return () => clearTimer();
  }, []);

  return (
    <CircularProgress
      variant="determinate"
      value={ percentage }
      size={ 64 }
    />
  );
}