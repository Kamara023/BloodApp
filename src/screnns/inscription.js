// import React, { useState } from 'react';
// import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { RadioButton } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// import { Checkbox } from 'react-native-paper';

// export default function Inscription() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [modalVisibleBlood, setModalVisibleBlood] = useState(false);
//     const [modalVisibleCountry, setModalVisibleCountry] = useState(false);
//     const [selectedBlood, setSelectedBlood] = useState('');
//     const [selectedCountry, setSelectedCountry] = useState('');
//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//     const [checked, setChecked] = useState(false);
//     const navigation = useNavigation();

//     // Fonction pour gérer la sélection du pays
//     const handleCountryRadioButtonPress = (value, label) => {
//         setSelectedCountry(label);
//         setModalVisibleCountry(false);
//     };

//     // Fonction pour fermer la modal pour la sélection du pays
//     const closeModalCountry = () => {
//         setModalVisibleCountry(false);
//     };

//     // Fonction pour fermer la modal pour la sélection du groupe sanguin
//     const closeModalBlood = () => {
//         setModalVisibleBlood(false);
//     };

//     // Fonction pour gérer la sélection du groupe sanguin
//     const handleBloodRadioButtonPress = (value, label) => {
//         setSelectedBlood(label);
//         setModalVisibleBlood(false);
//     };

//     // Tableau des champs du formulaire
//     const fields = [
//         { label: 'Nom & Prénom', value: name, onChangeText: setName, placeholder: 'Entrez votre nom et prénom' },
//         { label: 'Email', value: email, onChangeText: setEmail, placeholder: 'Entrez votre email' },
//         { label: 'Mot de passe', value: password, onChangeText: setPassword, placeholder: 'Entrez votre mot de passe', secureTextEntry: !isPasswordVisible }
//     ];

//     // Tableau des pays disponibles
//     const countries = [
//         { label: "Côte d'Ivoire", value: 'first', color: 'blue' },
//         { label: 'Mali', value: 'second', color: 'green' },
//         { label: 'Burkina Faso', value: 'third', color: 'red' },
//         { label: 'Canada', value: 'third', color: 'red' },
//         { label: 'Benin', value: 'third', color: 'red' },
//         { label: 'Maroc', value: 'third', color: 'red' },
//     ];

//     // Tableau des groupes sanguins disponibles
//     const bloodTypes = [
//         { label: "A+", value: 'first', color: 'blue' },
//         { label: "B+", value: 'second', color: 'green' },
//         { label: "O+", value: 'third', color: 'red' },
//         { label: "AB", value: 'third', color: 'blue' }
//     ];

//     return (
//         <View style={styles.container}>
//             <ScrollView>
//                 {/* En-tête */}
//                 <View style={{ marginTop: '20%', paddingHorizontal: 20, gap: 15 }}>
//                     <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                         <Ionicons name="arrow-back-outline" size={40} color="#000000" />
//                     </TouchableOpacity>
//                     <View>
//                         <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Créer Votre Compte</Text>
//                     </View>
//                     <View>
//                         <Text style={{ fontSize: 20, color: 'rgba(169,169,169,0.9)' }}>Créer Votre Compte</Text>
//                     </View>
//                 </View>

//                 {/* Champs de formulaire */}
//                 <View>
//                     {fields.map((field, index) => (
//                         <View key={index} style={{ flexDirection: 'row', alignItems: 'center', }}>
//                             <TextInput
//                                 style={[styles.input, { flex: 1 }]}
//                                 onChangeText={field.onChangeText}
//                                 placeholder={field.placeholder}
//                                 value={field.value}
//                                 secureTextEntry={field.secureTextEntry || false}
//                             />
//                             {index === 2 && (
//                                 <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
//                                     <Ionicons
//                                         name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
//                                         size={28}
//                                         color="#000000"
//                                         style={{ marginLeft: -50 }}
//                                     />
//                                 </TouchableOpacity>
//                             )}
//                         </View>
//                     ))}
//                 </View>

