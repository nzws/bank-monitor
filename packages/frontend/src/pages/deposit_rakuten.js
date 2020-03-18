import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import { List, ListItem, Text as NText } from 'native-base';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Container from '../components/container';
import { currencyToString } from '../utils/currency';
import api from '../utils/api';

const Title = styled(Text)({
  fontSize: ({ font }) => font || 18,
  padding: 20
});

const Right = styled(NText)({
  position: 'absolute',
  right: 20
});

const Main = styled(View)({
  padding: 20
});

const Desc = styled(Text)({
  color: ({ theme: { secondary } }) => secondary,
  paddingTop: 10,
  paddingBottom: 20
});

const Input = styled(TextInput)({
  marginTop: 10,
  height: 40,
  fontSize: 20,
  borderBottomColor: ({ theme: { secondary } }) => secondary,
  borderBottomWidth: 0.5,
  width: '100%'
});

const DepositRakuten = ({
  route: {
    params: { bankId }
  }
}) => {
  const nav = useNavigation();
  const {
    status: [status]
  } = Container.useContainer();
  const [amount, setAmount] = useState('1000');
  const [running, setRunning] = useState(false);
  const bankStatus = status[bankId];

  const onPress = () => {
    Alert.alert('Sign out', 'Are you sure?', [
      {
        text: 'Cancel'
      },
      {
        text: 'OK',
        onPress: () => {
          setRunning(true);
          api({
            path: 'api/deposit_rakuten',
            method: 'POST',
            data: {
              amount,
              bankId
            }
          }).then(({ result: { amount, fee, schedule } }) => {
            const date = new Date(schedule).toLocaleDateString(null, {
              month: 'long',
              day: 'numeric'
            });
            Alert.alert(
              'Result',
              `Amount: ${currencyToString(amount)}\nFee: ${currencyToString(
                fee
              )}\nSchedule: ${date}`
            );
            nav.navigate('Home');
          });
        }
      }
    ]);
  };

  return (
    <View>
      <Title>Deposit from JP Bank to Rakuten.</Title>

      <List>
        <ListItem>
          <NText>{bankStatus.display_name}</NText>
          <Right>{currencyToString(bankStatus.balance)}</Right>
        </ListItem>
      </List>
      <Main>
        <Text>Amount</Text>

        <Input
          onChangeText={setAmount}
          value={amount}
          autoFocus
          placeholder="Amount"
          autoCompleteType="off"
          keyboardType="number-pad"
          defaultValue="1000"
        />

        <Desc>
          New balance:{' '}
          {currencyToString(
            parseInt(bankStatus.balance) + parseInt(amount || 0)
          )}
        </Desc>

        <Button
          title={running ? 'Running...' : 'Add'}
          onPress={onPress}
          disabled={running}
        />
      </Main>
    </View>
  );
};

DepositRakuten.propTypes = {
  route: PropTypes.object
};

export default DepositRakuten;
