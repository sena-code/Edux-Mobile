
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Button } from 'react-native';
import { url } from '../../utils/constants';
const Ranking = () => {

    const [notas, setNotas] = useState([])
    const [nts, setNts] = useState([])
    const [notao, setNotao] = useState([])

    useEffect(() => {
        PegarNotas();
        Ordenar();
    }, [])


    const PegarNotas = () => {

        fetch(`${url}/ObjetivoAluno`,
            {
                headers: {
                    'content-type': 'application/json',
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
        console.log(notas.map(p => p.nota)[1])

        nts.sort(function (b, a) {

            return a - b;

        });
        

        console.log(nts);
        // console.log(notas[1].nota);


        // for (let i = 0; i < 10; i ++) {
            
        //     let avaliar = notas.map(p => p.nota)[i]
        //     console.log(i)
        //     if (nts[0] === avaliar) {
        //         setNotao(notas[i])
        //         console.log(i)
        //         console.log('if 10')
        //     }
        //     if (nts[1] === avaliar) {
        //         setNotao(notas[i])
        //         console.log('if funfo 9')
        //     }
        //     if (nts[2] === avaliar) {
        //         setNotao(notas[i])
        //         console.log('if funfo 8')
        //     }

        // }

        // console.log(notao)
        // console.log(notas.map(p => p.nota)[1])
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
        backgroundColor: "#000",
        alignItems: 'center',
        justifyContent: 'center',
    },

    circulo: {
        height: 70,
        width: 70,
        borderRadius: 70,
        backgroundColor: '#fff',
        color: '#000',
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