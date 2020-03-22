import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  StyleProvider
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import getTheme from '../../native-base-theme/components';

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
    <Button
      vertical
      active={page === now}
      onPress={onPress}
      style={{ backgroundColor: 'transparent' }}
    >
      <Icon active={page === now} name={icon} />
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

const MainFooter = ({ now, children, noContent = false }) => (
  <StyleProvider style={getTheme()}>
    <Container>
      {noContent ? children : <Content>{children}</Content>}
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
  </StyleProvider>
);
MainFooter.propTypes = {
  now: PropTypes.string.isRequired,
  children: PropTypes.node,
  noContent: PropTypes.bool
};

export default MainFooter;
