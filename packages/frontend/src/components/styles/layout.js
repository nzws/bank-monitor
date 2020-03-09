import styled from 'styled-components/native';
import { Platform, StatusBar, View, ScrollView } from 'react-native';

export const Container = styled(ScrollView)({
  marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
});

export const Center = styled(View)({
  alignItems: 'center',
  paddingTop: 20,
  paddingBottom: 20
});
