import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

import {
  requestUserPermission,
  getFCMToken,
  displayNotification,
} from '../utils/firebase';

import NotificationModal from './modalNotiyCompo';

const Home = () => {

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {

    requestUserPermission();

    getFCMToken();

    const unsubscribe = messaging().onMessage(async remoteMessage => {

      displayNotification(remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Opened From Background State', remoteMessage);
      showNotificationDetails(remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {

        if (remoteMessage) {
          console.log('Opened From Quit State', remoteMessage);
          showNotificationDetails(remoteMessage);
        }
      });

    notifee.onForegroundEvent(({ type, detail }) => {
      if (type === 1 && detail.pressAction) {
        if (detail.notification.data?.notificationData) {
          const notification = JSON.parse(detail.notification.data.notificationData);
          showNotificationDetails(notification);
        } else {
          showNotificationDetails(detail.notification);
        }
      }
    });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === 1 && detail.pressAction) {
        if (detail.notification.data?.notificationData) {
          const notification = JSON.parse(detail.notification.data.notificationData);
          showNotificationDetails(notification);
        } else {
          showNotificationDetails(detail.notification);
        }
      }
    });

    return unsubscribe;

  }, []);

  const showNotificationDetails = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedNotification(null);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Firebase Push Notification
      </Text>

      <Text style={styles.subtitle}>
        React Native + FCM
      </Text>

      <NotificationModal
        visible={modalVisible}
        notification={selectedNotification}
        onClose={closeModal}
      />

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    color: '#666666',
  },

});

export default Home;