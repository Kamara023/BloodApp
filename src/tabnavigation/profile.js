import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Image, ImageBackground, Switch } from 'react-native';
import { Ionicons, Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


// Tableau de données pour afficher les informations du profil
const data = [
  { label: 'Donné', value: '05' },
  { label: 'demande', value: '03' },
  { label: 'Vie sauvée', value: '06' },
];

const items = [
  {
    icon: <Ionicons name="rocket-sharp" size={25} color="#FFFFFF" />,
    text: 'Je veux donner',
    action: () => console.log('Modifier mon profile'),
    switch: true,
  },
  {
    icon: <Entypo name="edit" size={25} color="#FFFFFF" />,
    text: 'Modifier mon profile',
    action: () => console.log('Modifier mon profile'),
  },
  {
    icon: <Ionicons name="analytics-outline" size={25} color="#FFFFFF" />,
    text: 'Demandes de sang',
    action: () => console.log('Demandes de sang'),
  },
  {
    icon: <Ionicons name="settings-outline" size={25} color="#FFFFFF" />,
    text: 'Paramètre',
    action: () => console.log('Paramètre'),
  },
  {
    icon: <AntDesign name="addusergroup" size={25} color="#FFFFFF" />,
    text: 'Inviter un amie',
    action: () => console.log('Inviter un amie'),
  },
  {
    icon: <MaterialIcons name="privacy-tip" size={25} color="#FFFFFF" />,
    text: 'confidentialité',
    action: () => console.log('politique de confidentialité'),
  },
  {
    icon: <Ionicons name="star-outline" size={25} color="#FFFFFF" />,
    text: 'Nous évaluer',
    action: () => console.log('Nous évaluer'),
  },
  {
    icon: <AntDesign name="exclamationcircleo" size={25} color="#FFFFFF" />,
    text: 'A propos de nous',
    action: () => console.log('A propos de nous'),
  },
];

export default function Profile() {

  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const profiles = [
    { name: "Jame Peterson", lastDonation: "Dernier don décembre 2023", image: require('../../assets/image/portrait.jpg') },
    // Ajoutez d'autres profils ici si nécessaire
  ];


  return (
    <View style={styles.container}>
      {/* En-tête avec le bouton de retour et le titre */}
      <View style={{ marginTop: '20%', paddingHorizontal: 20, gap: 95, flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back-outline" size={40} color="#000000" />
        </TouchableOpacity>
        <View>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Profile</Text>
        </View>
      </View>

      {/* Contenu du profil */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {profiles.map((profile, index) => (
            <View key={index}>
              {/* Photo de profil et informations utilisateur */}
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 5 }}>
                <Image source={profile.image} style={{ height: 130, width: 130, borderRadius: 999 }} />
                <View style={{ marginTop: 10, padding: 10, alignItems: 'center', gap: 5 }}>
                  <Text style={{ color: "#000000", fontSize: 20, fontWeight: 'bold' }}>{profile.name}</Text>
                  <Text style={{ color: 'rgba(169,169,169,0.9)', fontSize: 18, fontWeight: 'bold' }}>{profile.lastDonation}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Informations sur le donateur */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 15, marginBottom: 30 }}>
          {data.map((item, index) => (
            <View key={index}>
              <View style={{ alignItems: 'center', gap: 5, backgroundColor: 'rgba(169,169,169,0.2)', width: 120, height: 85, justifyContent: 'center', padding: 5, borderRadius: 15 }}>
                <Text style={{ color: 'rgba(169,169,169,0.9)', fontSize: 15, fontWeight: '700' }}>{item.label}</Text>
                <Text style={{ color: "#000000", fontSize: 28, fontWeight: 'bold' }}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        <View>
          {items.map((item, index) => (
            <TouchableOpacity key={index} onPress={item.action}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(169,169,169,0.1)', padding: 10, paddingHorizontal: 15, borderRadius: 10, marginBottom: 20 }}>
                <View style={{ backgroundColor: '#E60449', width: 45, height: 45, alignItems: 'center', justifyContent: 'center', borderRadius: 99 }}>
                  {item.icon}
                </View>
                <View>
                  <Text style={{ color: '#000000', fontSize: 22, fontWeight: 'bold' }}>{item.text}</Text>
                </View>
                {item.switch && (
                  <View>
                    <Switch
                      trackColor={{ false: '#767577', true: '#E60449' }}
                      thumbColor={isEnabled ? '#f4f3f4' : 'rgba(169,169,169,0.9)'}
                      ios_backgroundColor="rgba(169,169,169,0.3)"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                )}
                {!item.switch && (
                  <View>
                    <Ionicons name="chevron-forward" size={25} color="#000000" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View>
          <TouchableOpacity>
            <View style={{flexDirection:"row", alignItems:'center',justifyContent:"center", gap:15, marginTop:15, marginBottom:20}} >
              <View style={{ backgroundColor: '#E60449', width: 35, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 99 }} >
                <Ionicons name="arrow-back-outline" size={25} color="#FFFFFF" />
              </View>
              <View>
                <Text style={{ color: '#000000', fontSize: 22, fontWeight: 'bold' }}>Se déconnecter</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor:"#FFFFFF"
  },
});
