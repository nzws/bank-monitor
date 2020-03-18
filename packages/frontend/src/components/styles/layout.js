import styled from 'styled-components/native';
import { Platform, StatusBar, View, ScrollView, Text } from 'react-native';

export const HeadMargin = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;

export const Container = styled(ScrollView)({
  marginTop: HeadMargin,
  marginBottom: 20
});

export const NoScrollContainer = styled(View)({
  marginTop: HeadMargin
});

export const Center = styled(View)({
  alignItems: 'center',
  paddingTop: 20,
  paddingBottom: 20
});

export const Title = styled(Text)({
  fontSize: ({ fontSize }) => fontSize || 20
});
