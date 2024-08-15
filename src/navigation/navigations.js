import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IndexScreen from '../slider/indexScrenn';
import Login from '../screnns/login';
import Inscription from '../screnns/inscription';
import Connexion from '../screnns/connexion';
import MotDePasseOublier from '../mot_de_passe_oublier/motDePasseOublier';
import MotDePasseVerification from '../mot_de_passe_oublier/motDePasseVerification';
import MotDePasseRenitialiser from '../mot_de_passe_oublier/motDePasseRenitialiser';
import HomeScreen from '../screnns/homeScreen';
import HomePage from '../screnns/homePage';
import Tabs from '../tabnavigation/tabs';
import Trouverdonateur from '../screnns/trouverdonateur';
import ProfileDonateur from '../screnns/profileDonateur';
import Donateur from '../screnns/donateur';
import BankSang from '../screnns/bankSang';
import LocalisationBank from '../screnns/localisationBank';
import Chargement from '../chargement/chargement';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={IndexScreen} />
        <Stack.Screen name="NextScreen" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login } />
        <Stack.Screen name="Inscription" component={Inscription } />
        <Stack.Screen name="Connexion" component={Connexion } />
        <Stack.Screen name="MotDePasseOublier" component={MotDePasseOublier } />
        <Stack.Screen name="MotDePasseVerification" component={MotDePasseVerification } />
        <Stack.Screen name="MotDePasseRenitialiser" component={MotDePasseRenitialiser } />
        <Stack.Screen name="HomePage" component={HomePage } />
        <Stack.Screen name="Tabs" component={Tabs } />
        <Stack.Screen name="Trouverdonateur" component={Trouverdonateur} />
        <Stack.Screen name="ProfileDonateur" component={ProfileDonateur} />
        <Stack.Screen name="Donateur" component={Donateur} />
        <Stack.Screen name="BankSang" component={BankSang} />
        <Stack.Screen name="LocalisationBank" component={LocalisationBank} />
        <Stack.Screen name=" Chargement" component={ Chargement } />



      </Stack.Navigator>
  );
}




