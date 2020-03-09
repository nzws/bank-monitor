import React from 'react';
import { Text, View, SectionList } from 'react-native';
import styled from 'styled-components/native';
import { Center, Container } from '../components/styles/layout';
import Head from '../components/home/head';
import LogBlock from '../components/home/log-block';
import LogTitle from '../components/home/log-title';

const Title = styled(Text)({
  fontSize: ({ fontSize }) => fontSize || 20
});

const Main = styled(View)({
  paddingLeft: 20,
  paddingRight: 20
});

const mock = [
  {
    date: new Date(),
    data: [
      {
        bank: 'rakuten',
        name: 'VISAデビット',
        type: 'withdrawal',
        amount: 5610,
        balance: 1200
      },
      {
        bank: 'jp-bank',
        name: 'カード入金',
        type: 'deposit',
        amount: 12000,
        balance: 12000
      }
    ]
  }
];

const Home = () => {
  return (
    <Container>
      <Head />

      <Center>
        <Title fontSize={30}>History</Title>
      </Center>

      <Main>
        <SectionList
          sections={mock}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <LogBlock item={item} />}
          renderSectionHeader={({ section }) => <LogTitle section={section} />}
        />
      </Main>
    </Container>
  );
};

export default Home;
