import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

let currentNotificationData = null;

export async function displayNotification(remoteMessage) {
  try {
    currentNotificationData = remoteMessage;

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: 'default',
    });

    const notificationId = remoteMessage.messageId || Date.now().toString();

    await notifee.cancelNotification(notificationId);

    await notifee.displayNotification({
      id: notificationId,
      title: remoteMessage.notification?.title || 'Notification',
      body: remoteMessage.notification?.body || 'Message received',
      data: {
        ...remoteMessage.data,
        notificationData: JSON.stringify(remoteMessage),
      },
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        sound: 'default',
        pressAction: {
          id: 'default',
        },
        autoCancel: true,
        ongoing: false,
      },
      ios: {
        sound: 'default',
      },
    });
  } catch (error) {
    console.log('NOTIFICATION ERROR:', error);
  }
}

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Notification Permission Granted');
  }
}

export async function getFCMToken() {
  try {
    const token = await messaging().getToken();
    console.log('FCM TOKEN:', token);
    return token;
  } catch (error) {
    console.log('FCM TOKEN ERROR:', error);
  }
}

export function onTokenRefreshListener() {
  return messaging().onTokenRefresh(token => {
    console.log('NEW FCM TOKEN:', token);
  });
}

export function getCurrentNotificationData() {
  return currentNotificationData;
}

export function clearCurrentNotificationData() {
  currentNotificationData = null;
}