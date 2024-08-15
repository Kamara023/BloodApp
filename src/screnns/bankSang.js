import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BankSang() {
    const navigation = useNavigation();

    // Composant réutilisable représentant un emplacement avec ses détails
    const LocationItem = ({ imageSource, name, location, rating, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 22, paddingHorizontal: 15, backgroundColor: 'rgba(169,169,169,0.1)', padding: 15, borderRadius: 8, marginBottom: 18 }}>
                    <Image source={imageSource} style={{ height: 90, width: 90, borderRadius: 999 }} />
                    <View style={{ gap: 8 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: "#000000" }}>{name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Ionicons name="location-outline" size={25} color='#E60449' />
                            <Text style={{ fontSize: 17, fontWeight: 'normal', color: 'rgba(169,169,169,0.9)' }}>{location}</Text>
                        </View>
                        <View style={{ marginTop: 8, backgroundColor: "#FFFFFF", flexDirection: 'row', alignItems: "center", padding: 2, gap: 8, width: 80, justifyContent: 'center', borderRadius: 10 }}>
                            <Ionicons name="star" size={25} color='rgba(255, 215, 0, 0.9)' />
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000000' }}>{rating}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* En-tête avec le bouton de retour et le titre */}
            <View style={{ marginTop: '20%', paddingHorizontal: 20, gap: 50, flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
                    <Ionicons name="arrow-back-outline" size={40} color="#000000" />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Bank de Sang</Text>
                </View>
            </View>

            {/* Barre de recherche */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(169,169,169,0.2)', borderRadius: 10, paddingHorizontal: 10, marginVertical: 10, flex: 1, gap: 10, paddingHorizontal: 15, padding: 4 }}>
                    <Ionicons name="search" size={25} color='rgba(169,169,169,0.5)' />
                    <TextInput
                        style={{ flex: 1, height: 40, fontSize: 16, color: '#000000' }}
                        placeholder="Search..."
                        placeholderTextColor='rgba(169,169,169,0.5)'
                    />
                </View>
                <TouchableOpacity>
                    <View style={{ backgroundColor: '#E60449', alignItems: 'center', justifyContent: 'center', borderRadius: 15, padding: 10 }}>
                        <Ionicons name="options" size={25} color="#FFFF" />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Liste des emplacements */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    {/* Utilisation du composant LocationItem */}
                    <LocationItem
                        imageSource={require('../../assets/image/BankSang.jpg')}
                        name="Abidjan"
                        location="Abidjan, Côte d'Ivoire"
                        rating="5.0"
                        onPress={() => navigation.navigate('LocalisationBank', {
                            imageSource1: require('../../assets/image/BankSang.jpg'),
                            imageSource2: require('../../assets/image/portrait2.jpg'),
                            name: 'Abidjan',
                            location: 'Abidjan, Côte d\'Ivoire',
                            rating: '5.0',
                            description: 'Description spécifique pour Abidjan.',
                            avis:'Avis',
                            nonbreAvis:'(262)',
                            critique:'Rédiger une critique',
                            nom:'David Martin',
                            tempconnection:'Il y a 1 heure',
                            note:'3.5',
                            critiquerediger:'Lorem ipsum dolor sit amet, consectetur  enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
                        })}
                    />

                    <LocationItem
                        imageSource={require('../../assets/image/portrait2.jpg')}
                        name="Man"
                        location="Man, Côte d'Ivoire"
                        rating="1.0"
                        onPress={() => navigation.navigate('LocalisationBank', {
                            imageSource1: require('../../assets/image/portrait2.jpg'),
                            imageSource2: require('../../assets/image/portrait2.jpg'),
                            name: 'Man',
                            location: 'Man, Côte d\'Ivoire',
                            rating: '1.0',
                            description: 'Description spécifique pour Man.',
                            avis:'Avis',
                            nonbreAvis:'(222)',
                            critique:'Rédiger une critique',
                            nom:'Toma Ndah',
                            tempconnection:'Il y a 20 heure',
                            note:'4.5',
                            critiquerediger:'consectetur  enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
                        })}
                    />
                    {/* Ajout d'autres LocationItem ici */}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF'
    },
});
