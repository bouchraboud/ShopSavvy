import React from 'react';
import { ScrollView ,StyleSheet ,TouchableOpacity ,Image ,Text,View} from 'react-native';
import Loading from '../components/loading';
function Amis({navigation}) {
    const [destinataire,setDestinataire] = useState('');
    const [message,setMessage] = useState('');
    const [produit,setProduit] = useState('');
    const [loading ,setLoading] = useState(false);
    const [error, setError] = useState('');
    return (
        <ScrollView style={StyleSheet.container}>
            <Text style={styles.titre}>Send Product</Text>
            <TextInput
                    type="text"
                    value={destinataire}
                    onChangeText={setDestinataire}
                    placeholder="Entrez le nom du destinataire ici"
                    style={styles.input}
            />
            <TextInput
                    type="text"
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Entrez le message ici"
                    style={styles.input}
            />
            <TextInput
                    type="text"
                    value={produit}
                    onChangeText={setProductName}
                    placeholder="Entrez le nom du produit ici"
                    style={styles.input}
            />
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container :{
        flex: 1,
        backgroundColor: '#FFFFFF', 
        flexDirection: 'row',
    },
    input: {
        alignSelf: 'flex-start',
        marginLeft:40,
        width: 295, 
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#EF09F7', 
        borderRadius: 10,
    },
})
export default Amis;