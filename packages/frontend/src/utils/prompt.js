import { Alert, Platform } from 'react-native';

const prompt = (
  title = '',
  message = '',
  callback,
  isPassword = false,
  navigation
) => {
  if (Platform.OS === 'ios') {
    Alert.prompt(
      title,
      message,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: callback
        }
      ],
      {
        cancelable: true,
        type: isPassword ? 'secure-text' : 'default'
      }
    );
  } else {
    navigation.navigate('Prompt', {
      title,
      message,
      onSubmit(value) {
        navigation.goBack();
        callback(value);
      },
      isPassword
    });
  }
};

export default prompt;
