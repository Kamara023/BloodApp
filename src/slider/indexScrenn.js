import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function IndexScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('NextScreen');
    }, 5000); // 20000 millisecondes = 20 secondes

    return () => clearTimeout(timer); // Nettoyer le minuteur si le composant est démonté
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/image/blood1.png')}
        style={{ width: 200, height: 200, justifyContent: 'center', tintColor: '#ffff' }} />
      <View>
        <Text style={{ color: '#ffff', fontSize: 38, fontWeight: 'bold' }}>Flux Rouge</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E60449',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15
  },
});