//                 {/* Sélection du groupe sanguin */}
//                 <View>
//                     <TouchableOpacity onPress={() => setModalVisibleBlood(true)}>
//                         <View style={{ height: 50, margin: 8, padding: 10, borderRadius: 15, backgroundColor: 'rgba(169,169,169,0.1)', paddingHorizontal: 20, flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
//                             <Text style={[styles.selectText, selectedBlood ? styles.selectedText1 : null]}>{selectedBlood ? selectedBlood : 'Sélectionner mon groupe sanguin'}</Text>
//                             <Ionicons name="chevron-down" size={20} color='rgba(169,169,169,0.8)' style={{}} />
//                         </View>
//                     </TouchableOpacity>

//                     {/* Sélection du pays */}
//                     <TouchableOpacity onPress={() => setModalVisibleCountry(true)}>
//                         <View style={{ height: 50, margin: 8, padding: 10, borderRadius: 15, backgroundColor: 'rgba(169,169,169,0.1)', paddingHorizontal: 20, flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
//                             <Text style={[styles.selectText, selectedCountry ? styles.selectedText2 : null]}>{selectedCountry ? selectedCountry : 'Sélectionner un Pays'}</Text>
//                             <Ionicons name="chevron-down" size={20} color='rgba(169,169,169,0.8)' style={{}} />
//                         </View>
//                     </TouchableOpacity>
//                 </View>

//                 {/* Modal pour la sélection du groupe sanguin */}
//                 <Modal
//                     animationType="slide"
//                     transparent={true}
//                     visible={modalVisibleBlood}
//                     onRequestClose={() => setModalVisibleBlood(false)}
//                 >
//                     <View style={styles.modalContainer}>
//                         <View style={styles.modalView}>
//                             <TouchableOpacity onPress={closeModalBlood} style={styles.closeButton}>
//                                 <Ionicons name="close-circle-outline" size={24} color="black" />
//                             </TouchableOpacity>
//                             {bloodTypes.map((bloodType, index) => (
//                                 <RadioButton.Item
//                                     key={index}
//                                     label={bloodType.label}
//                                     value={bloodType.value}
//                                     color={bloodType.color}
//                                     status={selectedBlood === bloodType.label ? 'checked' : 'unchecked'}
//                                     onPress={() => handleBloodRadioButtonPress(bloodType.value, bloodType.label)}
//                                 />
//                             ))}
//                         </View>
//                     </View>
//                 </Modal>

//                 {/* Modal pour la sélection du pays */}
//                 <Modal
//                     animationType="slide"
//                     transparent={true}
//                     visible={modalVisibleCountry}
//                     onRequestClose={() => setModalVisibleCountry(false)}
//                 >
//                     <View style={styles.modalContainer}>
//                         <View style={styles.modalView}>

//                             <TouchableOpacity onPress={closeModalCountry} style={styles.closeButton}>
//                                 <Ionicons name="close-circle-outline" size={24} color="black" />
//                             </TouchableOpacity>
//                             {/* Liste des pays avec des boutons radio */}
//                             {countries.map((country, index) => (
//                                 <RadioButton.Item
//                                     key={index}
//                                     label={country.label}
//                                     value={country.value}
//                                     color={country.color}
//                                     status={selectedCountry === country.label ? 'checked' : 'unchecked'}
//                                     onPress={() => handleCountryRadioButtonPress(country.value, country.label)}
//                                 />
//                             ))}
//                         </View>
//                     </View>
//                 </Modal>

//                 {/* Case à cocher pour se souvenir de moi */}
//                 <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
//                     <View>
//                         <Checkbox
//                             status={checked ? 'checked' : 'unchecked'}
//                             onPress={() => {
//                                 setChecked(!checked);
//                             }}
//                             color={checked ? '#E60449' : 'gray'}
//                             uncheckedColor="gray"
//                         />
//                     </View>

