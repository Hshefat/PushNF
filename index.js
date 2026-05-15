import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import App from './App';
import { name as appName } from './app.json';

// BACKGROUND / KILLED STATE MESSAGE
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background Message:', remoteMessage);
});

// REGISTER APP
AppRegistry.registerComponent(appName, () => App);