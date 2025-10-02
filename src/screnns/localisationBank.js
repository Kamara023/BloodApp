import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LocalisationBank() {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageSource1, imageSource2, name, location, rating, description, avis, nonbreAvis, critique, tempconnection, nom, critiquerediger, note } = route.params;
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName === selectedButton ? null : buttonName);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Image principale et en-tête */}
        <Animated.View entering={FadeInDown}>
          <View style={styles.imageContainer}>
            <Image source={imageSource1} style={styles.mainImage} />
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.navigate('BankSang')}>
                <Ionicons name="arrow-back-outline" size={wp(8)} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Contenu principal */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.contentContainer}>
          {/* Titre et emplacement */}
          <View style={styles.titleContainer}>
            <View>
              <Text style={styles.title}>{name}</Text>
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={wp(6)} color="#E60449" />
                <Text style={styles.locationText}>{location}</Text>
              </View>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={wp(5)} color="rgba(255, 215, 0, 0.9)" />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          </View>

          {/* Description */}
          <Animated.View entering={FadeInDown.delay(200)}>
            <Text style={styles.description}>{description}</Text>
          </Animated.View>

          {/* Avis */}
          <Animated.View entering={FadeInDown.delay(300)} style={styles.avisContainer}>
            <Text style={styles.avisTitle}>{avis}</Text>
            <Text style={styles.avisCount}>{nonbreAvis}</Text>
          </Animated.View>

          {/* Bouton pour rédiger une critique */}
          <Animated.View entering={FadeInDown.delay(400)}>
            <TouchableOpacity>
              <View style={styles.critiqueButton}>
                <Text style={styles.critiqueButtonText}>{critique}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Avis utilisateur */}
          <Animated.View entering={FadeInDown.delay(500)} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image source={imageSource2} style={styles.reviewImage} />
              <View>
                <Text style={styles.reviewName}>{nom}</Text>
                <Text style={styles.reviewTime}>{tempconnection}</Text>
              </View>
              <View style={styles.reviewRating}>
                <Ionicons name="star" size={wp(5)} color="rgba(255, 215, 0, 0.9)" />
                <Text style={styles.reviewRatingText}>{note}</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>{critiquerediger}</Text>
            <View style={styles.reviewActions}>
              <TouchableOpacity onPress={() => handleButtonPress('like')}>
                <AntDesign
                  name="like1"
                  size={wp(7)}
                  color={selectedButton === 'like' ? 'red' : 'rgba(169,169,169,0.9)'}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleButtonPress('dislike')}>
                <AntDesign
                  name="dislike1"
                  size={wp(7)}
                  color={selectedButton === 'dislike' ? 'blue' : 'rgba(169,169,169,0.9)'}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Boutons d'action */}
          <Animated.View entering={FadeInDown.delay(600)} style={styles.actionButtons}>
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
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8', // Aligné avec Home, Donateur, Trouverdonateur, BankSang
  },
  scrollContainer: {
    paddingBottom: hp(2),
  },
  imageContainer: {
    position: 'relative',
  },
  mainImage: {
    width: wp(100),
    height: hp(50), // Responsive height
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  header: {
    position: 'absolute',
    top: hp(2),
    left: wp(4),
  },
  contentContainer: {
    paddingHorizontal: wp(4),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp(1),
  },
  title: {
    fontSize: wp(5.5),
    fontWeight: '700',
    color: '#000000',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    marginTop: hp(0.5),
  },
  locationText: {
    fontSize: wp(4),
    color: 'rgba(169,169,169,0.9)',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(169,169,169,0.2)',
    borderRadius: 10,
    padding: wp(1.5),
    gap: wp(2),
    width: wp(20),
  },
  ratingText: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#000000',
  },
  description: {
    fontSize: wp(4),
    color: 'rgba(169,169,169,0.9)',
    fontWeight: '700',
    marginVertical: hp(1),
  },
  avisContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginVertical: hp(1),
  },
  avisTitle: {
    fontSize: wp(5.5),
    fontWeight: '700',
    color: '#000000',
  },
  avisCount: {
    fontSize: wp(5.5),
    fontWeight: '700',
    color: '#000000',
  },
  critiqueButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: wp(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: hp(1),
  },
  critiqueButtonText: {
    fontSize: wp(4.5),
    color: '#000000',
    fontWeight: '600',
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: wp(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: hp(1),
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginBottom: hp(1),
  },
  reviewImage: {
    height: wp(18),
    width: wp(18),
    borderRadius: wp(9),
  },
  reviewName: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#000000',
  },
  reviewTime: {
    fontSize: wp(3.5),
    fontWeight: '600',
    color: 'rgba(169,169,169,0.9)',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(169,169,169,0.2)',
    borderRadius: 10,
    padding: wp(1.5),
    gap: wp(2),
    width: wp(20),
    marginLeft: 'auto',
  },
  reviewRatingText: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#000000',
  },
  reviewText: {
    fontSize: wp(4),
    color: '#000000',
    fontWeight: 'normal',
    marginBottom: hp(1),
  },
  reviewActions: {
    flexDirection: 'row',
    gap: wp(6),
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(6),
    marginVertical: hp(2),
  },
  callButton: {
    backgroundColor: '#E60449',
    borderRadius: 20,
    padding: wp(4),
    width: wp(40),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  callButtonText: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  requestButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: wp(4),
    width: wp(40),
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
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#E60449',
  },
});