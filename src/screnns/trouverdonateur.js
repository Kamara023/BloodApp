import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RadioButton, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function Trouverdonateur() {
    const navigation = useNavigation();

    // Tableau de donneurs fictifs
    const donors = [
        { name: 'Jame Peterson', location: "Côte d'Ivoire", bloodType: 'A+', imageSource: require('../../assets/image/portrait.jpg'), onPress: () => navigation.navigate('ProfileDonateur') },
    ];

    return (
        <View style={styles.container}>

            {/* En-tête de la page */}
            <View style={{ marginTop: '20%', paddingHorizontal: 20, gap: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
                    <Ionicons name="arrow-back-outline" size={40} color="#000000" />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Trouver un donneur</Text>
                </View>
            </View>

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

            {/* Liste de donneurs */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {donors.map((donor, index) => (
                    <TouchableOpacity key={index} onPress={donor.onPress}>
                        <View style={{ backgroundColor: 'rgba(169,169,169,0.4)', padding: 10, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                            {/* Image du donneur */}
                            <Image source={donor.imageSource} style={{ height: 70, width: 70, borderRadius: 999 }} />
                            <View style={{ justifyContent: 'center' }}>
                                {/* Nom du donneur */}
                                <Text style={{ fontSize: 18, fontWeight: '700', color: '#000000', marginTop: 10 }}>{donor.name}</Text>
                                {/* Emplacement du donneur */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 }}>
                                    <Ionicons name="location-outline" size={25} color='#E60449' style={{}} />
                                    <Text style={{ fontSize: 20, fontWeight: 'normal', color: 'rgba(169,169,169,0.9)', }}>{donor.location}</Text>
                                </View>
                            </View>
                            {/* Type de sang du donneur */}
                            <View style={{}}>
                                <ImageBackground source={require('../../assets/image/blood.png')} style={{ height: 90, width: 90, alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', top: 10, }}>{donor.bloodType}</Text>
                                </ImageBackground>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

        </View>
    );
}

// Styles de la page
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
});
