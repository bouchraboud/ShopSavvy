import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions ,TouchableOpacity} from 'react-native';

function Welcome({navigation}) {
    const handleWelcome = () => {
        console.log(Welcome); 
        navigation.navigate('Signup')
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.Welcome}>
                <Image source={require('../assets/store.png')} style={styles.logo} />
                <Text style={styles.logoname}>ShopSavvy</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Discover products effortlessly with our smart recognition technology.</Text>
            <TouchableOpacity style={styles.WelcomeButton}>
                    <Text style={styles.WelcomeButtonText} onPress={() => navigation.navigate('Signup')}>Let's start</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#00ff00',
    },
    Welcome:{
       width:400,
       height:440,
       borderBottomRightRadius:200,   
       backgroundColor: '#FFFFFF', 
    },
    logo: {
        marginTop: 100, 
        alignSelf: 'center', 
        width:220,
        height:220,
        resizeMode: 'contain', 
    },
    logoname: {
        fontSize:45,
        fontWeight:'bold',
        marginTop: 38,
        color:'#228B22',
        fontStyle: 'italic',
        alignSelf: 'flex-start',
        marginLeft: 24,
    },
    title :{
        color:'white',
        fontSize:22,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: 64,
        fontWeight:'bold',
    },
    WelcomeButton: {
        width: '35%',
        padding: 10,
        backgroundColor: '#FFFFFF', 
        borderRadius: 5,
        marginTop: 38, 
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: 125,
    },
    WelcomeButtonText: {
        color: '#00ff00', 
        fontWeight: 'bold',
        fontSize:24,
    },
})
export default Welcome;