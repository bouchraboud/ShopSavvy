import React from 'react';
import { ScrollView ,StyleSheet ,TouchableOpacity ,Image ,Text,View} from 'react-native';
function Parametre({navigation}) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.Text}>Parametres</Text>
            <View style={styles.Green}> 
                <TouchableOpacity style={styles.partie}> 
                  <Image source={require('../assets/amis.png')} style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.partie}>
                   <Image source={require('../assets/donation.png')} style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.partie}>
                   <Image source={require('../assets/notifications.png')} style={styles.icon}/>
                </TouchableOpacity> 
            </View>
            <Image source={require('../assets/filtre.png')} style={styles.icon1}/>
        </ScrollView>
    );
}
const styles = StyleSheet.create({ 
    container :{
        flex: 1,
        backgroundColor: '#FFFFFF', // Couleur d'arrière-plan de la vue
        flexDirection: 'row',
    },
    Text:{
       fontSize:28,
       position:'absolute',
       top:250,
       left:135,
       color:'#7DE51C',
       fontStyle:'italic',
       fontWeight:'bold',
    },
    Green:{
        backgroundColor:'#00ff00',
        width:67,
        height:850,
        justifyContent: 'center',
    },
    icon:{
        width:40,
        height:40,
        resizeMode: 'contain',
    },
    partie:{
        width:40,
        height:40,
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginTop:50,
    },
    icon1:{
        width:200,
        height:200,
        resizeMode:'contain',
        alignSelf: 'flex-start',
        marginLeft: 50,
        marginTop:360,
    }
})
export default Parametre;