import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PushCompo = ({ onNavigate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pu sh noti Screen</Text>

      <Button
        title="Back to Home"
        onPress={() => onNavigate('home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    marginBottom: 20,
  },
});

export default PushCompo;