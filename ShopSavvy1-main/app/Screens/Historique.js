import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Text , Image} from 'react-native';

function Historique({ navigation }) {
    const [ongletActif, setOngletActif] = useState('Scanner');
    const [elementsScannes, setElementsScannes] = useState([]);
    

    return (
        <ScrollView style={styles.container}>
            <View style={styles.barreChoix}>
                <TouchableOpacity onPress={() => setOngletActif('Scanner')}>
                    <Text style={[styles.choix, ongletActif === 'Scanner' && styles.choixActif]}>Scanner</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOngletActif('Generer')}>
                    <Text style={[styles.choix, ongletActif === 'Generer' && styles.choixActif]}>Générer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOngletActif('Favoris')}>
                    <Text style={[styles.choix, ongletActif === 'Favoris' && styles.choixActif]}>Favoris</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 55,
    },
    barreChoix: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    choix: {
        fontSize: 18,
        color: '#050505',
    },
    choixActif: {
        fontWeight: 'bold',
        color: '#58F809',
    },
});

export default Historique;