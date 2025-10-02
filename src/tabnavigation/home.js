import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from './CustomButton'; // Assure-toi que ce composant est bien défini
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'; // Pour animations

const Home = () => {
  const navigation = useNavigation();
  const [initialPosition, setInitialPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Données fictives pour la liste des chercheurs (à remplacer par ton backend plus tard)
  const bloodSeekers = [
    {
      id: '1',
      name: 'Jame Peterson',
      bloodType: 'A+',
      description: 'Lorem ipsum dolor sit amet',
      location: 'Côte d\'Ivoire',
      lastSeen: 'Il y a 5 minutes',
      image: require('../../assets/image/portrait.jpg'),
    },
    // Ajoute d'autres données si nécessaire
  ];

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission de localisation refusée');
          setLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setInitialPosition({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération de la position');
        setLoading(false);
      }
    })();
  }, []);

  const renderBloodSeeker = ({ item }) => (
    <Animated.View entering={FadeInDown.delay(200)} style={styles.seekerCard}>
      <View style={styles.seekerHeader}>
        <Image source={item.image} style={styles.seekerImage} />
        <ImageBackground source={require('../../assets/image/blood.png')} style={styles.bloodTypeBg}>
          <Text style={styles.bloodTypeText}>{item.bloodType}</Text>
        </ImageBackground>
      </View>
      <Text style={styles.seekerName}>{item.name}</Text>
      <Text style={styles.seekerDescription}>{item.description}</Text>
      <View style={styles.seekerFooter}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={wp(6)} color="#E60449" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <TouchableOpacity style={styles.donateButton}>
          <Text style={styles.donateButtonText}>Donateur</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lastSeenContainer}>
        <Text style={styles.lastSeenText}>{item.lastSeen}</Text>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Bouton de menu */}
      {/* <Animated.View entering={FadeIn} style={styles.menuButton}>
        <TouchableOpacity>
          <Ionicons name="menu" size={wp(10)} color="#000000" />
        </TouchableOpacity>
      </Animated.View> */}

      {/* Barre de recherche */}
            <Animated.View entering={FadeInDown} style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Ionicons name="search" size={wp(6)} color="rgba(169,169,169,0.5)" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Rechercher..."
                  placeholderTextColor="rgba(169,169,169,0.5)"
                />
              </View>
              <TouchableOpacity style={styles.optionsButton}>
                <Ionicons name="options" size={wp(6)} color="#FFFFFF" />
              </TouchableOpacity>
            </Animated.View>

      <FlatList
        data={[{ key: 'header' }]} // Données fictives pour le rendu unique du contenu
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <>
            

            {/* Carte */}
            <Animated.View entering={FadeInDown.delay(100)} style={styles.mapContainer}>
              {loading ? (
                <ActivityIndicator size="large" color="#E60449" />
              ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : initialPosition ? (
                <MapView
                  style={styles.map}
                  initialRegion={initialPosition}
                  showsUserLocation={true} // Affiche la position de l'utilisateur
                  followsUserLocation={true} // Suit la position en temps réel
                >
                  <Marker
                    coordinate={initialPosition}
                    title="Votre position"
                    description="C'est votre position actuelle"
                    pinColor="#E60449"
                  />
                </MapView>
              ) : null}
            </Animated.View>

            {/* Boutons */}
            <Animated.View entering={FadeInDown.delay(200)} style={styles.buttonContainer}>
              <CustomButton
                imageSource={require('../../assets/image/searchblood.png')}
                text="Trouver un donneur"
                onPress={() => navigation.navigate('Trouverdonateur')}
              />
              <CustomButton
                imageSource={require('../../assets/image/blood-donations.png')}
                text="Donateur"
                onPress={() => navigation.navigate('Donateur')}
              />
              <CustomButton
                imageSource={require('../../assets/image/blood-bag.png')}
                text="Banque de Sang"
                onPress={() => navigation.navigate('BankSang')}
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(300)} style={styles.buttonContainer}>
              <CustomButton
                imageSource={require('../../assets/image/blood-donation1.png')}
                text="Soutenir"
                onPress={() => navigation.navigate('Soutenir')}
              />
              <CustomButton
                imageSource={require('../../assets/image/sugar.png')}
                text="Demandes de sang"
                onPress={() => navigation.navigate('demandesSang')}
              />
              <CustomButton
                imageSource={require('../../assets/image/more.png')}
                text="En savoir Plus"
                onPress={() => navigation.navigate('PageDonat')}
              />
            </Animated.View>

            {/* Section chercheurs de sang */}
            <Animated.View entering={FadeInDown.delay(400)} style={styles.seekerSection}>
              <View style={styles.seekerHeaderContainer}>
                <Text style={styles.seekerTitle}>Chercheurs de sang</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>Voir tous</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={bloodSeekers}
                renderItem={renderBloodSeeker}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </Animated.View>
          </>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: wp(4),
    // paddingTop: hp(2),
  },
  menuButton: {
    position: 'absolute',
    top: hp(2),
    left: wp(4),
    zIndex: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginVertical: hp(2),
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(169,169,169,0.2)',
    borderRadius: 15,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: hp(5),
    fontSize: wp(4),
    color: '#000000',
  },
  optionsButton: {
    backgroundColor: '#E60449',
    borderRadius: 15,
    padding: wp(3),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  mapContainer: {
    height: hp(30),
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  errorText: {
    color: '#E60449',
    fontSize: wp(4),
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2),
  },
  seekerSection: {
    marginTop: hp(2),
  },
  seekerHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
  },
  seekerTitle: {
    fontSize: wp(5),
    fontWeight: '700',
    color: '#000000',
  },
  seeAllText: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#E60449',
  },
  seekerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: wp(4),
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  seekerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seekerImage: {
    height: wp(20),
    width: wp(20),
    borderRadius: wp(10),
  },
  bloodTypeBg: {
    height: wp(20),
    width: wp(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bloodTypeText: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: '#FFFFFF',
    top: hp(1),
  },
  seekerName: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#000000',
    marginTop: hp(1),
  },
  seekerDescription: {
    fontSize: wp(4),
    color: 'rgba(169,169,169,0.9)',
    marginTop: hp(0.5),
  },
  seekerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(1),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  locationText: {
    fontSize: wp(4.5),
    color: 'rgba(169,169,169,0.9)',
  },
  donateButton: {
    backgroundColor: '#E60449',
    borderRadius: 15,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
  },
  donateButtonText: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  lastSeenContainer: {
    backgroundColor: 'rgba(169,169,169,0.2)',
    borderRadius: 10,
    padding: wp(2),
    marginTop: hp(1),
    alignItems: 'center',
  },
  lastSeenText: {
    fontSize: wp(4),
    color: '#E60449',
  },
});