import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const notifications = [
  {
    id: 1,
    date: "Aujourd'hui",
    title: "Merci pour votre aide !",
    description: "Merci pour votre aide ! Merci pour votre aide !  Merci pour votre aide !  Merci pour votre aide !",
    icon: <AntDesign name="like1" size={28} color="#FFFFFF" />,
  },
  {
    id: 2,
    date: "Aujourd'hui",
    title: "Se sentir mieux dans sa peau",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    icon: <Ionicons name="happy" size={28} color="#FFFFFF" />,
  },
  {
    id: 3,
    date: "Hier",
    title: "Besoin de sang B+ dans la région",
    description: "B+ dans la région Merci pour votre aide !",
    icon: <Ionicons name="pulse-outline" size={28} color="#FFFFFF" />,
  },
  {
    id: 4,
    date: "Hier",
    title: "Se sentir mieux dans sa peau",
    description: "mieux dolormieux dans sa peau elit,",
    icon: <Ionicons name="rocket-sharp" size={28} color="#FFFFFF" />,
  },
  {
    id: 5,
    date: "Aujourd'hui",
    title: "Se sentir mieux dans sa peau",
    description: "mieux dolormieux dans sa peau elit,",
    icon: <Ionicons name="rocket-sharp" size={28} color="#FFFFFF" />,
  },
];

const NotificationCard = ({ icon, title, description }) => (
  <View style={styles.notificationCard}>
    <View style={styles.iconContainer}>{icon}</View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  </View>
);

export default function Notification() {
  const navigation = useNavigation(); // Navigation pour revenir à la page précédente

  return (
    <View style={styles.container}>
      {/* En-tête avec le bouton de retour et le titre */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back-outline" size={40} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
      </View>

      <ScrollView>
        {["Aujourd'hui", "Hier"].map((date) => (
          <View key={date} style={styles.section}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{date}</Text>
            </View>
            {notifications
              .filter((notification) => notification.date === date)
              .map((notification) => (
                <NotificationCard
                  key={notification.id}
                  icon={notification.icon}
                  title={notification.title}
                  description={notification.description}
                />
              ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF"
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
  section: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
  },
  notificationCard: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    backgroundColor: "rgba(169,169,169,0.1)",
    paddingHorizontal: 10,
    padding: 5,
    borderRadius: 10,
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: "#E60449",
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 99,
  },
  textContainer: {
    gap: 5,
    width: 270,
    height: 100,
    justifyContent: 'center',
  },
  title: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "rgba(169,169,169,0.9)",
    fontSize: 17,
    fontWeight: "normal",
  },
});
