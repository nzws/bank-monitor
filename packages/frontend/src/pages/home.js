import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, SectionList, Button, Text } from 'react-native';
import { Tab, Tabs, ScrollableTab } from 'native-base';
import styled from 'styled-components/native';

import { Center, Title } from '../components/styles/layout';
import LogBlock from '../components/home/log-block';
import LogTitle from '../components/home/log-title';
import api from '../utils/api';
import MainFooter from '../components/footer';
import { currencyToString } from '../utils/currency';
import shadow from '../components/styles/shadow';
import Container from '../components/container';
import { Container as NContainer } from '../components/styles/layout';
import updateStatus from '../utils/status';

const Main = styled(View)({
  paddingLeft: 20,
  paddingRight: 20,
  marginBottom: 20
});

const HeadBlock = styled(Center)({
  background: '#fff',
  ...shadow(10)
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

const Home = ({ bankId }) => {
  let {
    status: [status, setStatus]
  } = Container.useContainer();
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  let [data, setData] = useState('{}');
  data = JSON.parse(data);

  const load = async () => {
    updateStatus(setStatus);
    const apiData = await api({
      path: 'api/history',
      method: 'POST',
      data: {
        page,
        bankId: bankId === 'all' ? null : bankId
      }
    });

    if (apiData.result[0]) {
      const newData = JSON.parse(JSON.stringify(data));
      apiData.result.forEach(v => {
        const day = new Date(v.date).toLocaleDateString('en-us');

        if (!newData[day]) {
          newData[day] = [];
        }
        newData[day].push(v);
      });
      setData(JSON.stringify(newData));
    } else {
      setHasNext(false);
    }

    setIsLoading(false);
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    load();
  }, []);

  let balance;
  if (Object.keys(status)[0]) {
    balance =
      bankId === 'all'
        ? Object.values(status)
            .map(v => v.balance)
            .reduce((a, c) => a + c, 0)
        : status[bankId].balance;
  }

  return (
    <>
      <HeadBlock>
        <Desc>Balance</Desc>
        <Balance>
          {balance !== undefined ? currencyToString(balance) : 'Loading...'}
        </Balance>
      </HeadBlock>

      <Center>
        <Title fontSize={30}>History</Title>
      </Center>

      <Main>
        <SectionList
          sections={Object.keys(data).map(key => ({
            date: new Date(data[key][0].date),
            data: data[key]
          }))}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <LogBlock item={item} />}
          renderSectionHeader={({ section }) => <LogTitle section={section} />}
          refreshing={setIsLoading}
        />

        {hasNext && (
          <Button
            title="Load More"
            onPress={load}
            disabled={isLoading}
            style={{ marginTop: 25 }}
          />
        )}
      </Main>
    </>
  );
};
Home.propTypes = {
  bankId: PropTypes.string
};

const HomeTab = () => {
  let {
    status: [status]
  } = Container.useContainer();

  // todo: tabをfixedしたい
  return (
    <MainFooter now="Home">
      <NContainer>
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading="All">
            <Home bankId="all" />
          </Tab>
          {Object.values(status).map(({ bankId, display_name }) => (
            <Tab heading={display_name} key={bankId}>
              <Home bankId={bankId} />
            </Tab>
          ))}
        </Tabs>
      </NContainer>
    </MainFooter>
  );
};

export default HomeTab;
