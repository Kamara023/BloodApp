import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Données fictives pour les demandes de sang
const bloodRequests = [
  {
    id: '1',
    bloodGroup: 'A+',
    location: 'Abidjan, Cocody',
    urgency: 'Urgent',
    date: '02 Oct 2025',
    message: 'Besoin urgent pour une opération chirurgicale.',
  },
  {
    id: '2',
    bloodGroup: 'O-',
    location: 'Abidjan, Yopougon',
    urgency: 'Non urgent',
    date: '01 Oct 2025',
    message: 'Don requis pour un patient en traitement.',
  },
  {
    id: '3',
    bloodGroup: 'B+',
    location: 'Abidjan, Marcory',
    urgency: 'Urgent',
    date: '30 Sep 2025',
    message: 'Accident grave, besoin immédiat.',
  },
];

export default function demandesSang() {
  const navigation = useNavigation();
  const [bloodGroup, setBloodGroup] = useState('');
  const [urgency, setUrgency] = useState('Non urgent');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    console.log('Nouvelle demande:', { bloodGroup, urgency, message });
    // Ajoute ici la logique pour soumettre la demande (ex. : appel API)
    setBloodGroup('');
    setUrgency('Non urgent');
    setMessage('');
  };

  const renderIntro = () => (
    <Animated.View entering={FadeInDown.delay(100)} style={styles.introContainer}>
      <Text style={styles.introTitle}>Demandes de sang</Text>
      <Text style={styles.introText}>
        Soumettez une demande de don de sang ou répondez à une demande existante pour sauver des vies.
      </Text>
    </Animated.View>
  );

  const renderForm = () => (
    <Animated.View entering={FadeInDown.delay(200)} style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Nouvelle demande</Text>
      <TextInput
        style={styles.input}
        placeholder="Groupe sanguin (ex. : A+, O-)"
        value={bloodGroup}
        onChangeText={setBloodGroup}
      />
      <View style={styles.urgencyContainer}>
        <TouchableOpacity
          style={[styles.urgencyButton, urgency === 'Urgent' && styles.urgencyButtonActive]}
          onPress={() => setUrgency('Urgent')}
        >
          <Text style={[styles.urgencyText, urgency === 'Urgent' && styles.urgencyTextActive]}>Urgent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.urgencyButton, urgency === 'Non urgent' && styles.urgencyButtonActive]}
          onPress={() => setUrgency('Non urgent')}
        >
          <Text style={[styles.urgencyText, urgency === 'Non urgent' && styles.urgencyTextActive]}>Non urgent</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Message (optionnel)"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Soumettre la demande</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderRequest = ({ item }) => (
    <Animated.View entering={FadeInDown.delay(300)} style={styles.requestCard}>
      <View style={styles.requestInfo}>
        <Text style={styles.requestTitle}>{item.bloodGroup} - {item.location}</Text>
        <Text style={[styles.requestUrgency, item.urgency === 'Urgent' && styles.requestUrgencyUrgent]}>
          {item.urgency}
        </Text>
        <Text style={styles.requestDate}>{item.date}</Text>
        <Text style={styles.requestMessage}>{item.message}</Text>
      </View>
      <TouchableOpacity style={styles.respondButton} onPress={() => console.log(`Répondre à la demande ${item.id}`)}>
        <Text style={styles.respondButtonText}>Répondre</Text>
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
          <Text style={styles.headerTitle}>Demandes de sang</Text>
        </Animated.View>

        {/* Contenu principal */}
        <FlatList
          data={[{ key: 'intro' }, { key: 'form' }, { key: 'requests' }]}
          renderItem={({ item }) => {
            if (item.key === 'intro') return renderIntro();
            if (item.key === 'form') return renderForm();
            if (item.key === 'requests') {
              return (
                <View>
                  <Text style={styles.sectionTitle}>Demandes existantes</Text>
                  <FlatList
                    data={bloodRequests}
                    renderItem={renderRequest}
                    keyExtractor={(request) => request.id}
                    scrollEnabled={false}
                  />
                </View>
              );
            }
            return null;
          }}
          keyExtractor={(item) => item.key}
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
    backgroundColor: '#F8F8F8',
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
  introContainer: {
    marginVertical: hp(2),
    padding: wp(4),
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  introTitle: {
    fontSize: wp(5),
    fontWeight: '700',
    color: '#000000',
    marginBottom: hp(1),
  },
  introText: {
    fontSize: wp(4),
    color: 'rgba(169,169,169,0.9)',
  },
  sectionTitle: {
    fontSize: wp(5),
    fontWeight: '700',
    color: '#000000',
    marginBottom: hp(1),
  },
  formContainer: {
    marginVertical: hp(2),
    padding: wp(4),
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    backgroundColor: 'rgba(169,169,169,0.1)',
    borderRadius: 10,
    padding: wp(3),
    fontSize: wp(4),
    color: '#000000',
    marginBottom: hp(1.5),
  },
  messageInput: {
    height: hp(10),
    textAlignVertical: 'top',
  },
  urgencyContainer: {
    flexDirection: 'row',
    gap: wp(4),
    marginBottom: hp(1.5),
  },
  urgencyButton: {
    flex: 1,
    padding: wp(3),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E60449',
    alignItems: 'center',
  },
  urgencyButtonActive: {
    backgroundColor: '#E60449',
  },
  urgencyText: {
    fontSize: wp(4),
    color: '#E60449',
    fontWeight: '600',
  },
  urgencyTextActive: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#E60449',
    borderRadius: 20,
    padding: wp(4),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: wp(4),
    marginBottom: hp(1),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  requestInfo: {
    flex: 1,
  },
  requestTitle: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#000000',
  },
  requestUrgency: {
    fontSize: wp(4),
    color: 'rgba(169,169,169,0.9)',
    marginTop: hp(0.5),
  },
  requestUrgencyUrgent: {
    color: '#E60449',
    fontWeight: '600',
  },
  requestDate: {
    fontSize: wp(3.5),
    color: 'rgba(169,169,169,0.9)',
    marginTop: hp(0.5),
  },
  requestMessage: {
    fontSize: wp(4),
    color: '#000000',
    marginTop: hp(0.5),
  },
  respondButton: {
    backgroundColor: '#E60449',
    borderRadius: 10,
    padding: wp(2.5),
  },
  respondButtonText: {
    fontSize: wp(3.5),
    fontWeight: '600',
    color: '#FFFFFF',
  },
});