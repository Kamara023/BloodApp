import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const data = [
  { id: '1', label: 'Donné', value: '05' },
  { id: '2', label: 'Groupe sanguin', value: 'A-' },
  { id: '3', label: 'Vie sauvée', value: '06' },
];

const profileData = [
  {
    id: '1',
    name: 'Jame Peterson',
    lastDonation: 'Dernier don décembre 2023',
    image: require('../../assets/image/portrait.jpg'),
  },
];

export default function ProfileDonateur() {
  const navigation = useNavigation();
  const [initialPosition, setInitialPosition] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
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
    })();
  }, []);

  const renderProfile = ({ item }) => (
    <Animated.View entering={FadeInDown.delay(100)} style={styles.profileContainer}>
      <Image source={item.image} style={styles.profileImage} />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{item.name}</Text>
        <Text style={styles.profileDonation}>{item.lastDonation}</Text>
      </View>
    </Animated.View>
  );

  const renderStat = ({ item }) => (
    <Animated.View entering={FadeInDown.delay(200)} style={styles.statCard}>
      <Text style={styles.statLabel}>{item.label}</Text>
      <Text style={styles.statValue}>{item.value}</Text>
    </Animated.View>
  );

  const renderMap = () =>
    initialPosition && (
      <Animated.View entering={FadeInDown.delay(300)} style={styles.mapContainer}>
        <MapView style={styles.map} initialRegion={initialPosition}>
          <Marker
            coordinate={initialPosition}
            title="Votre position"
            description="C'est votre position actuelle"
          />
        </MapView>
      </Animated.View>
    );

  const renderActions = () => (
    <Animated.View entering={FadeInDown.delay(400)} style={styles.actionButtons}>
      <TouchableOpacity>
        <View style={styles.callButton}>
          <Text style={styles.callButtonText}>Appeler</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.requestButton}>
          <Text style={styles.requestButtonText}>Demander</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const flatListData = [
    { type: 'profile', data: profileData },
    { type: 'stats', data: data },
    { type: 'map', data: null },
    { type: 'actions', data: null },
  ];

  const renderSection = ({ item }) => {
    if (item.type === 'profile') {
      return (
        <FlatList
          data={item.data}
          renderItem={renderProfile}
          keyExtractor={(profile) => profile.id}
          scrollEnabled={false}
        />
      );
    }
    if (item.type === 'stats') {
      return (
        <FlatList
          data={item.data}
          renderItem={renderStat}
          keyExtractor={(stat) => stat.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsContainer}
        />
      );
    }
    if (item.type === 'map') {
      return renderMap();
    }
    if (item.type === 'actions') {
      return renderActions();
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <View style={styles.container}>
        {/* En-tête */}
        <Animated.View entering={FadeInDown} style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
            <Ionicons name="arrow-back-outline" size={wp(8)} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil</Text>
        </Animated.View>

        {/* Contenu principal */}
        <FlatList
          data={flatListData}
          renderItem={renderSection}
          keyExtractor={(item) => item.type}
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
    backgroundColor: '#F8F8F8', // Aligné avec Home, Donateur, Trouverdonateur, BankSang, LocalisationBank, Notification, Profile
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3), // Réduit de gap: 95
    marginBottom: hp(0.5),
  },
  headerTitle: {
    fontSize: wp(6), // Réduit de 30
    fontWeight: '700',
    color: '#000000',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  listContainer: {
    paddingBottom: hp(2),
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(2),
  },
  profileImage: {
    height: wp(30), // Réduit de 130
    width: wp(30),
    borderRadius: wp(15),
  },
  profileInfo: {
    marginTop: hp(1),
    alignItems: 'center',
    gap: hp(0.5),
  },
  profileName: {
    color: '#000000',
    fontSize: wp(5),
    fontWeight: '700',
  },
  profileDonation: {
    color: 'rgba(169,169,169,0.9)',
    fontSize: wp(4),
    fontWeight: '600',
  },
  statsContainer: {
    justifyContent: 'center',
    gap: wp(4), // Réduit de gap: 15
    marginVertical: hp(2),
  },
  statCard: {
    alignItems: 'center',
    gap: hp(0.5),
    backgroundColor: '#FFFFFF', // Changé de rgba(169,169,169,0.2)
    width: wp(28), // Réduit de 120
    height: hp(10), // Réduit de 85
    justifyContent: 'center',
    padding: wp(2),
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statLabel: {
    color: 'rgba(169,169,169,0.9)',
    fontSize: wp(3.5),
    fontWeight: '700',
  },
  statValue: {
    color: '#000000',
    fontSize: wp(6),
    fontWeight: '700',
  },
  mapContainer: {
    marginVertical: hp(2),
  },
  map: {
    width: wp(92),
    height: hp(35), // Réduit de 300
    borderRadius: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(6), // Réduit de gap: 40
    marginVertical: hp(2),
  },
  callButton: {
    backgroundColor: '#E60449',
    borderRadius: 20,
    padding: wp(4),
    width: wp(40), // Réduit de 160
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: wp(4.5),
    fontWeight: '700',
  },
  requestButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: wp(4),
    width: wp(40), // Réduit de 160
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E60449',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  requestButtonText: {
    color: '#E60449',
    fontSize: wp(4.5),
    fontWeight: '700',
  },
});