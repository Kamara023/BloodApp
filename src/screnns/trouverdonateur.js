import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Trouverdonateur() {
  const navigation = useNavigation();

  // Tableau de donneurs fictifs
  const donors = [
    {
      id: '1',
      name: 'Jame Peterson',
      location: "Côte d'Ivoire",
      bloodType: 'A+',
      imageSource: require('../../assets/image/portrait.jpg'),
      onPress: () => navigation.navigate('ProfileDonateur'),
    },
    // Ajoute d'autres donneurs si nécessaire
  ];

  const renderDonor = ({ item }) => (
    <Animated.View entering={FadeInDown.delay(200)} style={styles.donorCard}>
      <TouchableOpacity onPress={item.onPress}>
        <View style={styles.donorContent}>
          <Image source={item.imageSource} style={styles.donorImage} />
          <View style={styles.donorInfo}>
            <Text style={styles.donorName}>{item.name}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={wp(6)} color="#E60449" />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          </View>
          <ImageBackground source={require('../../assets/image/blood.png')} style={styles.bloodTypeBg}>
            <Text style={styles.bloodTypeText}>{item.bloodType}</Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}> 
      <View style={styles.container}>
        {/* En-tête */}
        <Animated.View entering={FadeInDown} style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
            <Ionicons name="arrow-back-outline" size={wp(8)} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Trouver un donneur</Text>
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

        {/* Liste de donneurs */}
        <FlatList
          data={donors}
          renderItem={renderDonor}
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
    backgroundColor: '#F8F8F8', // Aligné avec Home et Tabs
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
    // paddingTop supprimé pour réduire l'espace en haut
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginBottom: hp(1), // Réduit pour compacter
  },
  headerTitle: {
    fontSize: wp(7),
    fontWeight: '700',
    color: '#000000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginVertical: hp(1), // Réduit pour compacter
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
  donorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  donorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(4),
    justifyContent: 'space-between',
  },
  donorImage: {
    height: wp(16),
    width: wp(16),
    borderRadius: wp(8),
  },
  donorInfo: {
    flex: 1,
    marginLeft: wp(4),
  },
  donorName: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#000000',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    marginTop: hp(1),
  },
  locationText: {
    fontSize: wp(4),
    color: 'rgba(169,169,169,0.9)',
  },
  bloodTypeBg: {
    height: wp(20),
    width: wp(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  bloodTypeText: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    color: '#FFFFFF',
    top: hp(1),
  },
});