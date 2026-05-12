import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import HomeCompo from './src/components/homeCompo';
import PushCompo from './src/components/pushCompo';

export default function App() {
  const [screen, setScreen] = useState('home');

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <HomeCompo onNavigate={setScreen} />;
      case 'push':
        return <PushCompo onNavigate={setScreen} />;
      default:
        return <HomeCompo onNavigate={setScreen} />;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});