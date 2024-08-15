import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RadioButton, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function MotDePasseOublier() {
  const [text2, onChangeText2] = useState('');
  const [number, onChangeNumber] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const navigation = useNavigation();

  const fields = [
    { label: 'Email', value: text2, onChangeText: onChangeText2 },
    // { label: 'Mot de passe', value: number, onChangeText: onChangeNumber }
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginTop: '20%', paddingHorizontal: 20, gap: 15 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Ionicons name="arrow-back-outline" size={40} color="#000000" />
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Ecran mot de passe oublié</Text>
          </View>

          <View style={{ marginBottom:20}}>
            <Text style={{ fontSize: 20, color: 'rgba(169,169,169,0.9)' }}>Entrez votre adresse amail pour la renitialisation de votre mot de passe</Text>
          </View>
        </View>

        <View>
          {fields.map((field, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', }}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                onChangeText={field.onChangeText}
                placeholder={field.label}
                value={field.value}
              />

            </View>
          ))}
        </View>

        <View>

          <View>
            <TouchableOpacity onPress={() => navigation.navigate('MotDePasseVerification')}>
              <View style={{ backgroundColor: '#E60449', padding: 18, marginVertical: 10, marginHorizontal: 10, borderRadius: 10, justifyContent: 'flex-end', alignItems: 'center' }}>
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Envoyer le code</Text>
              </View>
            </TouchableOpacity>
          </View>


          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3, marginTop: '100%' }}>
            <Text style={{ textAlign: 'center', marginVertical: 10, color: '#000000', fontSize: 15, fontWeight: '500' }}>Retourner à ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
              <Text style={{ textAlign: 'center', color: '#E60449', fontSize: 15, fontWeight: '500' }}> la page d'Inscription l'inscrire</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
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
