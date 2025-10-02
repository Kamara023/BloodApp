import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Linking, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Données fictives pour les options de soutien
const supportOptions = [
  {
    id: '1',
    icon: <Ionicons name="heart-outline" size={wp(6)} color="#FFFFFF" />,
    text: 'Faire un don financier',
    action: () => Linking.openURL('https://example.com/donate'), // Remplace par une URL réelle de don
  },
  {
    id: '2',
    icon: <Ionicons name="share-social-outline" size={wp(6)} color="#FFFFFF" />,
    text: 'Partager l\'app',
    action: () => console.log('Partager l\'app via partage natif'), // Intègre react-native-share si besoin
  },
  {
    id: '3',
    icon: <Ionicons name="people-outline" size={wp(6)} color="#FFFFFF" />,
    text: 'Devenir volontaire',
    action: () => console.log('Formulaire pour devenir volontaire'),
  },
];

// Données fictives pour les témoignages
const testimonials = [
  {
    id: '1',
    name: 'Marie Dupont',
    text: 'Grâce à cette app, j\'ai pu sauver une vie. Soutenez-la !',
    image: require('../../assets/image/portrait2.jpg'),
  },
  {
    id: '2',
    name: 'Jean Martin',
    text: 'Un petit don fait une grande différence pour les patients.',
    image: require('../../assets/image/portrait3.jpg'),
  },
];

export default function Soutenir() {
  const navigation = useNavigation();

  const renderSupportOption = ({ item }) => (
    <Animated.View entering={FadeInDown.delay(200)} style={styles.optionCard}>
      <TouchableOpacity onPress={item.action} style={styles.optionContent}>
        <View style={styles.optionIcon}>{item.icon}</View>
        <Text style={styles.optionText}>{item.text}</Text>
        <Ionicons name="chevron-forward" size={wp(6)} color="#000000" />
      </TouchableOpacity>
    </Animated.View>
  );

  const renderTestimonial = ({ item }) => (
    <Animated.View entering={FadeInDown.delay(300)} style={styles.testimonialCard}>
      <Image source={item.image} style={styles.testimonialImage} />
      <View style={styles.testimonialInfo}>
        <Text style={styles.testimonialName}>{item.name}</Text>
        <Text style={styles.testimonialText}>{item.text}</Text>
      </View>
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
          <Text style={styles.headerTitle}>Soutenir</Text>
        </Animated.View>

        {/* Contenu principal */}
        <FlatList
          data={[{ key: 'intro' }, { key: 'options' }, { key: 'testimonials' }]}
          renderItem={({ item }) => {
            if (item.key === 'intro') {
              return (
                <Animated.View entering={FadeInDown.delay(100)} style={styles.introContainer}>
                  <Text style={styles.introTitle}>Soutenez la cause du don de sang</Text>
                  <Text style={styles.introText}>
                    Votre soutien aide à sauver des vies. Faites un don, partagez l'app, ou devenez volontaire !
                  </Text>
                </Animated.View>
              );
            }
            if (item.key === 'options') {
              return (
                <View>
                  <Text style={styles.sectionTitle}>Comment soutenir ?</Text>
                  <FlatList
                    data={supportOptions}
                    renderItem={renderSupportOption}
                    keyExtractor={(option) => option.id}
                    scrollEnabled={false}
                  />
                </View>
              );
            }
            if (item.key === 'testimonials') {
              return (
                <View>
                  <Text style={styles.sectionTitle}>Témoignages</Text>
                  <FlatList
                    data={testimonials}
                    renderItem={renderTestimonial}
                    keyExtractor={(testimonial) => testimonial.id}
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
    backgroundColor: '#F8F8F8', // Aligné avec les autres pages
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
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: hp(1),
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
    padding: wp(4),
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
  testimonialCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  testimonialImage: {
    height: wp(16),
    width: wp(16),
    borderRadius: wp(8),
  },
  testimonialInfo: {
    flex: 1,
    marginLeft: wp(4),
  },
  testimonialName: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#000000',
  },
  testimonialText: {
    fontSize: wp(4),
    color: 'rgba(169,169,169,0.9)',
    marginTop: hp(0.5),
  },
});