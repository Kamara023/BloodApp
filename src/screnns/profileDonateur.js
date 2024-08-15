import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RadioButton, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location'; // Import de Location depuis Expo
import MapView, { Marker } from 'react-native-maps';

// Tableau de données pour afficher les informations du profil
const data = [
    { label: 'Donné', value: '05' },
    { label: 'groupe sanguin', value: 'A-' },
    { label: 'Vie sauvée', value: '06' },
];

export default function ProfileDonateur() {
    // Effet pour obtenir la position initiale de l'utilisateur
    useEffect(() => {
        (async () => {
            // Demander la permission d'accéder à la localisation
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            // Obtenir la position actuelle de l'utilisateur
            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            setInitialPosition({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        })();
    }, []);

    const navigation = useNavigation();
    const [initialPosition, setInitialPosition] = useState(null); // État pour stocker la position initiale

    return (
        <View style={styles.container}>

            {/* En-tête avec le bouton de retour et le titre */}
            <View style={{ marginTop: '20%', paddingHorizontal: 20, gap: 95, flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
                    <Ionicons name="arrow-back-outline" size={40} color="#000000" />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Profile</Text>
                </View>
            </View>

            {/* Contenu du profil */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    {/* Photo de profil et informations utilisateur */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 5, }} >
                        <Image source={require('../../assets/image/portrait.jpg')} style={{ height: 130, width: 130, borderRadius: 999 }} />
                        <View style={{ marginTop: 10, padding: 10, alignItems: 'center', gap: 5 }}>
                            <Text style={{ color: "#000000", fontSize: 20, fontWeight: 'bold' }}>Jame Peterson</Text>
                            <Text style={{ color: 'rgba(169,169,169,0.9)', fontSize: 18, fontWeight: 'bold' }}>Dernier don décembre 2023</Text>
                        </View>
                    </View>
                </View>

                {/* Informations sur le donateur */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 15, marginBottom: 10 }}>
                    {data.map((item, index) => (
                        <View key={index}>
                            <View style={{ alignItems: 'center', gap: 5, backgroundColor: 'rgba(169,169,169,0.2)', width: 120, height: 85, justifyContent: 'center', padding: 5, borderRadius: 15 }}>
                                <Text style={{ color: 'rgba(169,169,169,0.9)', fontSize: 15, fontWeight: '700' }}>{item.label}</Text>
                                <Text style={{ color: "#000000", fontSize: 28, fontWeight: 'bold' }}>{item.value}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Carte affichant la position actuelle de l'utilisateur */}
                {initialPosition && (
                    <MapView
                        style={{ flex: 1, height: 300, borderRadius: 30, marginTop: 15, }}
                        initialRegion={initialPosition}
                    >
                        <Marker
                            coordinate={initialPosition}
                            title="Votre position"
                            description="C'est votre position actuelle"
                        />
                    </MapView>
                )}
            </ScrollView>

            {/* Boutons d'action */}
            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', gap: 40, marginBottom: 40, marginTop: 10 }}>
                <View>
                    <TouchableOpacity>
                        <View style={{ backgroundColor: '#E60449', borderRadius: 20, alignItems: 'center', justifyContent: 'center', padding: 15, width: 160 }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', }}> Appeler</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity>
                        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 20, alignItems: 'center', justifyContent: 'center', padding: 15, width: 160, borderWidth: 1, borderColor: '#E60449' }}>
                            <Text style={{ color: '#E60449', fontSize: 20, fontWeight: 'bold', }}> Demander </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
});
