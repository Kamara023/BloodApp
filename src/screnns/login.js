import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'; // Import de useNavigation

const DATA = [
  {
    id: 1,
    title: "S'inscrire",
    routeName: 'Inscription', // Nom de l'écran vers lequel naviguer
  },
  {
    id: 2,
    title: 'Connexion',
    routeName: 'Connexion', // Nom de l'écran vers lequel naviguer
  },
];

const Item = ({ title, routeName }) => {
  const navigation = useNavigation(); // Récupération de l'objet de navigation

  const handlePress = () => {
    navigation.navigate(routeName); // Navigation vers l'écran spécifié
  };

  return (
    <TouchableOpacity style={title === "S'inscrire" ? styles.itemRegister : styles.itemLogin} onPress={handlePress}>
      <Text style={title === "S'inscrire" ? styles.titleRegister : styles.titleLogin}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.degrader}></View>
      <Image source={require('../../assets/image/blood5.jpg')}
        style={{ width: 380, height: 380, marginTop: 50 }}
      />
      <View style={{ marginTop: 70, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <Text style={{ fontSize: 27, fontWeight: 'bold', color: "#000000" }}>Bienvenue à RedFlow:{'\n'}          Ville proche</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'rgba(169,169,169,0.5)' }}>consectetur ullamco laboris nisi ut a{'\n'}                     Ville proche</Text>
      </View>

      <SafeAreaView style={styles.container2}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} routeName={item.routeName} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    gap: 15,
    paddingHorizontal:10
  },
  degrader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%', // Commence du milieu de l'écran
    bottom: 0,
    backgroundColor: 'rgba(169,169,169,0.1)', // Gris avec opacité réduite
    borderTopLeftRadius: 100, // Réduit la bordure en haut à gauche
    borderTopRightRadius: 100, // Réduit la bordure en haut à droite

  },
  container2: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  itemRegister: {
    backgroundColor: '#E60449',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 10,
    justifyContent:'flex-end',
    alignItems:'center'
  },
  itemLogin: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    justifyContent:'flex-end',
    alignItems:'center',
    borderWidth:1.5,
    borderColor:'#E60449',
  },
  titleRegister: {
    fontSize: 25,
    color: 'white',
    fontWeight:'bold'
  },
  titleLogin: {
    fontSize: 25,
    color: '#E60449',
    fontWeight:'bold'
  },
});
