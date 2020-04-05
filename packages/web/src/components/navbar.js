import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';
import { ChevronDown } from '@styled-icons/feather';
import { lighten } from 'polished';

const Wrapper = styled(View)`
  border-bottom: 1px solid ${({ theme: { primary } }) => lighten(0.3, primary)};
  background: ${({ theme: { secondary } }) => lighten(0.7, secondary)};
  padding: 6px;
  display: flex;
  flex-direction: row;
`;

const Item = styled(View)`
  flex-direction: row;
  margin: 0 5px;
  cursor: pointer;

  > div {
    font-size: 1.15rem;
  }
`;

const Partition = styled(View)`
  margin-left: auto;
  display: block;
`;

const BrandLogo = styled(Image)`
  width: 25px;
  height: 25px;
`;

const DownIcon = styled(ChevronDown)`
  margin-left: 3px;
  width: 1rem;
`;

const Navbar = () => {
  return (
    <Wrapper>
      <Item>
        <BrandLogo source={require('../../../app/assets/icon.png')} />
        <Text>Bank Monitor</Text>
      </Item>

      <Partition />

      <Item>
        <Text>Account</Text>
        <DownIcon />
      </Item>
    </Wrapper>
  );
};

export default Navbar;
