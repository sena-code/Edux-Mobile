import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { url } from '../../utils/constants';
import jwt_decode from 'jwt-decode';

import AsyncStorage from '@react-native-async-storage/async-storage';
const Ranking = () => {

    const [notas, setNotas] = useState([]);
    const [nts, setNts] = useState([]);
    const [notao, setNotao] = useState([]);
    const [token, setToken] = useState('');



    useEffect(() => {
        PegarNotas();
        Ordenar();
        getData();
    }, [])

      
    const salvarToken = async (value) => {
        try {

            await AsyncStorage.setItem('token-edux', value)
            
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('token-edux')
          if(value !== null) {
              setToken(value);
            }
          
        } catch(e) {
          // error reading value
        }
      }

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

        nts.sort(function (b, a) {

            return a - b;

        });
        

        console.log(nts);

        let fLen = notas.length;
        let nLen = nts.length;
        let e 

        for(e = 0; e < nLen; e++){

            for (let i = 0; i < fLen; i++) {
                
                let avaliar = notas.map(p => p.nota)[i];
                console.log('vavlor do i: '+i);
                console.log('vavlor do avaliar: '+avaliar);
                if (nts[e] === avaliar) {
                    console.log('valor nts: ' + nts[e])
                    notao.push(notas[i]);
                    console.log('if funfo');
                }
                
            }
            console.log('valor do e: '+ e)

        }


        console.log(notao)

    }



    const ObjetiAluno = (obje) => {
        const {NotaAluno, usuarioI} = obje;
       
       
        return (
            
            <View style={styles.circuloT}>
                <Text style={styles.circuloN} >{usuarioI}</Text>
                <Text style={styles.circulo} > {NotaAluno} </Text>
            </View>
                        
        );
        
                        }
       
     const renderItem = ({ item }) => (
      
     <ObjetiAluno NotaAluno={item.nota}  usuarioI={item.usuario.nome}  />
        
                          );

    
    return (
        
        
        <View style={styles.container} >
          
            <ScrollView>
       
             <FlatList
             
                data={notao} 
                keyExtractor={item => item.id}
                renderItem={ renderItem  }
            />

            <Button
                onPress={Ordenar}
                title="Ordenar"
                color="#777"
                accessibilityLabel="Ordenar"
            />
            </ScrollView>
        </View >
    )
    
                        
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 21,
        fontSize: 20,
       
    },
    text: {
        color: '#000',
    },
    circuloN: {
        height: 45,
        width: 180,
        borderRadius: 70,
        backgroundColor: 'purple',
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
        paddingTop: 21,
        fontSize: 20,
        fontWeight:"bold"
    },
    circuloT: {
        height: 200,
        width: 200,
        borderRadius: 200,
        backgroundColor: 'purple',
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 21,
        fontSize: 20,
        marginLeft: 55
    }




})
export default Ranking;