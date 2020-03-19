import React, { useEffect, useState } from 'react';
import { Text, FlatList, Button, View } from 'react-native';
import styled from 'styled-components/native';
import MainFooter from '../components/footer';
import api from '../utils/api';
import locale from '../utils/messages';
import { localeRunner } from '@nzws/bank-monitor-backend/app/utils/locale';

const Block = styled(View)({
  borderBottomWidth: 0.5,
  borderBottomColor: ({ theme: { secondary } }) => secondary,
  padding: 10
});

const Title = styled(Text)({
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 5
});

const Time = styled(Text)({
  fontSize: 12,
  fontWeight: 'normal',
  color: ({ theme: { secondary } }) => secondary
});

const Body = styled(Text)({
  color: ({ theme: { secondary } }) => secondary
});

const BtnView = styled(View)({
  margin: 10
});

const Notification = () => {
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [noti, setNoti] = useState([]);

  const load = async pageId => {
    setIsLoading(true);
    const apiData = await api({
      path: 'api/notification',
      method: 'POST',
      data: {
        page: pageId || page
      }
    });

    if (apiData.result[0]) {
      setNoti(prev => {
        if (pageId) {
          prev = apiData.result;
        } else {
          prev.push(...apiData.result);
        }

        return prev;
      });
      setHasNext(true);
    } else {
      setHasNext(false);
    }

    setIsLoading(false);
    setPage(prev => (pageId || prev) + 1);
  };

  useEffect(() => {
    load(0);
  }, []);

  return (
    <MainFooter now="Notification">
      <FlatList
        data={noti}
        refreshing={isLoading}
        onRefresh={() => load(0)}
        renderItem={({ item }) => {
          const msg = locale[item.type];

          return (
            <Block>
              <Title>
                {localeRunner(msg.title, item.data)}{' '}
                <Time>{new Date(item.createdAt).toLocaleString()}</Time>
              </Title>
              <Body>{localeRunner(msg.body, item.data)}</Body>
            </Block>
          );
        }}
      />

      {hasNext && (
        <BtnView>
          <Button
            title="Load More"
            onPress={() => load()}
            disabled={isLoading}
          />
        </BtnView>
      )}
    </MainFooter>
  );
};

export default Notification;
