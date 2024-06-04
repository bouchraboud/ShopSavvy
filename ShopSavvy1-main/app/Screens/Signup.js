import React, { useState } from 'react';
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,ScrollView} from 'react-native';
import CustomInputField from '../components/CustomInputField';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLoading } from '../../redux/slices/user';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import Loading from '../components/loading';
function Signup({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {userLoading} = useSelector(state =>state.user);
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const handleLogin = async () => {
        let isError = false;
        if (!email || !password ) {
            setError("Please fill in all fields.");
            isError = true;
        }
        else{
            try{
                dispatch(setUserLoading(true));
                await signInWithEmailAndPassword(auth ,email , password);
                dispatch(setUserLoading(false));
            }catch(e){
                dispatch(setUserLoading(false));
                setError(e.message);
                isError = true;
            }
        }
    };
    return (
        <KeyboardAvoidingView
        behavior="height" 
        style={{flex: 1}}
        >
        <ScrollView>
            <Image source={require('../assets/store.png')} style={styles.logo} />
            <Text style={styles.logoname}>ShopSavvy</Text>
            <Text style={styles.title}>Welcome !</Text>
            <CustomInputField
                iconSource={require('../assets/user.png')}
                placeholder="Email"
                placeholderTextColor="#000000"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <CustomInputField
                iconSource={require('../assets/padlock.png')}
                placeholder="Password"
                placeholderTextColor="#000000"
                secureTextEntry={true}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
            />
            {
                error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null}
            {
                userLoading? (
                   <Loading />
                ):(
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                      <Text style={styles.loginButtonText}>Log In</Text>
                    </TouchableOpacity>
              )
            }
            <Text style={styles.titre}onPress={() => navigation.navigate('Forgetpassword')}>Forget Password</Text>
            <Text style={styles.titre1} onPress={() => navigation.navigate('Login')}>Don't have an account ?</Text>
        </ScrollView>
    </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    
    logo: {
        marginTop:  140, 
        alignSelf: 'flex-start',
        marginLeft: 24,
        width:110,
        height:110,
        resizeMode: 'contain', 
    },
    title: {
        alignSelf: 'flex-start',
        marginLeft: 76,
        fontSize:55,
        fontStyle:'italic',
        fontWeight:'bold',
        color:'#00ff00',
        marginTop:20,
    },
    logoname:{
        alignSelf: 'flex-start',
        marginLeft:140,
        fontSize:35,
        fontWeight:'bold',
        color:'#228B22',
        marginTop:-40,
    },
    input: {
        width: '80%',
        margin: 10,
        padding: 8,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 5,
        color: '#000',
        alignSelf: 'flex-start',
        marginLeft:24,
    },
    loginButton: {
        width: '30%',
        padding: 7,
        backgroundColor: '#00ff00', 
        borderRadius: 5,
        marginTop: 20, 
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: 137,
    },
    loginButtonText: {
        color: '#FFFFFF', 
        fontWeight: 'bold',
        fontSize:22,
    },
    titre:{
        fontSize: 17,
        alignSelf: 'flex-start',
        marginLeft: 131,
        marginTop:15,
    },
    titre1:{
        fontSize: 17,
        alignSelf: 'flex-start',
        marginLeft: 110,
        marginTop:8,
    },
    errorText:{
        fontSize:17,
        color:'red',
        textAlign: 'center',
        marginTop:7,
    }
})
export default Signup;