import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Définir les données des donneurs ici
const donors = [
    {
        id: '1',
        name: 'Jame Peterson',
        bloodType: 'A+',
        time: 'Il y a 5 minutes',
        location: "Côte d'Ivoire",
        image: require('../../assets/image/portrait.jpg'),
        donorDescription:'Lorem input dolor Lorem input doloLorem input doloLorem input dolo',
        
    },
    {
        id: '2',
        name: 'Aristide la pioche',
        bloodType: 'B+',
        time: 'Il y a 20 minutes',
        location: 'Benin',
        image: require('../../assets/image/portrait3.jpg'),
        donorDescription:'dolor Lorem input doloLorem input doloLorem input dolo Lorem input '
    },
    // Ajoutez d'autres donneurs ici si nécessaire
];

// Composant pour afficher un donneur individuel
const DonorItem = ({ donor }) => {
    return (
        <View style={{ height: 'auto',marginTop: 20,backgroundColor: 'rgba(169,169,169,0.3)',borderRadius: 10, marginBottom: 5,paddingHorizontal: 10}}>
            <View style={{marginTop: 20,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
                <Image source={donor.image} style={styles.donorImage} />
                <View style={{alignItems: 'center'}}>
                    <ImageBackground source={require('../../assets/image/blood.png')} style={{ height: 90, width: 90,alignItems: 'center',justifyContent: 'center'}}>
                        <Text style={{ fontSize: 18,fontWeight: 'bold', color: '#FFFFFF',top: 10}}>{donor.bloodType}</Text>
                    </ImageBackground>
                </View>
            </View>
            <View>
                <Text style={{  fontSize: 18,fontWeight: '700',color: '#000000', marginTop: 10}}>{donor.name}</Text>
                <Text style={{  fontSize: 17,fontWeight: 'normal',color: 'rgba(169,169,169,0.9)', marginTop: 8}}>{donor.donorDescription}</Text>
            </View>
            <View style={{ backgroundColor: 'rgba(169,169,169,0.2)', width: '32%', padding: 5,alignItems: 'center', borderRadius: 10,justifyContent: 'center', marginTop: 10}}>
                <Text style={{fontSize: 15,fontWeight: 'normal',color: '#E60449',textAlign: 'center'}}>{donor.time}</Text>
            </View>
            <View style={{  flexDirection: 'row', justifyContent: 'space-between',marginBottom: 20}}>
                <View style={{     flexDirection: 'row',alignItems: 'center', gap: 8, marginTop: 10}}>
                    <Ionicons name="location-outline" size={25} color='#E60449' />
                    <Text style={{ fontSize: 20,fontWeight: 'normal',color: 'rgba(169,169,169,0.9)'}}>{donor.location}</Text>
                </View>
                <TouchableOpacity>
                    <View style={{backgroundColor: '#E60449', width: '100%',padding: 13,borderRadius: 15,alignItems: 'center'}}>
                        <Text style={{fontSize: 20,fontWeight: 'bold',color: '#FFFFFF'}}>Donateur</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function Donateur() {
    const [selectedView, setSelectedView] = useState('Tous'); // État pour suivre la vue sélectionnée
    const navigation = useNavigation(); // Navigation pour revenir à la page précédente

    const renderContent = () => {
        if (selectedView === 'Tous') {
            return (
                <FlatList
                    data={donors}
                    renderItem={({ item }) => <DonorItem donor={item} />}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            );
        }
        if (selectedView === 'Récent') {
            return (
                <View>
                    {/* Contenu pour "Récent" */}
                    <Text>Contenu Récent</Text>
                </View>
            );
        }
        if (selectedView === 'Urgent') {
            return (
                <View>
                    {/* Contenu pour "Urgent" */}
                    <Text>Contenu Urgent</Text>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            {/* En-tête avec le bouton de retour et le titre */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
                    <Ionicons name="arrow-back-outline" size={40} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Donateur</Text>
            </View>

            {/* Menu pour sélectionner les vues */}
            <View style={styles.menuContainer}>
                <TouchableOpacity onPress={() => setSelectedView('Tous')}>
                    <View style={[styles.menuItem, selectedView === 'Tous' && styles.selectedItem]}>
                        <Text style={[styles.menuText, selectedView === 'Tous' && styles.selectedText]}>Tous</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedView('Récent')}>
                    <View style={[styles.menuItem, selectedView === 'Récent' && styles.selectedItem]}>
                        <Text style={[styles.menuText, selectedView === 'Récent' && styles.selectedText]}>Récent</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedView('Urgent')}>
                    <View style={[styles.menuItem, selectedView === 'Urgent' && styles.selectedItem]}>
                        <Text style={[styles.menuText, selectedView === 'Urgent' && styles.selectedText]}>Urgent</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Contenu principal basé sur la vue sélectionnée */}
            <View style={styles.contentContainer}>
                {renderContent()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    header: {
        marginTop: '20%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 20
    },
    menuItem: {
        alignItems: 'center',
    },
    menuText: {
        color: 'rgba(169,169,169,0.9)',
        fontSize: 30,
        fontWeight: 'bold',
    },
    selectedItem: {
        borderBottomWidth: 3,
        borderBottomColor: '#E60449',
        width: 110
    },
    selectedText: {
        color: '#E60449',
    },
    contentContainer: {
        flex: 1,
    },
    donorHeader: {
        
    },
    donorImage: {
        height: 80,
        width: 80,
        borderRadius: 999
    },
    
});
