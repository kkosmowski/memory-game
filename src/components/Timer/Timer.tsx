import { ReactElement, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';

interface TimerProps {
  initialTime: number;
}

export function Timer({ initialTime }: TimerProps): ReactElement {
  const [percentage, setPercentage] = useState<number>(100);


  useEffect(() => {
    let currentTime = initialTime;
    const interval = 1000;
    const timerInterval: NodeJS.Timeout = setInterval(() => {
      currentTime -= interval / 1000;
      setPercentage(currentTime / initialTime * 100);
      if (currentTime <= 0) {
        clearTimer();
      }
    }, interval);

    const clearTimer = (): void => {
      clearInterval(timerInterval);
    };

    return () => {
      clearTimer();
    };
  }, []);

  return (
    <CircularProgress
      variant="determinate"
      value={ percentage }
      size={ 64 }
    />
  );
}