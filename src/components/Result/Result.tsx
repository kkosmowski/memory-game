import { ReactElement } from 'react';

interface Props {
  score: number;
  total: number;
}

export function Result({ score, total }: Props): ReactElement {
  return (
    <span>Current score: { score }/{ total }</span> //@todo change to real score
  );
}