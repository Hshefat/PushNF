import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const NotificationModal = ({ visible, notification, onClose }) => {
  if (!notification) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Notification Details</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.label}>Title:</Text>
              <Text style={styles.value}>{notification.notification?.title || 'No title'}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Body:</Text>
              <Text style={styles.value}>{notification.notification?.body || 'No body'}</Text>
            </View>

            {notification.data && Object.keys(notification.data).length > 0 && (
              <View style={styles.section}>
                <Text style={styles.label}>Data:</Text>
                {Object.entries(notification.data).map(([key, value]) => (
                  <View key={key} style={styles.dataRow}>
                    <Text style={styles.dataKey}>{key}:</Text>
                    <Text style={styles.dataValue}>{String(value)}</Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.label}>Message ID:</Text>
              <Text style={styles.valueSmall}>{notification.messageId || 'No ID'}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Sent Time:</Text>
              <Text style={styles.valueSmall}>
                {notification.sentTime ? new Date(notification.sentTime).toLocaleString() : 'Unknown'}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>From:</Text>
              <Text style={styles.valueSmall}>{notification.from || 'Unknown'}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Collapse Key:</Text>
              <Text style={styles.valueSmall}>{notification.collapseKey || 'None'}</Text>
            </View>
          </ScrollView>

          <TouchableOpacity onPress={onClose} style={styles.footerButton}>
            <Text style={styles.footerButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#4A90E2',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    maxHeight: '70%',
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666666',
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 22,
  },
  valueSmall: {
    fontSize: 14,
    color: '#555555',
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F8F8',
  },
  dataKey: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555555',
    width: 120,
    flexShrink: 0,
  },
  dataValue: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },
  footerButton: {
    padding: 16,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default NotificationModal;