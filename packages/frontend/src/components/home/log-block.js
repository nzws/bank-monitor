import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import { currencyToString } from '../../utils/currency';
import Container from '../container';

const Log = styled(TouchableOpacity)({
  width: '100%',
  position: 'relative',
  paddingRight: 85,
  marginBottom: 25
});

const Name = styled(Text)({
  fontSize: 18,
  marginBottom: 5
});

const Sub = styled(Text)({
  fontSize: 15,
  color: ({ theme: { secondary } }) => secondary
});

const Amount = styled(Text)({
  fontSize: 22,
  color: ({ theme: { primary, info }, isDeposit }) =>
    isDeposit ? primary : info,
  position: 'absolute',
  right: 0,
  top: 8
});

const LogBlock = ({ item }) => {
  const nav = useNavigation();
  const {
    status: [status]
  } = Container.useContainer();

  return (
    <Log onPress={() => nav.navigate('Transaction', { item })}>
      <Amount isDeposit={item.amount > 0}>
        {currencyToString(item.amount)}
      </Amount>
      <Name ellipsizeMode="tail" numberOfLines={1}>
        {item.name}
      </Name>
      <Sub ellipsizeMode="tail" numberOfLines={1}>
        {status[item.bankId]?.display_name}・Balance:{' '}
        {currencyToString(item.balance)}
      </Sub>
    </Log>
  );
};

LogBlock.propTypes = {
  item: PropTypes.object.isRequired
};

export default LogBlock;
