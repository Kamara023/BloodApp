import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const notifications = [
  {
    id: '1',
    date: "Aujourd'hui",
    title: "Merci pour votre aide !",
    description: "Merci pour votre aide ! Merci pour votre aide ! Merci pour votre aide ! Merci pour votre aide !",
    icon: <AntDesign name="like1" size={wp(7)} color="#FFFFFF" />,
  },
  {
    id: '2',
    date: "Aujourd'hui",
    title: "Se sentir mieux dans sa peau",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    icon: <Ionicons name="happy" size={wp(7)} color="#FFFFFF" />,
  },
  {
    id: '3',
    date: "Hier",
    title: "Besoin de sang B+ dans la région",
    description: "B+ dans la région Merci pour votre aide !",
    icon: <Ionicons name="pulse-outline" size={wp(7)} color="#FFFFFF" />,
  },
  {
    id: '4',
    date: "Hier",
    title: "Se sentir mieux dans sa peau",
    description: "mieux dolormieux dans sa peau elit,",
    icon: <Ionicons name="rocket-sharp" size={wp(7)} color="#FFFFFF" />,
  },
  {
    id: '5',
    date: "Aujourd'hui",
    title: "Se sentir mieux dans sa peau",
    description: "mieux dolormieux dans sa peau elit,",
    icon: <Ionicons name="rocket-sharp" size={wp(7)} color="#FFFFFF" />,
  },
];

const NotificationCard = ({ icon, title, description }) => (
  <Animated.View entering={FadeInDown.delay(200)} style={styles.notificationCard}>
    <View style={styles.iconContainer}>{icon}</View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </Animated.View>
);

export default function Notification() {
  const navigation = useNavigation();

  // Grouper les notifications par date pour FlatList
  const groupedNotifications = [
    {
      title: "Aujourd'hui",
      data: notifications.filter((notification) => notification.date === "Aujourd'hui"),
    },
    {
      title: "Hier",
      data: notifications.filter((notification) => notification.date === "Hier"),
    },
  ];

  const renderNotification = ({ item }) => (
    <NotificationCard
      icon={item.icon}
      title={item.title}
      description={item.description}
    />
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Animated.View entering={FadeInDown} style={styles.dateContainer}>
      <Text style={styles.dateText}>{title}</Text>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <View style={styles.container}>
        {/* En-tête */}
        <Animated.View entering={FadeInDown} style={styles.header}>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
            <Ionicons name="arrow-back-outline" size={wp(8)} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text> */}
        </Animated.View>

        {/* Liste des notifications */}
        <FlatList
          data={groupedNotifications}
          renderItem={({ item }) => (
            <FlatList
              data={item.data}
              renderItem={renderNotification}
              keyExtractor={(notification) => notification.id}
              showsVerticalScrollIndicator={false}
            />
          )}
          keyExtractor={(section) => section.title}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8', // Aligné avec Home, Donateur, Trouverdonateur, BankSang, LocalisationBank
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    marginBottom: hp(0.5),
  },
  headerTitle: {
    fontSize: wp(6),
    fontWeight: '700',
    color: '#000000',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  listContainer: {
    paddingBottom: hp(2),
  },
  dateContainer: {
    marginBottom: hp(2),
  },
  dateText: {
    color: '#000000',
    fontSize: wp(5),
    fontWeight: '700',
  },
  notificationCard: {
    flexDirection: 'row',
    gap: wp(4),
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Changé de rgba(169,169,169,0.1)
    padding: wp(3),
    borderRadius: 15,
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: '#E60449',
    width: wp(12),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(6),
  },
  textContainer: {
    flex: 1,
    gap: hp(0.5),
  },
  title: {
    color: '#000000',
    fontSize: wp(4.5),
    fontWeight: '700',
  },
  description: {
    color: 'rgba(169,169,169,0.9)',
    fontSize: wp(4),
    fontWeight: 'normal',
  },
});