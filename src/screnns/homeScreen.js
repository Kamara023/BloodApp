import React, { useState } from "react";
import { View, Text, Image, StatusBar, Platform, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AppIntroSlider from "react-native-app-intro-slider";
import { SIZES, COLORS } from "../constants/theme";

const slides = [
    {
        id: 1,
        title: 'Découvrez les meilleurs endroits',
        description: '“Lorem ipsum dolor sit amet, consectetur ullamco laboris nisi ut aliquip ex ea commodo consequat"',
        image: require('../../assets/image/blood2.jpg')
    },
    {
        id: 2,
        title: 'Découvrez les meilleurs endroits',
        description: '“Lorem ipsum dolor sit amet, consectetur ullamco laboris nisi ut aliquip ex ea commodo consequat"',
        image: require('../../assets/image/blood3.png')
    },
    {
        id: 3,
        title: 'Découvrez les meilleurs endroits',
        description: '“Lorem ipsum dolor sit amet, consectetur ullamco laboris nisi ut aliquip ex ea commodo consequat"',
        image: require('../../assets/image/blood4.jpg')
    },
];

export default function HomeScreen() {
    const [showHomePage, setShowHomePage] = useState(false);
    const navigation = useNavigation();

    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(COLORS.primary);
    }

    const renderDoneButton = () => {
        const handleDone = () => {
            navigation.navigate('Login');
        };

        return (
            <TouchableOpacity
                style={{
                    backgroundColor: COLORS.primary,
                    borderRadius: 25,
                    padding: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={handleDone}
            >
                <Ionicons name="chevron-forward" size={22} color="white" />
            </TouchableOpacity>
        );
    };

    if (!showHomePage) {
        const buttonLabel = (label) => {
            return (
                <View style={{ padding: 12 }}>
                    <Text style={{ color: COLORS.title, fontWeight: '600', fontSize: SIZES.h4 }}>
                        {label}
                    </Text>
                </View>
            );
        };

        return (
            <View style={styles.container}>
                <View style={styles.degrader}></View>

                <AppIntroSlider
                    data={slides}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flex: 1, alignItems: 'center', padding: 15, paddingTop: 1, gap: 20, justifyContent: 'center' }}>
                                <Image
                                    source={item.image}
                                    style={{ width: SIZES.width - 50, height: 400, bottom:'12%', borderRadius:20 }}
                                    resizeMode="contain"
                                />
                                <Text style={{ fontWeight: 'bold', color: COLORS.title, fontSize: SIZES.h1 }}>
                                    {item.title}
                                </Text>
                                <Text style={{ textAlign: 'center', paddingTop: 5, color: COLORS.title }}>
                                    {item.description}
                                </Text>
                            </View>
                        );
                    }}
                    activeDotStyle={{ backgroundColor: COLORS.primary, width: 30 }}
                    showSkipButton
                    renderNextButton={() => buttonLabel("Suivant")}
                    renderSkipButton={() => buttonLabel("Passer")}
                    renderDoneButton={renderDoneButton}
                    onDone={() => {
                        setShowHomePage(true);
                    }}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // Fond blanc
    },
    degrader: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '52%', // Commence du milieu de l'écran
        bottom: 0,
        backgroundColor: 'rgba(169,169,169,0.1)', // Gris avec opacité réduite
        borderTopLeftRadius: 100, // Réduit la bordure en haut à gauche
        borderTopRightRadius: 100, // Réduit la bordure en haut à droite

    },
});
