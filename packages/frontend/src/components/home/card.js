import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import shadow from '../styles/shadow';

const Styled = styled(View)({
  borderRadius: 5,
  width: '75%',
  paddingTop: 55,
  paddingBottom: 55,
  margin: 10,
  ...shadow(20),
  alignItems: 'center'
});

const Title = styled(Text)({
  color: 'white',
  fontSize: ({ font }) => font,
  fontWeight: ({ weight }) => weight || 'normal',
  marginTop: 5,
  marginBottom: 5
});

const bankColor = {
  all: '#4088C7',
  'jp-bank': '#009900',
  rakuten: '#bf0000'
};

const bankName = {
  all: 'Bank Monitor',
  'jp-bank': 'Japan Post Bank',
  rakuten: 'Rakuten Bank'
};

const Card = ({ bank, display_name }) => {
  if (!bank) {
    bank = 'all';
  }

  return (
    <Styled style={{ backgroundColor: bankColor[bank] }}>
      <Title font={28} weight="bold" numberOfLines={1}>
        {bankName[bank]}
      </Title>
      <Title font={15} numberOfLines={1}>
        {display_name || ' '}
      </Title>
    </Styled>
  );
};
Card.propTypes = {
  bank: PropTypes.string,
  display_name: PropTypes.string
};

export default Card;
