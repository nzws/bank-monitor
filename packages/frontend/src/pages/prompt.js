import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput, Button } from 'react-native';
import styled from 'styled-components/native';

const Title = styled(Text)({
  fontSize: ({ font }) => font || 18,
  paddingBottom: 20
});

const Main = styled(View)({
  padding: 20
});

const Input = styled(TextInput)({
  marginTop: 10,
  marginBottom: 20,
  height: 40,
  fontSize: 20,
  borderBottomColor: ({ theme: { secondary } }) => secondary,
  borderBottomWidth: 0.5,
  width: '100%'
});

const Prompt = ({
  route: {
    params: { title, message, onSubmit, isPassword }
  }
}) => {
  const [value, setValue] = useState('');

  return (
    <View>
      <Main>
        <Title>{title}</Title>

        <Text>{message}</Text>

        <Input
          onChangeText={setValue}
          value={value}
          autoFocus
          secureTextEntry={isPassword}
        />

        <Button title="OK" onPress={() => onSubmit(value)} />
      </Main>
    </View>
  );
};

Prompt.propTypes = {
  route: PropTypes.object
};

export default Prompt;
