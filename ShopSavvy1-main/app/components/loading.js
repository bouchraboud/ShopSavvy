import React from 'react';
import {StyleSheet, View, Text, Image,ScrollView,ActivityIndicator} from 'react-native';
function Loading(props) {
    return (
            <ScrollView contentContainerStyle={styles.container}>
                <ActivityIndicator size="large" color='blue' />
            </ScrollView>
        );
    }
    const styles = StyleSheet.create({
        
    })
export default Loading;