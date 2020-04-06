import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const getNotificationToken = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  return status === 'granted' ? Notifications.getExpoPushTokenAsync() : null;
};

export default getNotificationToken;
