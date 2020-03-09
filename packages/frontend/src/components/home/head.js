import React from 'react';
import { Image, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { lighten } from 'polished';
import shadow from '../styles/shadow';
import { Center } from '../styles/layout';
import { currencyToString } from '../../utils/currency';
import BankAccount from './bank-account';

const HeadBlock = styled(Center)({
  background: '#fff',
  ...shadow(10)
});

const Avatar = styled(Image)({
  width: 100,
  height: 100,
  borderRadius: 100,
  marginBottom: 15
});

const Title = styled(Text)({
  fontSize: ({ fontSize }) => fontSize || 20
});

const Line = styled(View)({
  borderColor: ({ theme: { secondary } }) => lighten(0.5, secondary),
  borderWidth: 1,
  width: '80%',
  marginTop: 20,
  marginBottom: 20
});

const Desc = styled(Text)({
  fontSize: 15,
  color: '#a2a2a2',
  marginTop: 10
});

const Balance = styled(Text)({
  fontSize: 35,
  marginBottom: 10
});

const Head = () => {
  return (
    <HeadBlock>
      <Avatar source={{ uri: 'https://github.com/nzws.png' }} />
      <Title>nzws</Title>

      <Line />

      <BankAccount />
      <Desc>Balance</Desc>
      <Balance>{currencyToString(12500)}</Balance>
    </HeadBlock>
  );
};

export default Head;
