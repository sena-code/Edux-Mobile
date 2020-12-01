import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Button } from 'react-native';
import { url } from '../../utils/constants';
const Ranking = () => {

    const [notas, setNotas] = useState([])
    const [nts, setNts] = useState([])
    const [notao, setNotao] = useState([])


    const PegarNotas = () => {

        fetch(`${url}/ObjetivoAluno`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setNotas(data.data);
                console.log(notas);
            })
            .catch(err => console.error(err))

    }


    const Ordenar = () => {
        // notas.sort(compararNumeros)
        // console.log(notas)

        // function compararNumeros(a, b) {
        //     return a - b;
        // }
        //============================

        setNts(notas.map(p => p.nota))

        nts.sort(function (b, a) {

            return a - b;

        });
        console.log(nts);

        let zero = nts[0];
        // let um = nts[1];
        let dois = nts[2];


        console.log(zero)
        console.log(dois)

        for (let x = 0; x < notas.length; x++) 
        {
            if (zero === notas.map(p => p.nota)[x]) {
                setNotao(notas[x])
                alert('if funfo 10')
            }
           
        }
        console.log(notao)

        for (let x = 0; x < notas.length; x++) 
        {
            if (nts[1] === notas.map(p => p.nota)[x]) {
                setNotao(notas[x])
                alert('if funfo 9')
            }
           
        }
        console.log(notao)

        for (let x = 0; x < notas.length; x++) 
        {
            if (dois === notas.map(p => p.nota)[x]) {
                setNotao(notas[x])
                alert('if funfo 8')
            }
           
        }
  
        console.log(notao)
    }



    const ObjetiAluno = ({ NotaAluno }) => {
        return (
            <View>
                <Text style={styles.circulo} > {NotaAluno} </Text>
            </View>
        );
    }

    return (
        <View style={styles.container} >
            <Text>Ranking</Text >
            <FlatList

                data={notas}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ObjetiAluno NotaAluno={item.nota} />}
            />
            <Button
                onPress={PegarNotas}
                title="Listar"
                color="#777"
                accessibilityLabel="Listar"
            />
            <Button
                onPress={Ordenar}
                title="Ordenar"
                color="#777"
                accessibilityLabel="Ordenar"
            />
        </View >
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
        height: 70,
        width: 70,
        borderRadius: 70,
        backgroundColor: '#000',
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
        paddingTop: 21,
        fontSize: 20,
    },
    text: {
        color: '#000',
    },

})
export default Ranking;