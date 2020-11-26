import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, KeyboardAvoidingView, Platform, View, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { url } from '../../utils/constants';
import ItemPost from '../../components/itemPost/itemPost'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dicas = ({navigation}) => {

    const [token, setToken] = useState('');

    const getToken = async () => {
        setToken(await AsyncStorage.getItem('@jwt'));
    }

    useEffect(()=>{
        getToken();
    }, [])


const [dicas, setDica] = useState([]);
    useEffect(() => {
      listarDica();
  }, [])


    const listarDica = () => {
      fetch(`${url}/Dicas`, {
          headers : {
              'authorization' : 'Bearer ' + AsyncStorage.getItem('@jwt')
          }
      })
      .then(response => response.json())
      .then(dados => {
          setDica(dados.data);
          console.log(dados.data);

      })
      .catch(err => console.error(err));
    }


    const renderItem = (dica) => {
        return (
            <ItemDicas
                texto={dica.item.texto}
                imagem={dica.item.urlImagem}
               />
        )
    }   
    return (
        <View>
            <Text>Dicas</Text>
             <FlatList 
                data={dicas}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    )

}

export default Dicas;