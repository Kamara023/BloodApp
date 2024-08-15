import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomButton = ({ imageSource, text, onPress }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5, marginTop:12 }}>
                <View style={{ height:120 ,width: 120, backgroundColor: 'rgba(169,169,169,0.3)', justifyContent: 'center', alignItems: 'center', padding: 20, borderRadius: 999 }}>
                    <Image source={imageSource} style={{ height: 50, width: 50, tintColor: '#E60449' }} />
                    <Text style={{ color: '#000000', fontSize: 13, fontWeight: '500', marginTop: 5, textAlign: 'center' }}>{text}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CustomButton;
