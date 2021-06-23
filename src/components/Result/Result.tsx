import { ReactElement } from 'react';

interface Props {
  total: number;
}

export function Result({ total }: Props): ReactElement {
  return (
    <span>Current score: 0/{ total }</span> //@todo change to real score
  );
}