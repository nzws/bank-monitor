import React from 'react';
import { View, SectionList } from 'react-native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import styled from 'styled-components/native';

import { Center, Title } from '../components/styles/layout';
import Head from '../components/home/head';
import LogBlock from '../components/home/log-block';
import LogTitle from '../components/home/log-title';
import Navbar from '../components/home/navbar';

const Main = styled(View)({
  paddingLeft: 20,
  paddingRight: 20
});

const mock = [
  {
    date: new Date(),
    data: []
  }
];

for (let i = 0; i < 20; i++) {
  mock[0].data.push(
    ...[
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
  );
}

const Home = () => {
  return (
    <HeaderImageScrollView
      maxHeight={380}
      renderForeground={() => <Head />}
      renderHeader={() => <Navbar />}
      maxOverlayOpacity={0}
      useNativeDriver
    >
      <Center>
        <Title fontSize={30}>History</Title>
      </Center>

      <Main>
        <SectionList
          sections={mock}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <LogBlock item={item} />}
          renderSectionHeader={({ section }) => <LogTitle section={section} />}
        />
      </Main>
    </HeaderImageScrollView>
  );
};

export default Home;
