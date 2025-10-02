import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Données des donneurs
const donors = [
  {
    id: '1',
    name: 'Jame Peterson',
    bloodType: 'A+',
    time: 'Il y a 5 minutes',
    location: "Côte d'Ivoire",
    image: require('../../assets/image/portrait.jpg'),
    donorDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    urgent: false,
    timestamp: Date.now() - 5 * 60 * 1000, // 5 minutes ago
  },
  {
    id: '2',
    name: 'Aristide la pioche',
    bloodType: 'B+',
    time: 'Il y a 20 minutes',
    location: 'Benin',
    image: require('../../assets/image/portrait3.jpg'),
    donorDescription: 'Dolor sit amet, consectetur adipiscing elit.',
    urgent: true,
    timestamp: Date.now() - 20 * 60 * 1000, // 20 minutes ago
  },
];

// Composant pour afficher un donneur individuel
const DonorItem = ({ donor }) => {
  return (
    <Animated.View entering={FadeInDown.delay(200)} style={styles.donorCard}>
      <View style={styles.donorContent}>
        <Image source={donor.image} style={styles.donorImage} />
        <View style={styles.donorInfo}>
          <Text style={styles.donorName}>{donor.name}</Text>
          <Text style={styles.donorDescription}>{donor.donorDescription}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={wp(6)} color="#E60449" />
            <Text style={styles.locationText}>{donor.location}</Text>
          </View>
        </View>
        <ImageBackground source={require('../../assets/image/blood.png')} style={styles.bloodTypeBg}>
          <Text style={styles.bloodTypeText}>{donor.bloodType}</Text>
        </ImageBackground>
      </View>
      <View style={styles.donorFooter}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{donor.time}</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.donateButton}>
            <Text style={styles.donateButtonText}>Donateur</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default function Donateur() {
  const [selectedView, setSelectedView] = useState('Tous');
  const navigation = useNavigation();

  const renderContent = () => {
    let filteredDonors = donors;

    if (selectedView === 'Récent') {
      filteredDonors = donors
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 1); // Affiche le donneur le plus récent
    } else if (selectedView === 'Urgent') {
      filteredDonors = donors.filter((donor) => donor.urgent);
    }

    return (
      <FlatList
        data={filteredDonors}
        renderItem={({ item }) => <DonorItem donor={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <View style={styles.container}>
        {/* En-tête */}
        <Animated.View entering={FadeInDown} style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
            <Ionicons name="arrow-back-outline" size={wp(8)} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Donateur</Text>
        </Animated.View>

        {/* Menu pour sélectionner les vues */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.menuContainer}>
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
        </Animated.View>

        {/* Contenu principal */}
        <View style={styles.contentContainer}>{renderContent()}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8', // Aligné avec Home, Tabs, Trouverdonateur
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginBottom: hp(1),
  },
  headerTitle: {
    fontSize: wp(7),
    fontWeight: '700',
    color: '#000000',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    marginBottom: hp(2),
  },
  menuItem: {
    alignItems: 'center',
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
  },
  menuText: {
    color: 'rgba(169,169,169,0.9)',
    fontSize: wp(5),
    fontWeight: '600',
  },
  selectedItem: {
    borderBottomWidth: 3,
    borderBottomColor: '#E60449',
  },
  selectedText: {
    color: '#E60449',
  },
  contentContainer: {
    flex: 1,
  },
  donorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: hp(2),
    padding: wp(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  donorContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
  donorDescription: {
    fontSize: wp(4),
    color: 'rgba(169,169,169,0.9)',
    marginTop: hp(0.5),
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
  donorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(1),
  },
  timeContainer: {
    backgroundColor: 'rgba(169,169,169,0.2)',
    borderRadius: 10,
    padding: wp(2),
  },
  timeText: {
    fontSize: wp(3.5),
    color: '#E60449',
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
});