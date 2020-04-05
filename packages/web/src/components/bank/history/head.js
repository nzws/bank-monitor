import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';
import { RefreshCw } from '@styled-icons/feather';

const Head = styled(View)`
  border-bottom: 1px solid
    ${({ theme: { secondary } }) => lighten(0.5, secondary)};
  padding: 10px 15px;
  flex-direction: row;
`;

const HeadText = styled(Text)`
  font-size: 1.25rem;
`;

const HeadBtn = styled(RefreshCw)`
  margin-left: auto;
  width: 1.25rem;
  display: block;
  cursor: pointer;
`;

const HistoryHeader = ({ clickReload }) => (
  <Head>
    <HeadText>History</HeadText>
    <HeadBtn onClick={clickReload} />
  </Head>
);

HistoryHeader.propTypes = {
  clickReload: PropTypes.func.isRequired
};

export default HistoryHeader;
