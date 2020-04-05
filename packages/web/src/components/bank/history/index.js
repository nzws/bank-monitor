import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, SectionList, View } from 'react-native';
import styled from 'styled-components';
import { darken } from 'polished';
import HistoryHeader from './head';
import LogBlock from '../../../../../app/src/components/home/log-block';
import LogTitle from '../../../../../app/src/components/home/log-title';

const Right = styled(View)`
  background: ${darken(0.01, '#fff')};
  grid-column: 2 / 3;
`;

const History = ({ data, loader }) => {
  return (
    <Right>
      <HistoryHeader clickReload={() => loader(true)} />

      <ScrollView>
        <SectionList
          sections={Object.keys(data).map(key => ({
            date: new Date(data[key][0].date),
            data: data[key]
          }))}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <LogBlock
              item={item}
              onClick={void 0}
              bankStatus={status[item.bankId]}
            />
          )}
          renderSectionHeader={({ section }) => <LogTitle section={section} />}
          onRefresh={() => loader(true)}
        />
      </ScrollView>
    </Right>
  );
};

History.propTypes = {
  data: PropTypes.object.isRequired,
  loader: PropTypes.func.isRequired
};

export default History;
