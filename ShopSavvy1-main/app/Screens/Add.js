import React ,{useState ,useEffect} from 'react';
import {StyleSheet, Image,TouchableOpacity,ScrollView,TextInput,Text ,View} from 'react-native';
import { doc, addDoc ,collection} from "firebase/firestore"; 
import { db } from '../../config/firebase';
import { BarCodeScanner } from 'expo-barcode-scanner';
function Add({navigation}) {
    const [ID, setID] = useState('');
    const [productName, setProductName] = useState(''); 
    const [country, setCountry]= useState('');
    const [price, setPrice] = useState('');
    const [constituants, setConstituants] = useState('');
    const [image,setImage]=useState('');
    const [error, setError] = useState('');
    const [scannedData, setScannedData] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [showScanner, setShowScanner] = useState(false);

    
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    useEffect(() => {
        if (scannedData) {
            setID(scannedData);
        }
    }, [scannedData]);
    const handleBarCodeScanned = ({ type, data }) => {
        setScannedData(data);
    };
    const handleAddProduct = async () => {
        let isError = false;
        if (!productName || !country || !price || !constituants) {
            setError("Please fill in all fields.");
            isError = true;
        } else if (!scannedData) {
            setError("Please scan the barcode.");
            isError = true;
        }else{
            try {

                await addDoc(collection(db, "Requests"), {
                    ID: scannedData,
                    Nom: productName,
                    Pays: country,
                    Prix: price,
                    Constituants: constituants,
                    Image: image,
                } , { id: scannedData });
                
                setProductName('');
                setCountry('');
                setPrice('');
                setConstituants('');
                setID('');
                setImage('');
                setScannedData(null);
                setShowScanner(false);
            } catch (error) {
                console.error("Error adding document: ", error);
                setError("An error occurred while adding the product.");
            }
        }
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titre}>Add Procuct</Text>
            <TouchableOpacity onPress={() => setShowScanner(true)}>
                 <Image source={require('../assets/shopping.png')} style={styles.add} />
            </TouchableOpacity>
            <TextInput
                    type="text"
                    value={scannedData || ID}
                    onChangeText={setID}
                    placeholder="Entrez le ID du produit ici"
                    style={styles.input}
            />
            <TextInput
                    type="text"
                    value={productName}
                    onChangeText={setProductName}
                    placeholder="Entrez le nom du produit ici"
                    style={styles.input}
            />
            <TextInput
                    type="text"
                    value={country}
                    onChangeText={setCountry}
                    placeholder="Entrez le pays ici"
                    style={styles.input}
            />
            <TextInput
                    type="text"
                    value={price}
                    onChangeText={setPrice}
                    placeholder="Entrez le prix ici"
                    style={styles.input}
            />
            <TextInput
                    type="text"
                    value={constituants}
                    onChangeText={setConstituants}
                    placeholder="Entrez les constituants ici"
                    style={styles.input}
            />  
             <TextInput
                    type="text"
                    value={image}
                    onChangeText={setImage}
                    placeholder="Entrer lien d'Image"
                    style={styles.input}
            />  
            {
                error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null}
                <TouchableOpacity style={styles.Button} onPress={handleAddProduct}>
                    <Text style={styles.ButtonText}>Add Product</Text>
                </TouchableOpacity>
                {showScanner && hasPermission && (
                <View style={styles.barcodebox}>
                    <BarCodeScanner
                     onBarCodeScanned={handleBarCodeScanned}
                     style={{height: 530 ,width: 530}}
                    />
                </View>
                )}
        </ScrollView>  
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFFFF', 
    },
    add:{
        alignSelf: 'flex-start',
        margintop:50,
        marginLeft:96,
        width:170,
        height:170,
        resizeMode: 'contain',
    },
    input: {
        alignSelf: 'flex-start',
        marginLeft:40,
        width: 295, 
        padding: 10,
        marginTop: 4,
        marginBottom: 4,
        borderWidth: 1,
        borderColor: '#EF09F7', 
        borderRadius: 10,
    },
    titre:{
       fontSize:24,
       fontWeight:'bold',
       marginTop:30,
       marginLeft:112,
       marginBottom: 20,
    },
    Button:{
       marginLeft:96,
       width:180,
       height:40,
       backgroundColor:'#00ff00',
       borderRadius:30,
    },
    ButtonText:{
        color: '#FFFFFF', // Couleur du texte
        fontWeight: 'bold',
        fontSize:20,
        marginLeft:34,
        marginTop:4,
    },
    errorText:{
        fontSize:20,
        color:'red',
        marginLeft:91,
        marginTop:7,
    },
    barcodebox:{
        position:'absolute',
        top:76,
        left:88,
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width:200,
        overflow: 'hidden',
        borderRadius:30,
        backgroundColor:'tomato',
    }
})
export default Add;