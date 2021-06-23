import { ReactElement } from 'react';
import { Card } from '../Card/Card';
import styled from 'styled-components';

export function Board(): ReactElement {
  const _cards: string[] = 'ABCDEFGHIJKL'.split(''); // @todo temp
  const cards: ReactElement[] = _cards.map((char: string) => <Card value={ char } />);
  return (
    <Wrapper>{ cards }</Wrapper>
  );
}

const Wrapper = styled.div`
  display: inline-grid;
  grid-template: repeat(3, 1fr) / repeat(4, 1fr);
  grid-gap: 16px;
`;