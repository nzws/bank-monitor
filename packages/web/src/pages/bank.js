import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { darken, lighten } from 'polished';

import Container from '../components/container';
import History from '../components/bank/history';

const Wrapper = styled(View)`
  display: grid;
  grid-template-columns: 1fr 400px;
  margin: 0 10%;
  height: calc(100% - 39px);
`;

const Left = styled(View)`
  background: ${darken(0.01, '#fff')};
  border-right: 1px solid
    ${({ theme: { secondary } }) => lighten(0.5, secondary)};
  grid-column: 1 / 2;
`;

const Bank = () => {
  const { bankId } = useParams();
  const {
    status: [status, setStatus]
  } = Container.useContainer();
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [balance, setBalance] = useState(0);
  let [data, setData] = useState('{}');
  data = JSON.parse(data);

  const load = (isFirst = false) => {};

  return (
    <Wrapper>
      <Left>
        <Text>Left</Text>
      </Left>

      <History loader={load} data={data} />
    </Wrapper>
  );
};

export default Bank;
