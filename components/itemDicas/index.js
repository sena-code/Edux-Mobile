import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity, Linking } from "react-native";


const Evento = (dica) => {

    const {texto, imagem, IdUsuario } = dica;

    return (
        <View style={styles.listItem}>
            <Image source={{uri : imagem}} 
                style={{width : 60, height:60, borderRadius : 30}} />
            <View style={{alignItems: 'center', flex : 1}}>
                <Text style={{fontWeight:'bold'}}>{texto}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex :1,
        backgroundColor : '#F7F7F7',
        marginTop : 60
    },
    listItem : {
        margin : 10,
        padding : 10,
        backgroundColor : '#FFF',
        width : '80%',
        flex : 1,
        alignSelf : 'center',
        flexDirection : 'row',
        borderRadius : 5
    }
});

export default Evento;