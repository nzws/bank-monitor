import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { List, ListItem, Text as NText } from 'native-base';
import styled from 'styled-components/native';
import Container from '../components/container';
import { currencyToString } from '../utils/currency';
import { descData, useName } from '../utils/add-data';

const TitleView = styled(View)({
  padding: 20
});

const Title = styled(Text)({
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 5
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
  'jp-bank': 'Japan Post Bank',
  rakuten: 'Rakuten Bank'
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
  const type = item.data?.type;
  const data = item.data;

  const items = [
    ['Type', descData(type, true) || 'Unknown'],
    ['Date', new Date(item.date).toLocaleDateString()],
    ['Balance of bank', currencyToString(item.balance)],
    ['Bank', `${bankStatus?.display_name} (${bankName[bankStatus.bank]})`]
  ];

  if (type === 'debit') {
    items.push(
      ['Transaction No.', data.transactionNo],
      ['Transaction type', data.transactionType],
      ['Used point', data.usedPoint]
    );
  }

  const name = useName(item);

  return (
    <View>
      <TitleView>
        <Title>{name}</Title>
        {name !== item.name && <Text>{item.name}</Text>}
      </TitleView>

      <Amount isDeposit={item.amount > 0}>
        {currencyToString(item.amount)}
      </Amount>

      <List>
        {items.map((v, key) => (
          <ListItem key={key}>
            <NText>{v[0]}</NText>
            <Right>{v[1]}</Right>
          </ListItem>
        ))}
      </List>
    </View>
  );
};

Transaction.propTypes = {
  route: PropTypes.object
};

export default Transaction;