//                     <View>
//                         <Text>Se souvenir de moi</Text>
//                     </View>
//                 </View>

//                 {/* Bouton de connexion */}
//                 <View>
//                     <View>
//                         <TouchableOpacity>
//                             <View style={{ backgroundColor: '#E60449', padding: 15, marginVertical: 10, marginHorizontal: 10, borderRadius: 10, justifyContent: 'flex-end', alignItems: 'center' }}>
//                                 <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Se connecter</Text>
//                             </View>
//                         </TouchableOpacity>
//                     </View>
//                     {/* Séparateur */}
//                     <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8, paddingHorizontal: 18 }}>
//                         <View style={{ flex: 1, height: 1, backgroundColor: 'black', }} />
//                         <Text style={{ marginHorizontal: 10, fontSize: 16, color: 'black', }}>Ou</Text>
//                         <View style={{ flex: 1, height: 1, backgroundColor: 'black', }} />
//                     </View>
//                     {/* Bouton de connexion avec Facebook */}
//                     <View>
//                         <TouchableOpacity>
//                             <View style={{ backgroundColor: '#1E90FF', padding: 13, marginVertical: 10, marginHorizontal: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
//                                 <Ionicons name="logo-facebook" size={28} color='#FFFFFF' style={{}} />
//                                 <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Se connecter avec facebook</Text>
//                             </View>
//                         </TouchableOpacity>
//                     </View>
//                     {/* Bouton de connexion avec Google */}
//                     <View>
//                         <TouchableOpacity>
//                             <View style={{ backgroundColor: '#FFA07A', padding: 13, marginVertical: 10, marginHorizontal: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
//                                 <Ionicons name="logo-google" size={28} color='#FFFFFF' style={{}} />
//                                 <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Se connecter avec Google</Text>
//                             </View>
//                         </TouchableOpacity>
//                     </View>

//                     {/* Lien pour se connecter */}
//                     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
//                         <Text style={{ textAlign: 'center', marginVertical: 10, }}>Vous avez déjà un compte ?</Text>
//                         <TouchableOpacity onPress={() => navigation.navigate('Connexion')}>
//                             <Text style={{ textAlign: 'center', color: '#E60449', fontWeight: 'bold' }}>Se connecter</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </ScrollView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: 15
//     },
//     input: {
//         height: 50,
//         margin: 8,
//         padding: 10,
//         borderRadius: 15,
//         backgroundColor: 'rgba(169,169,169,0.1)',
//         paddingHorizontal: 20,
//         flex: 1
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//     },
//     modalView: {
//         backgroundColor: 'white',
//         padding: 35,
//         alignItems: 'center',
//         borderTopLeftRadius: 40,
//         borderTopRightRadius: 40,
//         width: '100%',
//         borderWidth: 1,
//         borderColor: 'rgba(169,169,169,0.9)'
//     },
//     closeButton: {
//         position: 'absolute',
//         top: 15,
//         right: 15
//     },
//     selectText: {
//         color: 'rgba(169,169,169,0.8)',
//         fontSize: 15,
//         fontWeight: '500'
//     },
//     selectedText1: {
//         color: '#E60449', // Couleur sélectionnée
//         fontWeight: 'bold' // Style différent pour la sélection
//     },
//     selectedText2: {
//         color: '#000000', // Couleur sélectionnée
//         fontWeight: '500' // Style différent pour la sélection
//     }
// });














import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';

