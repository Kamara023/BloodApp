import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function LocalisationBank() {
    const navigation = useNavigation();
    const route = useRoute();

    const { imageSource1, imageSource2, name, location, rating, description, avis, nonbreAvis, critique, tempconnection, nom, critiquerediger, note, } = route.params;
    const [selectedButton, setSelectedButton] = useState(null); // State pour suivre le bouton sélectionné

    // Fonction pour gérer le clic sur les boutons "like" et "dislike"
    const handleButtonPress = (buttonName) => {
        setSelectedButton(buttonName === selectedButton ? null : buttonName);
    };

    return (
        <View style={styles.container}>
            {/* Image de fond */}
            <View>
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <Image source={imageSource1} style={{ height: 420, width: 420, borderRadius: 25 }} />
                </View>
            </View>

            {/* Bouton de retour */}
            <View style={{ paddingHorizontal: 20, bottom: '42%' }}>
                <TouchableOpacity onPress={() => navigation.navigate('BankSang')}>
                    <Ionicons name="arrow-back-outline" size={40} color="#000000" />
                </TouchableOpacity>
            </View>

            {/* Contenu principal dans un ScrollView */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 10 }}>
                    {/* Titre et emplacement */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000' }}>{name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 5 }}>
                                <Ionicons name="location-outline" size={25} color='#E60449' />
                                <Text style={{ fontSize: 20, fontWeight: 'normal', color: 'rgba(169,169,169,0.9)' }}>{location}</Text>
                            </View>
                        </View>
                        {/* Évaluation */}
                        <View style={{ marginTop: 8, backgroundColor: 'rgba(169,169,169,0.2)', flexDirection: 'row', alignItems: "center", padding: 2, gap: 8, width: 80, justifyContent: 'center', borderRadius: 10 }}>
                            <Ionicons name="star" size={25} color='rgba(255, 215, 0, 0.9)' />
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000000' }}>{rating}</Text>
                        </View>
                    </View>

                    {/* Description */}
                    <View>
                        <Text style={{ fontSize: 16, color: 'rgba(169,169,169,0.9)', fontWeight: '700' }}>
                            {description}
                        </Text>
                    </View>

                    {/* Avis */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginTop: 13, marginBottom: 10 }}>
                        <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#000000' }}>{avis}</Text>
                        <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#000000' }}>{nonbreAvis}</Text>
                    </View>

                    {/* Bouton pour rédiger une critique */}
                    <TouchableOpacity>
                        <View style={{ backgroundColor: 'rgba(169,169,169,0.2)', padding: 11, borderRadius: 15 }}>
                            <Text style={{ color: "#000000", fontSize: 20, paddingLeft: 15 }}>{critique} </Text>
                        </View>
                    </TouchableOpacity>

                    {/* Avis utilisateur */}
                    <View style={{ marginTop: 15, backgroundColor: 'rgba(169,169,169,0.2)', padding: 11, borderRadius: 15, paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', marginBottom: 12 }}>
                            <View>
                                <Image source={imageSource2} style={{ height: 90, width: 90, borderRadius: 999 }} />
                            </View>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000000' }}>{nom}</Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'rgba(169,169,169,0.9)' }}>{tempconnection} </Text>
                            </View>
                            <View style={{ marginTop: 8, backgroundColor: 'rgba(169,169,169,0.2)', flexDirection: 'row', alignItems: "center", padding: 2, gap: 8, width: 80, justifyContent: 'center', borderRadius: 10, marginLeft: 15 }}>
                                <Ionicons name="star" size={25} color='rgba(255, 215, 0, 0.9)' />
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000000' }}>{note}</Text>
                            </View>
                        </View>
                        <View style={{ marginBottom: 4, padding: 10 }}>
                            <Text style={{ fontSize: 15, color: "#000000", fontWeight: 'normal' }}>{critiquerediger}</Text>
                        </View>
                        {/* Boutons "like" et "dislike" */}
                        <View style={{ marginBottom: 5, flexDirection: 'row', gap: 30, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => handleButtonPress('like')}>
                                <AntDesign
                                    name="like1"
                                    size={30}
                                    color={selectedButton === 'like' ? 'red' : 'rgba(169,169,169,0.9)'}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleButtonPress('dislike')}>
                                <AntDesign
                                    name="dislike1"
                                    size={30}
                                    color={selectedButton === 'dislike' ? 'blue' : 'rgba(169,169,169,0.9)'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Boutons d'action */}
            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', gap: 40, marginBottom: 40, marginTop: 10 }}>
                <View>
                    <TouchableOpacity>
                        <View style={{ backgroundColor: '#E60449', borderRadius: 20, alignItems: 'center', justifyContent: 'center', padding: 15, width: 160 }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}>Appeler</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity>
                        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 20, alignItems: 'center', justifyContent: 'center', padding: 15, width: 160, borderWidth: 1, borderColor: '#E60449' }}>
                            <Text style={{ color: '#E60449', fontSize: 20, fontWeight: 'bold' }}>Demander</Text>
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
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF'
    },
});
