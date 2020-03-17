import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text
} from 'native-base';
import { useNavigation } from '@react-navigation/native';

const isAndroid = Platform.OS === 'android';

const Btn = ({ icon, page, now, text }) => {
  const nav = useNavigation();

  const onPress = () => {
    if (page === now) return;

    nav.reset({
      index: 0,
      routes: [{ name: page }]
    });
  };

  return (
    <Button vertical active={page === now} onPress={onPress}>
      <Icon
        active={page === now}
        name={`${isAndroid ? 'md' : 'ios'}-${icon}`}
      />
      <Text>{text}</Text>
    </Button>
  );
};
Btn.propTypes = {
  icon: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  now: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

const MainFooter = ({ now, children }) => (
  <Container>
    <Content>{children}</Content>
    <Footer>
      <FooterTab>
        <Btn icon="list-box" page="Home" now={now} text="History" />
        <Btn
          icon="notifications"
          page="Notification"
          now={now}
          text="Notification"
        />
        <Btn icon="settings" page="Setting" now={now} text="Setting" />
      </FooterTab>
    </Footer>
  </Container>
);
MainFooter.propTypes = {
  now: PropTypes.string.isRequired,
  children: PropTypes.node,
  useContent: PropTypes.bool
};

export default MainFooter;