export default function Inscription() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisibleBlood, setModalVisibleBlood] = useState(false);
    const [modalVisibleCountry, setModalVisibleCountry] = useState(false);
    const [selectedBlood, setSelectedBlood] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [checked, setChecked] = useState(false);
    const navigation = useNavigation();

    // Fonction pour gérer la sélection du pays
    const handleCountryRadioButtonPress = (value, label) => {
        setSelectedCountry(label);
        setModalVisibleCountry(false);
    };

    // Fonction pour fermer la modal pour la sélection du pays
    const closeModalCountry = () => {
        setModalVisibleCountry(false);
    };

    // Fonction pour fermer la modal pour la sélection du groupe sanguin
    const closeModalBlood = () => {
        setModalVisibleBlood(false);
    };

    // Fonction pour gérer la sélection du groupe sanguin
    const handleBloodRadioButtonPress = (value, label) => {
        setSelectedBlood(label);
        setModalVisibleBlood(false);
    };

    // Fonction pour valider les champs et naviguer si les champs sont remplis
    const handleSignUp = () => {
        if (!name || !email || !password || !selectedBlood || !selectedCountry) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
        } else {
            navigation.navigate('Tabs');
        }
    };

    // Tableau des champs du formulaire
    const fields = [
        { label: 'Nom & Prénom', value: name, onChangeText: setName, placeholder: 'Nom & Prénom' },
        { label: 'Email', value: email, onChangeText: setEmail, placeholder: 'Email' },
        { label: 'Mot de passe', value: password, onChangeText: setPassword, placeholder: 'Mot de passe', secureTextEntry: true }
    ];

    // Tableau des pays disponibles
    const countries = [
        { label: "Angré", value: 'first', color: 'blue' },
        { label: 'Yopougon', value: 'second', color: 'green' },
        { label: 'Abobo', value: 'third', color: 'red' },
        { label: 'Bingerville', value: 'third', color: 'red' },
        { label: 'Dabou', value: 'third', color: 'red' },
        { label: 'Marcory', value: 'third', color: 'red' },
    ];

    // Tableau des groupes sanguins disponibles
    const bloodTypes = [
        { label: "A+", value: 'first', color: 'blue' },
        { label: "B+", value: 'second', color: 'green' },
        { label: "O+", value: 'third', color: 'red' },
        { label: "AB", value: 'third', color: 'blue' }
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* En-tête */}
                <View style={{ marginTop: '20%', paddingHorizontal: 20, gap: 15 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Ionicons name="arrow-back-outline" size={40} color="#000000" />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Créer Votre Compte</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 20, color: 'rgba(169,169,169,0.9)' }}>Créer Votre Compte</Text>
                    </View>
                </View>

                {/* Champs de formulaire */}
                <View>
                    {fields.map((field, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                onChangeText={field.onChangeText}
                                placeholder={field.placeholder}
                                value={field.value}
                                secureTextEntry={field.label === 'Mot de passe' && !isPasswordVisible}
                            />
                            {index === 2 && (
                                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                    <Ionicons
                                        name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                                        size={28}
                                        color="#000000"
                                        style={{ marginLeft: -50 }}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </View>

                {/* Sélection du groupe sanguin */}
                <View>
                    <TouchableOpacity onPress={() => setModalVisibleBlood(true)}>
                        <View style={{ height: 50, margin: 8, padding: 10, borderRadius: 15, backgroundColor: 'rgba(169,169,169,0.1)', paddingHorizontal: 20, flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.selectText, selectedBlood ? styles.selectedText1 : null]}>{selectedBlood ? selectedBlood : 'Sélectionner mon groupe sanguin'}</Text>
                            <Ionicons name="chevron-down" size={20} color='rgba(169,169,169,0.8)' style={{}} />
                        </View>
                    </TouchableOpacity>

                    {/* Sélection du pays */}
                    <TouchableOpacity onPress={() => setModalVisibleCountry(true)}>
                        <View style={{ height: 50, margin: 8, padding: 10, borderRadius: 15, backgroundColor: 'rgba(169,169,169,0.1)', paddingHorizontal: 20, flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.selectText, selectedCountry ? styles.selectedText2 : null]}>{selectedCountry ? selectedCountry : 'Sélectionner votre ville'}</Text>
                            <Ionicons name="chevron-down" size={20} color='rgba(169,169,169,0.8)' style={{}} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Modal pour la sélection du groupe sanguin */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleBlood}
                    onRequestClose={() => setModalVisibleBlood(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <TouchableOpacity onPress={closeModalBlood} style={styles.closeButton}>
                                <Ionicons name="close-circle-outline" size={24} color="black" />
                            </TouchableOpacity>
                            {bloodTypes.map((bloodType, index) => (
                                <RadioButton.Item
                                    key={index}
                                    label={bloodType.label}
                                    value={bloodType.value}
                                    color={bloodType.color}
                                    status={selectedBlood === bloodType.label ? 'checked' : 'unchecked'}
                                    onPress={() => handleBloodRadioButtonPress(bloodType.value, bloodType.label)}
                                />
                            ))}
                        </View>
                    </View>
                </Modal>

                {/* Modal pour la sélection du pays */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleCountry}
                    onRequestClose={() => setModalVisibleCountry(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <TouchableOpacity onPress={closeModalCountry} style={styles.closeButton}>
                                <Ionicons name="close-circle-outline" size={24} color="black" />
                            </TouchableOpacity>
                            {/* Liste des pays avec des boutons radio */}
                            {countries.map((country, index) => (
                                <RadioButton.Item
                                    key={index}
                                    label={country.label}
                                    value={country.value}
                                    color={country.color}
                                    status={selectedCountry === country.label ? 'checked' : 'unchecked'}
                                    onPress={() => handleCountryRadioButtonPress(country.value, country.label)}
                                />
                            ))}
                        </View>
                    </View>
                </Modal>

                {/* Case à cocher pour se souvenir de moi */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <View>
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                            color={checked ? '#E60449' : 'gray'}
                            uncheckedColor="gray"
                        />
                    </View>

                    <View>
                        <Text>Se souvenir de moi</Text>
                    </View>
                </View>

                {/* Bouton de connexion */}

                <View>
                    <TouchableOpacity onPress={handleSignUp}>
                        <View style={{ backgroundColor: '#E60449', padding: 15, marginVertical: 10, marginHorizontal: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Se connecter</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Séparateur */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8, paddingHorizontal: 18 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    <Text style={{ marginHorizontal: 10, fontSize: 16, color: 'black' }}>Ou</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                </View>

                {/* Bouton de connexion avec Facebook */}
                <View>
                    <TouchableOpacity>
                        <View style={{ backgroundColor: '#1E90FF', padding: 13, marginVertical: 10, marginHorizontal: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                            <Ionicons name="logo-facebook" size={28} color='#FFFFFF' />
                            <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Se connecter avec Facebook</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Bouton de connexion avec Google */}
                <View>
                    <TouchableOpacity>
                        <View style={{ backgroundColor: '#FFA07A', padding: 13, marginVertical: 10, marginHorizontal: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                            <Ionicons name="logo-google" size={28} color='#FFFFFF' />
                            <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Se connecter avec Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Lien pour se connecter */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
                    <Text style={{ textAlign: 'center', marginVertical: 10 }}>Vous avez déjà un compte ?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Connexion')}>
                        <Text style={{ textAlign: 'center', color: '#E60449', fontWeight: 'bold' }}>Se connecter</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    input: {
        height: 50,
        margin: 8,
        padding: 10,
        borderRadius: 15,
        backgroundColor: 'rgba(169,169,169,0.1)',
        paddingHorizontal: 20,
        flex: 1
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        padding: 35,
        alignItems: 'center',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(169,169,169,0.9)'
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15
    },
    selectText: {
        color: 'rgba(169,169,169,0.8)',
        fontSize: 15,
        fontWeight: '500'
    },
    selectedText1: {
        color: '#E60449', // Couleur sélectionnée
        fontWeight: 'bold' // Style différent pour la sélection
    },
    selectedText2: {
        color: '#000000', // Couleur sélectionnée
        fontWeight: '500' // Style différent pour la sélection
    }
});
