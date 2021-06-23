import { ReactElement } from 'react';
import { Card as MaterialCard } from '@material-ui/core';
import styled from 'styled-components';

interface Props {
  value: string;
}

export function Card({ value }: Props): ReactElement {
  return (
    <MemoryCard>{ value }</MemoryCard>
  );
}

const MemoryCard = styled(MaterialCard)`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  font-family: 'Shippori Mincho', 'Times New Roman', serif;
`;