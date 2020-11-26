import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { url } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Ranking = () => {

    const [nota, setNota] = useState([])

    const PegarNotas = () => {

        fetch(`${url}/ObjetivoAluno`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(dados => {
                setNota(dados);
            })

    }

    useEffect(() => { PegarNotas(), Ordenar() })

    const Ordenar = () => {
        nota.filter(a => {
            return
        })
    }

    const renderItem = () => {
        return (
            <View>
                <Text> notas={nota.item.Nota}</Text>
            </View>
        )
    }
    return (
        <View style={styles.container} >
            <Text>Ranking</Text>
            <FlatList
                style={styles.circulo,
                    backgroundColor = '#000'}
                data={nota}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circulo: {
        height: 30,
        width: 30,
        borderRadius: 30,
    },

})
export default Ranking;