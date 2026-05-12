import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeCompo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello Shefat Hasnain</Text>
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
    fontWeight: 'bold',
  },
});

export default HomeCompo;