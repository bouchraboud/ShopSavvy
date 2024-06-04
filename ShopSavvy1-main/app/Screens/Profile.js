import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Image, StyleSheet, TextInput, Pressable, Alert,TouchableOpacity ,View} from 'react-native';
import { ref, onValue, update } from 'firebase/database';
import { database} from '../../config/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import storage from '@react-native-firebase/storage';

function Profile({ navigation }) {
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);
    const [selectedImageUri, setSelectedImageUri] = useState(null);
    const defaultImage = require('../assets/profile.png');

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userId = user.uid;
                const userRef = ref(database, `users/${userId}`);
                onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    console.log('Data from Firebase:', data);
                    setUser(data);
                    setImage(data.image || null);
                });
            } else {
                setUser(null);
            }
        });
    }, []);
    const uploadImageToFirebaseStorage = async (uri) => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
    
        if (!currentUser) {
            console.error('User not authenticated');
            return;
        }
    
        if (!uri) {
            console.error('No image URI provided');
            Alert.alert('Erreur', 'Aucune image sélectionnée');
            return;
        }
    
        try {
            console.log('Uploading image to Firebase Storage:', uri);
            let filename = uri.substring(uri.lastIndexOf('/') + 1);
            await storage().ref(filename).putFile(uri);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'image vers Firebase Storage : ', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de l\'envoi de l\'image.');
        }
    };
    const selectImage = async () => {
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [1, 1],
            quality: 0.5,
        };
        try {
            const pickerResult = await ImagePicker.launchImageLibraryAsync(options);
            console.log('Picker result:', pickerResult);

            if (!pickerResult.canceled) {
                const uri = pickerResult.assets[0].uri;
                console.log('Selected image URI:', uri);
                setSelectedImageUri(uri);
                setImage(uri);
                await uploadImageToFirebaseStorage(uri);
            } else {
                console.log('Image selection cancelled by user');
            }
        } catch (error) {
            console.error('Error selecting image:', error);
        }
    };
    const takeImage = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission refusée', 'Désolé, nous avons besoin de la permission d\'accéder à votre appareil photo pour que cela fonctionne.');
                return;
            }
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: false,
                aspect: [4, 3],
                quality: 1,
            });
            console.log('Camera result:', result);
            if (!result.canceled) {
                const uri = result.assets[0].uri;
                console.log('Captured image URI:', uri);
                setSelectedImageUri(uri);
                setImage(uri);
                await uploadImageToFirebaseStorage(uri);
            } else {
                console.log('Image capture cancelled by user');
            }
        } catch (error) {
            console.error('Error capturing image:', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de la prise de la photo.');
        }
    };

    const removeImage = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const imageRef = ref(storage, `images/${user.uid}`);
                await deleteObject(imageRef);
                setImage(defaultImage); 
                await update(ref(database, `users/${user.uid}`), { image: null });
                Alert.alert('Image supprimée avec succès.');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'image : ', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de la suppression de l\'image.');
        }
    };

    const showOptions = () => {
        Alert.alert(
            'Options',
            'Que voulez-vous faire avec l\'image ?',
            [
                { text: 'Importer une image', onPress: selectImage },
                { text: 'Prendre une photo', onPress: takeImage },
                { text: 'Supprimer l\'image', onPress: removeImage, style: 'destructive' },
                { text: 'Annuler', style: 'cancel' }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            {user && (
                <>
                  <Text style={styles.text}>Profile</Text>
                    <View style={styles.profileContainer}>
                        <Pressable onPress={showOptions}>
                            <Image source={image ? { uri: image } : defaultImage} style={styles.image} />
                        </Pressable>
                        <View style={styles.textContainer}>
                            <Text style={styles.label1}>{user.nom}</Text>
                            <Text style={styles.label2}>{user.email}</Text>
                        </View>
                    </View>
                </>
            )}
                <TouchableOpacity style={styles.user1}> 
                  <Image source={require('../assets/notifications.png')} style={styles.icon}/>
                  <Text style={styles.user1Text}>Notifications</Text>
                  <Image source={require('../assets/left.png')} style={styles.icon1}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.user1} onPress={() => navigation.navigate('ChangePassword')}> 
                  <Image source={require('../assets/rotation.png')} style={styles.icon}/>
                  <Text style={styles.user1Text}>Change Password</Text>
                  <Image source={require('../assets/left.png')} style={styles.icon2}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.user1}> 
                  <Image source={require('../assets/moon.png')} style={styles.icon}/>
                  <Text style={styles.user1Text}>Light /Dark mode</Text>
                  <Image source={require('../assets/left.png')} style={styles.icon3}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.user1}> 
                  <Image source={require('../assets/languages.png')} style={styles.icon}/>
                  <Text style={styles.user1Text}>Language</Text>
                  <Image source={require('../assets/left.png')} style={styles.icon4}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.user1} onPress={() => navigation.navigate('Help')}> 
                  <Image source={require('../assets/customer.png')} style={styles.icon}/>
                  <Text style={styles.user1Text}>Help & Support</Text>
                  <Image source={require('../assets/left.png')} style={styles.icon5}/>
                </TouchableOpacity>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        marginTop: 20,
        marginLeft: 10,
        width: 142,
        height: 142,
        marginBottom: 20,
        borderRadius: 25,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop:15,
    },
    textContainer: {
        marginLeft: 26,
        marginTop:3,
    },
    label1:{
        fontSize:26,
        fontWeight:'bold',
        marginLeft:23,
        marginTop:20,
    },
    label2:{
       fontSize:15,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 37,
        marginLeft: 156,
        color: '#19b604',
    },
    user1:{
        width: '83%',
        padding: 19,
        backgroundColor: '#2ced2f', 
        borderRadius: 10,
        marginTop: 27, 
        marginLeft:12,
        flexDirection: 'row', 
        alignItems: 'center',
        alignSelf: 'center', 
    },
    icon:{
        width: 25,
        height:25,
    },
    user1Text:{
          marginLeft:8,
          fontSize:21,
    },
    icon5:{
        width: 20,
        height:20,
        marginLeft:85,
    },
    icon1:{
        width: 20,
        height:20,
        marginLeft:110,
    },
    icon2:{
        width: 20,
        height:20,
        marginLeft:60,
    },
    icon3:{
        width: 20,
        height:20,
        marginLeft:65,
    },
    icon4:{
        width: 20,
        height:20,
        marginLeft:133,
    },
});

export default Profile;
