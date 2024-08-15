import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Home from './home';
import Inbox from './inbox';
import Notification from './notification';
import Profile from './profile';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
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

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#E60449',
                // tabBarInactiveTintColor: '#748c94',
                headerShown: false, // Masquer le titre en haut de la page
                // tabBarShowLabel: false, // Masquer le titre en bas de la page
                tabBarStyle: {
                    display: 'flex',
                    height: '12%',
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                },
                tabBarLabelStyle: {
                    fontSize: 12, // Taille de police personnalisée
                    fontWeight: 'bold', // Style de police personnalisé
                }
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Inbox" component={Inbox} />
            <Tab.Screen name="Notification" component={Notification} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

export default Tabs;
