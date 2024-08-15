import React from 'react'
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const HomePage = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Ionicons name="menu" size={45} color="#000000" />
            </TouchableOpacity>
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(169,169,169,0.2)', borderRadius: 10, paddingHorizontal: 10, marginVertical: 10, flex: 1, gap: 10, paddingHorizontal: 15, padding: 4 }}>
                        <Ionicons name="search" size={25} color='rgba(169,169,169,0.5)' style={{}} />
                        <TextInput
                            style={{ flex: 1, height: 40, fontSize: 16, color: '#000000', }}
                            placeholder="Search..."
                            placeholderTextColor='rgba(169,169,169,0.5)'
                        />
                    </View>

                    <TouchableOpacity>
                        <View style={{ backgroundColor: '#E60449', alignItems: 'center', justifyContent: 'center', borderRadius: 15, padding: 10 }}>
                            <Ionicons name="options" size={25} color="#FFFF" style={{}} />
                        </View>
                    </TouchableOpacity>
                    
                </View>
            </ScrollView>
        </View>
    )
}

export default HomePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '18%',
        paddingHorizontal: 20,
        // justifyContent:'center',
        // alignItems:'center',
    },
})
