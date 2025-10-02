import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Switch } from 'react-native';
import { Ionicons, Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const data = [
  { id: '1', label: 'Donné', value: '05' },
  { id: '2', label: 'Demande', value: '03' },
  { id: '3', label: 'Vie sauvée', value: '06' },
];

const items = [
  {
    id: '1',
    icon: <Ionicons name="rocket-sharp" size={wp(6)} color="#FFFFFF" />,
    text: 'Je veux donner',
    action: () => console.log('Je veux donner'),
    switch: true,
  },
  {
    id: '2',
    icon: <Entypo name="edit" size={wp(6)} color="#FFFFFF" />,
    text: 'Modifier mon profil',
    action: () => console.log('Modifier mon profil'),
  },
  {
    id: '3',
    icon: <Ionicons name="analytics-outline" size={wp(6)} color="#FFFFFF" />,
    text: 'Demandes de sang',
    action: () => console.log('Demandes de sang'),
  },
  {
    id: '4',
    icon: <Ionicons name="settings-outline" size={wp(6)} color="#FFFFFF" />,
    text: 'Paramètres',
    action: () => console.log('Paramètres'),
  },
  {
    id: '5',
    icon: <AntDesign name="addusergroup" size={wp(6)} color="#FFFFFF" />,
    text: 'Inviter un ami',
    action: () => console.log('Inviter un ami'),
  },
  {
    id: '6',
    icon: <MaterialIcons name="privacy-tip" size={wp(6)} color="#FFFFFF" />,
    text: 'Confidentialité',
    action: () => console.log('Politique de confidentialité'),
  },
  {
    id: '7',
    icon: <Ionicons name="star-outline" size={wp(6)} color="#FFFFFF" />,
    text: 'Nous évaluer',
    action: () => console.log('Nous évaluer'),
  },
  {
    id: '8',
    icon: <AntDesign name="exclamationcircleo" size={wp(6)} color="#FFFFFF" />,
    text: 'À propos de nous',
    action: () => console.log('À propos de nous'),
  },
];

const profiles = [
  {
    id: '1',
    name: 'Jame Peterson',
    lastDonation: 'Dernier don décembre 2023',
    image: require('../../assets/image/portrait.jpg'),
  },
];

export default function Profile() {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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

  const renderItem = ({ item }) => (
    <Animated.View entering={FadeInDown.delay(300)} style={styles.optionCard}>
      <TouchableOpacity onPress={item.action} style={styles.optionContent}>
        <View style={styles.optionIcon}>{item.icon}</View>
        <Text style={styles.optionText}>{item.text}</Text>
        {item.switch ? (
          <Switch
            trackColor={{ false: '#767577', true: '#E60449' }}
            thumbColor={isEnabled ? '#f4f3f4' : 'rgba(169,169,169,0.9)'}
            ios_backgroundColor="rgba(169,169,169,0.3)"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        ) : (
          <Ionicons name="chevron-forward" size={wp(6)} color="#000000" />
        )}
      </TouchableOpacity>
    </Animated.View>
  );

  const renderLogout = () => (
    <Animated.View entering={FadeInDown.delay(400)} style={styles.logoutContainer}>
      <TouchableOpacity onPress={() => console.log('Se déconnecter')}>
        <View style={styles.logoutContent}>
          <View style={styles.logoutIcon}>
            <Ionicons name="arrow-back-outline" size={wp(6)} color="#FFFFFF" />
          </View>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const flatListData = [
    { type: 'profile', data: profiles },
    { type: 'stats', data: data },
    { type: 'options', data: items },
    { type: 'logout', data: null },
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
    if (item.type === 'options') {
      return (
        <FlatList
          data={item.data}
          renderItem={renderItem}
          keyExtractor={(option) => option.id}
          scrollEnabled={false}
        />
      );
    }
    if (item.type === 'logout') {
      return renderLogout();
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <View style={styles.container}>
        {/* En-tête */}
        <Animated.View entering={FadeInDown} style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
            {/* <Ionicons name="arrow-back-outline" size={wp(8)} color="#000000" /> */}
          </TouchableOpacity>
          {/* <Text style={styles.headerTitle}>Profil</Text> */}
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
    backgroundColor: '#F8F8F8', // Aligné avec Home, Donateur, Trouverdonateur, BankSang, LocalisationBank, Notification
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
    marginBottom: hp(3),
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
  optionCard: {
    backgroundColor: '#FFFFFF', // Changé de rgba(169,169,169,0.1)
    borderRadius: 15,
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp(3),
  },
  optionIcon: {
    backgroundColor: '#E60449',
    width: wp(10),
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(5),
  },
  optionText: {
    color: '#000000',
    fontSize: wp(4.5),
    fontWeight: '600',
    flex: 1,
    marginLeft: wp(4),
  },
  logoutContainer: {
    marginVertical: hp(2),
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp(4),
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: wp(3),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutIcon: {
    backgroundColor: '#E60449',
    width: wp(10),
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(5),
  },
  logoutText: {
    color: '#000000',
    fontSize: wp(4.5),
    fontWeight: '600',
  },
});