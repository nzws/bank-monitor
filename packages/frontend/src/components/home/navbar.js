import React from 'react';
import { Platform, StatusBar, View, Text } from 'react-native';
import styled from 'styled-components/native';

const HeadBlock = styled(View)({
  paddingLeft: 20,
  paddingRight: 20,
  height: 85,
  paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

const Navbar = () => {
  return (
    <HeadBlock>
      <Text>俺がnavbar</Text>
    </HeadBlock>
  );
};

export default Navbar;
