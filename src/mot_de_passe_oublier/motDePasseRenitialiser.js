import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MotDePasseRenitialiser() {
  // État pour stocker le nouveau mot de passe
  const [newPassword, setNewPassword] = useState('');

  // État pour stocker la confirmation du mot de passe
  const [confirmPassword, setConfirmPassword] = useState('');

  // État pour gérer la visibilité du nouveau mot de passe
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // État pour gérer la visibilité de la confirmation du mot de passe
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  // Hook de navigation pour naviguer entre les écrans
  const navigation = useNavigation();

  // Définition des champs de texte pour le nouveau mot de passe et la confirmation du mot de passe
  const fields = [
    { label: 'Nouveau Mot de passe', value: newPassword, onChangeText: setNewPassword },
    { label: 'Confirmer Mot de passe', value: confirmPassword, onChangeText: setConfirmPassword }
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Section du haut contenant le bouton de retour et les titres */}
        <View style={{ marginTop: '20%', paddingHorizontal: 20, gap: 15 }}>
          {/* Bouton pour revenir à l'écran de connexion */}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Ionicons name="arrow-back-outline" size={40} color="#000000" />
          </TouchableOpacity>
          {/* Titre principal */}
          <View>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Renitialiser Votre Mot de Passe</Text>
          </View>
          {/* Sous-titre */}
          <View style={{marginBottom:20}}>
            <Text style={{ fontSize: 20, color: 'rgba(169,169,169,0.9)' }}>Renitialisation de votre mot de passe</Text>
          </View>
        </View>

        {/* Section des champs de texte pour le mot de passe */}
        <View>
          {fields.map((field, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', }}>
              {/* Champ de texte pour le mot de passe */}
              <TextInput
                style={[styles.input, { flex: 1 }]}
                onChangeText={field.onChangeText}
                placeholder={field.label}
                value={field.value}
                // Masquer le texte sauf si la visibilité est activée
                secureTextEntry={
                  (field.label === 'Nouveau Mot de passe' && !isPasswordVisible) ||
                  (field.label === 'Confirmer Mot de passe' && !isConfirmPasswordVisible)
                }
              />
              {/* Icône pour afficher/masquer le mot de passe */}
              {field.label === 'Nouveau Mot de passe' && (
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Ionicons
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={28}
                    color="#000000"
                    style={{ marginLeft: -50 }}
                  />
                </TouchableOpacity>
              )}
              {field.label === 'Confirmer Mot de passe' && (
                <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                  <Ionicons
                    name={isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={28}
                    color="#000000"
                    style={{ marginLeft: -50 }}
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Bouton de connexion */}
        <View>
          <TouchableOpacity>
            <View style={{ backgroundColor: '#E60449', padding: 18, marginVertical: 45, marginHorizontal: 10, borderRadius: 10, justifyContent: 'flex-end', alignItems: 'center',  }}>
              <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Renitialiser le Mot de Passe</Text>
            </View>
          </TouchableOpacity>
          {/* Lien pour créer un compte */}
         
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Faire en sorte que le conteneur occupe tout l'espace disponible
    paddingHorizontal: 15 // Ajouter du padding horizontal pour le conteneur
  },
  input: {
    height: 50, // Hauteur du champ de texte
    margin: 8, // Marge autour du champ de texte
    padding: 10, // Padding intérieur du champ de texte
    borderRadius: 15, // Bordure arrondie du champ de texte
    backgroundColor: 'rgba(169,169,169,0.1)', // Couleur de fond du champ de texte
    paddingHorizontal: 20, // Padding horizontal intérieur du champ de texte
    flex: 1 // Faire en sorte que le champ de texte prenne tout l'espace disponible dans la ligne
  },
});
