import { ReactElement } from 'react';
import { CircularProgress } from '@material-ui/core';

export function Timer(): ReactElement {
  return (
    <CircularProgress
      variant="determinate"
      value={ 90 }
      size={ 64 }
    />
  );
}