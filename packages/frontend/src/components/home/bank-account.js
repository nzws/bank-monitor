import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

const BankAccountBlock = styled(FlatList)({
  paddingBottom: 10,
  marginBottom: 5
});

const BankAccountTab = styled(TouchableOpacity)({
  alignItems: 'center',
  paddingLeft: 10,
  paddingRight: 10,
  minWidth: 100
});
const BankAccountText = styled(Text)(
  ({ active, theme: { primary, secondary } }) => ({
    fontSize: 20,
    fontWeight: 300,
    color: active ? primary : secondary,
    textTransform: 'capitalize'
  })
);

const accounts = ['all', 'jp-bank', 'rakuten'];
const isActive = 'all';

const BankAccount = () => {
  const nav = useNavigation();

  return (
    <BankAccountBlock
      data={accounts}
      renderItem={({ item }) => (
        <BankAccountTab onPress={() => nav.push('Settings')}>
          <BankAccountText active={item === isActive}>{item}</BankAccountText>
        </BankAccountTab>
      )}
      keyExtractor={(item, index) => index}
      horizontal
    />
  );
};

export default BankAccount;
