import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Chargement from '../chargement/chargement';

export default function Connexion() {
  // État pour stocker l'email
  const [email, setEmail] = useState('');
  // État pour stocker le mot de passe
  const [password, setPassword] = useState('');
  // État pour gérer la visibilité du mot de passe
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // État pour gérer l'état de la case à cocher "Se souvenir de moi"
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();

  // Tableau des champs de saisie
  const fields = [
    { label: 'Email', value: email, onChangeText: setEmail },
    { label: 'Mot de passe', value: password, onChangeText: setPassword }
  ];

  // Fonction pour gérer le clic sur le bouton "Se connecter"
  const handleLogin = () => {
    if (email === '' || password === '') {
      // Afficher une alerte si les champs sont vides
      Alert.alert('Erreur', 'Les champs sont vides. Veuillez les remplir.');
    } else {
      // Naviguer vers la page "Tabs" si les champs sont remplis
      navigation.navigate('Tabs');
    }
  };

  const [chargement, setChargement] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginTop: '20%', paddingHorizontal: 20, gap: 15 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Ionicons name="arrow-back-outline" size={40} color="#000000" />
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Créer Votre Compte</Text>
          </View>

          <View>
            <Text style={{ fontSize: 20, color: 'rgba(169,169,169,0.9)' }}>Créer Votre Compte</Text>
          </View>
        </View>

        <View>
          {fields.map((field, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                onChangeText={field.onChangeText} // Mise à jour de l'état correspondant (email ou mot de passe)
                placeholder={field.label} // Affichage de l'indication du champ
                value={field.value} // Valeur du champ de saisie
                secureTextEntry={field.label === 'Mot de passe' && !isPasswordVisible} // Masquer le texte pour le mot de passe
              />
              {field.label === 'Mot de passe' && (
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Ionicons
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} // Icône pour afficher/masquer le mot de passe
                    size={28}
                    color="#000000"
                    style={{ marginLeft: -50 }}
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <View>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'} // État de la case à cocher
                onPress={() => setChecked(!checked)} // Mise à jour de l'état de la case à cocher
                color={checked ? '#E60449' : 'gray'} // Couleur de la Checkbox lorsqu'elle est cochée
                uncheckedColor="gray" // Couleur de la Checkbox lorsqu'elle n'est pas cochée
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#000000', fontSize: 15, fontWeight: '500' }}>Se souvenir de moi</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('MotDePasseOublier')}>
            <Text style={{ color: '#E60449', fontSize: 15, fontWeight: '500' }}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>

        <View>
          {
            chargement ? (

              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Chargement/>
              </View>

            ) : (
              <TouchableOpacity onPress={handleLogin}>
                <View style={{ backgroundColor: '#E60449', padding: 15, marginVertical: 10, marginHorizontal: 10, borderRadius: 10, justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Se connecter</Text>
                </View>
              </TouchableOpacity>
            )
          }
        </View>

        <View>
          <View>

          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8, paddingHorizontal: 18 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            <Text style={{ marginHorizontal: 10, fontSize: 16, color: 'black' }}>Ou</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          </View>
          <View>
            <TouchableOpacity>
              <View style={{ backgroundColor: '#1E90FF', padding: 10, marginVertical: 10, marginHorizontal: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                <Ionicons name="logo-facebook" size={28} color='#FFFFFF' />
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Se connecter avec Facebook</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <View style={{ backgroundColor: '#FFA07A', padding: 10, marginVertical: 10, marginHorizontal: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                <Ionicons name="logo-google" size={28} color='#FFFFFF' />
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Se connecter avec Google</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: '35%' }}>
            <Text style={{ textAlign: 'center', marginVertical: 10, color: '#000000', fontSize: 15, fontWeight: '500' }}>Vous n'avez pas de compte ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
              <Text style={{ textAlign: 'center', color: '#E60449', fontSize: 15, fontWeight: '500' }}>Créer un compte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
  input: {
    height: 50,
    margin: 8,
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'rgba(169,169,169,0.1)',
    paddingHorizontal: 20,
    flex: 1
  },
});
