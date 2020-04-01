import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { lighten } from 'polished';
import styled from 'styled-components/native';

const HeaderBox = styled(View)({
  borderBottomColor: ({ theme: { secondary } }) => lighten(0.6, secondary),
  borderBottomWidth: 1,
  paddingTop: 10,
  paddingBottom: 10,
  marginBottom: 15
});
const HeaderText = styled(Text)({
  fontSize: 18,
  color: ({ theme: { secondary } }) => lighten(0.2, secondary)
});

const LogTitle = ({ section: { date } }) => {
  return (
    <HeaderBox>
      <HeaderText>
        {date.toLocaleDateString('en-us', {
          month: 'short',
          day: 'numeric'
        })}
      </HeaderText>
    </HeaderBox>
  );
};

LogTitle.propTypes = {
  section: PropTypes.object.isRequired
};

export default LogTitle;
