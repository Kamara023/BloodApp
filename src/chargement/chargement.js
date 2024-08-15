import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const Chargement = () => {
  return (
    <View style={{height: 120, aspectRatio: 1}}>
        {/* <LottieView source={require('../../assets/loading.json')} autoPlay loop /> */}
        <LottieView style={{flex:1,}} source={require('../../assets/image/chargement.json')}  autoPlay loop />
        {/* <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>Chargement...</Text> */}
    </View>
  )
}

export default Chargement

const styles = StyleSheet.create({})