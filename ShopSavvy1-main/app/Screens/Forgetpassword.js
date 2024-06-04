import React, { useState } from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,ScrollView , Alert} from 'react-native';
import { auth } from '../../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
function Forgetpassword({navigation}) {
    const [email, setEmail] = useState('');
     const handleResetPassword = () => {
        sendPasswordResetEmail( auth,email)
        .then(() => {
            Alert.alert('Email envoyé' , 'Un email de réinitialisation de mot de passe a été envoyé à votre adresse.')
        })
        .catch((error) => {
            Alert.alert('Erreur', error.message);
        });
     };
    return (
        <KeyboardAvoidingView
        behavior="height" 
        style={{flex: 1}}
        >
         <ScrollView style={styles.container}>
            <View style={styles.first}>
                <TextInput
                    type="text"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Entrez ton email"
                    style={styles.input}
                />
            </View>
            <TouchableOpacity style={styles.Button}>
                    <Text style={styles.ButtonText} onPress={() => handleResetPassword()}>Send Recovery email</Text>
            </TouchableOpacity>
         </ScrollView>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFFFF', 
    },
    first:{
        width:350,
        height:300,
        borderRadius:40,
        marginTop:130,
        alignSelf: 'flex-start',
        marginLeft:24,
        backgroundColor:'#55E139',
    },
    input: {
        alignSelf: 'flex-start',
        marginLeft:40,
        width: 295, 
        padding: 10,
        marginTop: 120,
        borderWidth: 1,
        borderColor: '#55E139', 
        borderRadius: 10,
    },
    Button:{
        marginLeft:80 ,
        marginTop:30,
        width:240,
        height:40,
        backgroundColor:'#00ff00',
        borderRadius:30,
    },
    ButtonText:{
         color: '#FFFFFF',
         fontWeight: 'bold',
         fontSize:20,
         marginLeft:28,
         marginTop:4,
    },
})
export default Forgetpassword;