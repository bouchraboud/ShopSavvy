import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, View, Alert, Linking } from 'react-native';
import Collapsible from 'react-native-collapsible';

const HelpSupport = ({ navigation }) => {
    const [isFaqCollapsed, setIsFaqCollapsed] = useState(true);
    const [isGuidesCollapsed, setIsGuidesCollapsed] = useState(true);
    const [isPrivacyPolicyCollapsed, setIsPrivacyPolicyCollapsed] = useState(true);
    const [isTermsOfServiceCollapsed, setIsTermsOfServiceCollapsed] = useState(true);

    const handleContactSupport = () => {
        Alert.alert(
            'Contact Support',
            'You can reach us at ShopSavvy@example.com or call us at +123456789.'
        );
    };

    const handleOpenCommunity = () => {
        Linking.openURL('https://example.com/community');
    };

    const handleFeedback = () => {
        Alert.alert(
            'Feedback',
            'We value your feedback! Please send us your suggestions and comments at ShopSavvyfeedback@example.com.'
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Help & Support</Text>
            
            <TouchableOpacity style={styles.option} onPress={() => setIsFaqCollapsed(!isFaqCollapsed)}>
                <Text style={styles.optionText}>FAQs</Text>
            </TouchableOpacity>
            <Collapsible collapsed={isFaqCollapsed}>
                <View style={styles.content}>
                    <Text style={styles.contentText}>Q1: How to use the app?</Text>
                    <Text style={styles.contentText}>A1: Open the app, scan a barcode, and view the product details.</Text>
                    <Text style={styles.contentText}>Q2: How to reset my password?</Text>
                    <Text style={styles.contentText}>A2: Go to the profile page, click on "Change Password".</Text>
                    {/* Add more FAQs here */}
                </View>
            </Collapsible>
            
            <TouchableOpacity style={styles.option} onPress={() => setIsGuidesCollapsed(!isGuidesCollapsed)}>
                <Text style={styles.optionText}>Guides & Tutorials</Text>
            </TouchableOpacity>
            <Collapsible collapsed={isGuidesCollapsed}>
                <View style={styles.content}>
                    <Text style={styles.contentText}>Guide 1: How to scan a product?</Text>
                    <Text style={styles.contentText}>1. Open the app.</Text>
                    <Text style={styles.contentText}>2. Click on the scan button.</Text>
                    <Text style={styles.contentText}>3. Align the barcode within the frame.</Text>
                    <Text style={styles.contentText}>4. View the product details.</Text>
                </View>
            </Collapsible>

            <TouchableOpacity style={styles.option} onPress={() => setIsPrivacyPolicyCollapsed(!isPrivacyPolicyCollapsed)}>
                <Text style={styles.optionText}>Privacy Policy</Text>
            </TouchableOpacity>
            <Collapsible collapsed={isPrivacyPolicyCollapsed}>
                <View style={styles.content}>
                    <Text style={styles.contentText}>
                       **Politique de Confidentialité**
                        
                        Dernière mise à jour : 04/06/2024
                        
                        Cette Politique de Confidentialité explique comment notre application collecte, utilise et divulgue vos informations lorsque vous utilisez nos services. En accédant ou en utilisant nos services, vous acceptez cette Politique de Confidentialité.
                        
                        **Collecte d'Informations**
                        
                        Nous pouvons collecter les types d'informations suivants :
                        - **Informations Personnelles :** Nom, adresse e-mail et toute autre information que vous fournissez lors de votre inscription ou de l'utilisation de nos services.
                        - **Informations d'Utilisation :** Détails sur vos interactions avec l'application, telles que les fonctionnalités que vous utilisez et le temps passé sur l'application.
                        - **Informations sur l'Appareil :** Informations sur l'appareil que vous utilisez pour accéder à l'application, y compris l'adresse IP, le type d'appareil et le système d'exploitation.
                        
                        **Utilisation des Informations**
                        
                        Nous utilisons les informations collectées pour :
                        - Fournir et maintenir nos services
                        - Améliorer, personnaliser et étendre nos services
                        - Communiquer avec vous, y compris pour le support client
                        - Vous envoyer des mises à jour et du matériel promotionnel
                        
                        **Partage des Informations**
                        
                        Nous ne partageons pas vos informations personnelles avec des tiers, sauf :
                        - Avec votre consentement
                        - Pour se conformer aux obligations légales
                        - Pour protéger et défendre nos droits et propriétés
                        
                        **Sécurité des Données**
                        
                        Nous utilisons des mesures raisonnables pour protéger vos informations contre tout accès non autorisé, altération ou destruction. Cependant, aucune méthode de transmission sur Internet ou méthode de stockage électronique n'est complètement sécurisée.
                        
                        **Vos Droits**
                        
                        Vous avez le droit d'accéder, de mettre à jour ou de supprimer vos informations personnelles. Si vous souhaitez exercer ces droits, veuillez nous contacter à ShopSavvy@example.com.
                        
                        **Modifications de cette Politique de Confidentialité**
                        
                        Nous pouvons mettre à jour notre Politique de Confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle Politique de Confidentialité sur cette page. Votre utilisation continue du service après les modifications constitue votre acceptation de la politique révisée.
                        
                        **Nous Contacter**
                        
                        Si vous avez des questions concernant cette Politique de Confidentialité, veuillez nous contacter à ShopSavvy@example.com.
                    </Text>
                </View>
            </Collapsible>
            <TouchableOpacity style={styles.option} onPress={() => setIsTermsOfServiceCollapsed(!isTermsOfServiceCollapsed)}>
                <Text style={styles.optionText}>Terms of Service</Text>
            </TouchableOpacity>
            <Collapsible collapsed={isTermsOfServiceCollapsed}>
                <View style={styles.content}>
                    <Text style={styles.contentText}>
                    **Conditions d'Utilisation**
                        
                        Dernière mise à jour : 04/06/2024
                        
                        Bienvenue sur notre application. Veuillez lire attentivement ces Conditions d'Utilisation avant d'utiliser nos services.
                        
                        **Acceptation des Conditions**
                        
                        En accédant ou en utilisant nos services, vous acceptez d'être lié par ces Conditions. Si vous n'acceptez pas ces Conditions, n'utilisez pas nos services.
                        
                        **Utilisation des Services**
                        
                        Vous acceptez d'utiliser nos services uniquement à des fins légales et conformément à ces Conditions. Vous êtes responsable de votre conduite et de tout contenu que vous soumettez ou partagez.
                        
                        **Comptes**
                        
                        Vous pouvez avoir besoin de créer un compte pour utiliser certaines fonctionnalités de nos services. Vous êtes responsable de maintenir la confidentialité de votre compte et de votre mot de passe et de toutes les activités qui se produisent sous votre compte.
                        
                        **Résiliation**
                        
                        Nous pouvons résilier ou suspendre votre compte et l'accès à nos services à tout moment, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris si vous violez ces Conditions.
                        
                        **Limitation de Responsabilité**
                        
                        Dans toute la mesure permise par la loi, nous ne sommes pas responsables des dommages indirects, accidentels, spéciaux, consécutifs ou punitifs résultant de ou en relation avec votre utilisation de nos services.
                        
                        **Modifications des Conditions**
                        
                        Nous pouvons mettre à jour ces Conditions de temps à autre. Nous vous informerons de tout changement en publiant les nouvelles Conditions sur cette page. Votre utilisation continue du service après les modifications constitue votre acceptation des Conditions révisées.
                        
                        **Nous Contacter**
                        
                        Si vous avez des questions concernant ces Conditions, veuillez nous contacter à ShopSavvy@example.com.
                    </Text>
                </View>
            </Collapsible>

            <TouchableOpacity style={styles.option} onPress={handleContactSupport}>
                <Text style={styles.optionText}>Contact Support</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.option} onPress={handleOpenCommunity}>
                <Text style={styles.optionText}>Community</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.option} onPress={handleFeedback}>
                <Text style={styles.optionText}>Feedback</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 22,
        marginLeft:105,
        color:'#19b604',
    },
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    optionText: {
        fontSize: 18,
    },
    content: {
        padding: 15,
        backgroundColor: '#f0f0f0',
    },
    contentText: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default HelpSupport;
