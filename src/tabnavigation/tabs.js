import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Home from './home';
import Inbox from './inbox';
import Notification from './notification';
import Profile from './profile';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Inbox') {
              iconName = focused ? 'mail' : 'mail-outline';
            } else if (route.name === 'Notification') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return (
              <Animated.View entering={focused ? ZoomIn.duration(200) : FadeIn}>
                <Ionicons name={iconName} size={size} color={color} />
                {/* Badge pour les notifications (exemple) */}
                {route.name === 'Notification' && (
                  <View style={styles.notificationBadge}>
                    <Animated.Text entering={FadeIn} style={styles.badgeText}>3</Animated.Text>
                  </View>
                )}
              </Animated.View>
            );
          },
          tabBarActiveTintColor: '#E60449',
          tabBarInactiveTintColor: '#748c94',
          headerShown: false,
          tabBarStyle: {
            height: hp(10),
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 8,
            paddingBottom: hp(1),
            paddingTop: hp(1),
          },
          tabBarLabelStyle: {
            fontSize: wp(3.5),
            fontWeight: '600',
            marginBottom: hp(0.5),
          },
          tabBarIconStyle: {
            marginTop: hp(0.5),
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Inbox" component={Inbox} />
        <Tab.Screen name="Notification" component={Notification} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8', // Aligne avec le fond de Home
  },
  notificationBadge: {
    position: 'absolute',
    top: -hp(1),
    right: -wp(2),
    backgroundColor: '#E60449',
    borderRadius: wp(5),
    width: wp(5),
    height: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: wp(3),
    fontWeight: 'bold',
  },
});

export default Tabs;