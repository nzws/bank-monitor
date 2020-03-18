import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { List, ListItem, Text as NText } from 'native-base';
import styled from 'styled-components/native';
import Container from '../components/container';
import { currencyToString } from '../utils/currency';

const Title = styled(Text)({
  fontSize: 18,
  padding: 20
});

const Right = styled(NText)({
  position: 'absolute',
  right: 20
});

const Amount = styled(Text)({
  textAlign: 'right',
  fontSize: 25,
  marginRight: 20,
  marginBottom: 10,
  color: ({ theme: { primary, info }, isDeposit }) =>
    isDeposit ? primary : info
});

const bankName = {
  all: 'Bank Monitor',
  'jp-bank': 'ゆうちょ銀行',
  rakuten: '楽天銀行'
};

const Transaction = ({
  route: {
    params: { item }
  }
}) => {
  const {
    status: [status]
  } = Container.useContainer();
  const bankStatus = status[item.bankId];

  return (
    <View>
      <Title>{item.name}</Title>

      <Amount isDeposit={item.amount > 0}>
        {currencyToString(item.amount)}
      </Amount>

      <List>
        <ListItem>
          <NText>Date</NText>
          <Right>{new Date(item.date).toLocaleDateString()}</Right>
        </ListItem>
        <ListItem>
          <NText>Balance of bank</NText>
          <Right>{currencyToString(item.balance)}</Right>
        </ListItem>
        <ListItem>
          <NText>Bank</NText>
          <Right>
            {bankStatus?.display_name} ({bankName[bankStatus.bank]})
          </Right>
        </ListItem>
      </List>
    </View>
  );
};

Transaction.propTypes = {
  route: PropTypes.object
};

export default Transaction;
