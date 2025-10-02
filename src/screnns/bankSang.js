import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Données des emplacements
const locations = [
  {
    id: '1',
    imageSource: require('../../assets/image/BankSang.jpg'),
    name: 'Abidjan',
    location: 'Abidjan, Côte d\'Ivoire',
    rating: '5.0',
    onPress: () => ({
      imageSource1: require('../../assets/image/BankSang.jpg'),
      imageSource2: require('../../assets/image/portrait2.jpg'),
      name: 'Abidjan',
      location: 'Abidjan, Côte d\'Ivoire',
      rating: '5.0',
      description: 'Description spécifique pour Abidjan.',
      avis: 'Avis',
      nonbreAvis: '(262)',
      critique: 'Rédiger une critique',
      nom: 'David Martin',
      tempconnection: 'Il y a 1 heure',
      note: '3.5',
      critiquerediger: 'Lorem ipsum dolor sit amet, consectetur enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
    }),
  },
  {
    id: '2',
    imageSource: require('../../assets/image/portrait2.jpg'),
    name: 'Man',
    location: 'Man, Côte d\'Ivoire',
    rating: '1.0',
    onPress: () => ({
      imageSource1: require('../../assets/image/portrait2.jpg'),
      imageSource2: require('../../assets/image/portrait2.jpg'),
      name: 'Man',
      location: 'Man, Côte d\'Ivoire',
      rating: '1.0',
      description: 'Description spécifique pour Man.',
      avis: 'Avis',
      nonbreAvis: '(222)',
      critique: 'Rédiger une critique',
      nom: 'Toma Ndah',
      tempconnection: 'Il y a 20 heure',
      note: '4.5',
      critiquerediger: 'consectetur enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
    }),
  },
];

// Composant réutilisable représentant un emplacement
const LocationItem = ({ imageSource, name, location, rating, onPress }) => {
    const navigation = useNavigation();
  return (
    <Animated.View entering={FadeInDown.delay(200)} style={styles.locationCard}>
      <TouchableOpacity onPress={() => navigation.navigate('LocalisationBank', onPress())}>
        <View style={styles.locationContent}>
          <Image source={imageSource} style={styles.locationImage} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationName}>{name}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={wp(6)} color="#E60449" />
              <Text style={styles.locationText}>{location}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={wp(5)} color="rgba(255, 215, 0, 0.9)" />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function BankSang() {
  const navigation = useNavigation();

  const renderLocation = ({ item }) => (
    <LocationItem
      imageSource={item.imageSource}
      name={item.name}
      location={item.location}
      rating={item.rating}
      onPress={item.onPress}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <View style={styles.container}>
        {/* En-tête */}
        <Animated.View entering={FadeInDown} style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
            <Ionicons name="arrow-back-outline" size={wp(8)} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Banque de Sang</Text>
        </Animated.View>

        {/* Barre de recherche */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.searchContainer}>
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

        {/* Liste des emplacements */}
        <FlatList
          data={locations}
          renderItem={renderLocation}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8', // Aligné avec Home, Donateur, Trouverdonateur
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3), // Réduit de gap: 50
    marginBottom: hp(0.5), // Compact
  },
  headerTitle: {
    fontSize: wp(6), // Réduit de 30 pour compacité
    fontWeight: '700',
    color: '#000000',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginVertical: hp(0.5), // Compact
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
  listContainer: {
    paddingBottom: hp(2),
  },
  locationCard: {
    backgroundColor: '#FFFFFF', // Changé de rgba(169,169,169,0.1)
    borderRadius: 15,
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
    gap: wp(4), // Réduit de gap: 22
  },
  locationImage: {
    height: wp(18), // Réduit de 90
    width: wp(18),
    borderRadius: wp(9),
  },
  locationInfo: {
    flex: 1,
    gap: hp(1), // Réduit de gap: 8
  },
  locationName: {
    fontSize: wp(5.5), // Réduit de 25
    fontWeight: '700',
    color: '#000000',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  locationText: {
    fontSize: wp(4), // Réduit de 17
    color: 'rgba(169,169,169,0.9)',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: wp(1.5),
    gap: wp(2),
    width: wp(20), // Réduit de 80
  },
  ratingText: {
    fontSize: wp(4.5), // Réduit de 18
    fontWeight: '700',
    color: '#000000',
  },
});