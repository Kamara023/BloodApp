import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Image, Text, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import CustomButton from './CustomButton'; // Import du composant CustomButton
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location'; // Import de Location depuis Expo

const Home = () => {
    const navigation = useNavigation();
    const [initialPosition, setInitialPosition] = useState(null); // État pour stocker la position initiale

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

    return (
        <View style={styles.container}>
            {/* Bouton de menu */}
            <TouchableOpacity>
                <Ionicons name="menu" size={45} color="#000000" />
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Barre de recherche */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(169,169,169,0.2)', borderRadius: 10, paddingHorizontal: 10, marginVertical: 10, flex: 1, gap: 10, paddingHorizontal: 15, padding: 4 }}>
                        <Ionicons name="search" size={25} color='rgba(169,169,169,0.5)' style={{}} />
                        <TextInput
                            style={{ flex: 1, height: 40, fontSize: 16, color: '#000000', }}
                            placeholder="Search..."
                            placeholderTextColor='rgba(169,169,169,0.5)'
                        />
                    </View>
                    <TouchableOpacity>
                        <View style={{ backgroundColor: '#E60449', alignItems: 'center', justifyContent: 'center', borderRadius: 15, padding: 10 }}>
                            <Ionicons name="options" size={25} color="#FFFF" style={{}} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Carte */}
                {initialPosition && (
                    <MapView
                        style={{ flex: 1, height: 210, borderRadius: 30, marginTop: 15 }}
                        initialRegion={initialPosition}
                    >
                        <Marker
                            coordinate={initialPosition}
                            title="Votre position"
                            description="C'est votre position actuelle"
                        />
                    </MapView>
                )}

                {/* Contenu restant */}
                {/* Boutons */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Utilisation du composant CustomButton pour chaque bouton */}
                    <CustomButton imageSource={require('../../assets/image/searchblood.png')} text="Trouver un donneur" onPress={() => navigation.navigate('Trouverdonateur')} />
                    <CustomButton imageSource={require('../../assets/image/blood-donations.png')} text="Donateur" onPress={() => navigation.navigate('Donateur')} />
                    <CustomButton imageSource={require('../../assets/image/blood-bag.png')} text="Banque de Sang" onPress={() => navigation.navigate('BankSang')} />
                </View>

                {/* Autres boutons */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Modifier onPress pour chaque bouton selon la page de destination */}
                    <CustomButton imageSource={require('../../assets/image/blood-donation1.png')} text="Soutenir" onPress={() => navigation.navigate('PageSearchBlood')} />
                    <CustomButton imageSource={require('../../assets/image/sugar.png')} text="Demandes de sang" onPress={() => navigation.navigate('PageDonat')} />
                    <CustomButton imageSource={require('../../assets/image/more.png')} text="En savoir Plus" onPress={() => navigation.navigate('PageDonat')} />
                </View>

                {/* Section des chercheurs de sang */}
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, paddingHorizontal: 15 }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: '#000000', }}> chercheur de sang</Text>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 18, fontWeight: '700', color: '#E60449', }}>Voir tous</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Liste des chercheurs de sang */}
                <View style={{ height: 'auto', marginTop: 20, backgroundColor: 'rgba(169,169,169,0.3)', borderRadius: 10, marginBottom: 50, paddingHorizontal: 10 }}>
                    <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Image source={require('../../assets/image/portrait.jpg')} style={{ height: 80, width: 80, borderRadius: 999 }} />
                        <View style={{ alignItems: 'center' }}>
                            <ImageBackground source={require('../../assets/image/blood.png')} style={{ height: 90, width: 90, alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', top: 10, }}>A+</Text>
                            </ImageBackground>
                        </View>
                    </View>
                    {/* Détails du chercheur de sang */}
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: '#000000', marginTop: 10 }}>Jame Peterson</Text>
                        <Text style={{ fontSize: 17, fontWeight: 'normal', color: 'rgba(169,169,169,0.9)', marginTop: 8 }}>Lorem input dolor Lorem input doloLorem input doloLorem input dolo</Text>
                    </View>
                    {/* Statut de la dernière connexion */}
                    <View style={{ backgroundColor: 'rgba(169,169,169,0.2)', width: '32%', padding: 5, alignItems: 'center', borderRadius: 10, justifyContent: 'center', marginTop: 10 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'normal', color: '#E60449', textAlign: 'center' }}>Il y a 5 minutes</Text>
                    </View>
                    {/* Emplacement et bouton Donateur */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                        {/* Emplacement */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 }}>
                            <Ionicons name="location-outline" size={25} color='#E60449' style={{}} />
                            <Text style={{ fontSize: 20, fontWeight: 'normal', color: 'rgba(169,169,169,0.9)', }}>Côte d'Ivoire</Text>
                        </View>
                        {/* Bouton Donateur */}
                        <View>
                            <TouchableOpacity>
                                <View style={{ backgroundColor: '#E60449', width: '100%', padding: 13, borderRadius: 15, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#FFFFFF", }}>Donateur</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '18%',
        paddingHorizontal: 15,
    },
});

