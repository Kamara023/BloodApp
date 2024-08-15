import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MotDePasseVerification() {
  const [otp, setOtp] = useState(['', '', '', '']); // État pour stocker les valeurs de chaque chiffre OTP
  const [countdown, setCountdown] = useState(20); // État pour le compteur de renvoi du code
  const inputs = useRef([]); // Référence pour les inputs OTP
  const navigation = useNavigation(); // Hook de navigation

  // Gestion du changement de texte pour les champs OTP
  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Passer à l'entrée suivante si le champ actuel est rempli
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  // Gestion de la suppression pour déplacer le focus vers le champ précédent
  const handleBackspace = (text, index) => {
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  // Effet pour gérer le compteur de renvoi du code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer); // Nettoyage du timer
    }
  }, [countdown]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: '20%', paddingHorizontal: 20, gap: 15 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Ionicons name="arrow-back-outline" size={40} color="#000000" />
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Entrez votre code de vérification</Text>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 20, color: 'rgba(169,169,169,0.9)' }}>
              Entrez votre adresse e-mail pour la réinitialisation de votre mot de passe
            </Text>
          </View>
        </View>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspace(digit, index);
                }
              }}
              keyboardType="numeric"
              maxLength={1}
              ref={(ref) => (inputs.current[index] = ref)}
            />
          ))}
        </View>

        {/* Affichage du compteur pour renvoyer le code */}
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>
            Renvoyer le code dans <Text style={styles.countdownNumber}>{countdown}</Text> secondes.
          </Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate('MotDePasseRenitialiser')}>
            <View
              style={{
                backgroundColor: '#E60449',
                padding: 18,
                marginVertical: 10,
                marginHorizontal: 10,
                borderRadius: 10,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Vérifier</Text>
            </View>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3, marginTop: '70%' }}>
            <Text style={{ textAlign: 'center', marginVertical: 10, color: '#000000', fontSize: 15, fontWeight: '500' }}>
              Retourner à ?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Inscription')}>
              <Text style={{ textAlign: 'center', color: '#E60449', fontSize: 15, fontWeight: '500' }}>
                la page d'Inscription l'inscrire
              </Text>
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
    paddingHorizontal: 15,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  otpInput: {
    height: 50,
    width: 50,
    margin: 8,
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'rgba(169,169,169,0.1)',
    textAlign: 'center',
    fontSize: 18,
  },
  countdownContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  countdownText: {
    fontSize: 16,
    color: '#000000',
  },
  countdownNumber: {
    color: '#E60449',
    fontWeight: 'bold',
  },
});
