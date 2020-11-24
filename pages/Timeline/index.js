import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, KeyboardAvoidingView, Platform, View, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { url } from '../../utils/constants';

import ItemPost from '../../components/itemPost/itemPost'


import AsyncStorage from '@react-native-async-storage/async-storage';

const TimeLine = ({navigation}) => {

    const [id, setId] = useState(0);
    const [idUsuario, setIdUsuario] = useState('');
    const [usuario, setUsuario] = useState([]);
    const [urlImagem, setUrlImagem] = useState('');
    const [post, setPost] = useState([]);
    const [texto, setTexto] = useState('');
    const [Imagem, setImagem] = useState('');
  
    
   
  
   

    useEffect(() => {
      listarPost();
      listarUsuario();
  }, [])

   const listarUsuario = () => {
      fetch(`${url}/Usuario`)
      .then(response => response.json())
      .then(dados => {
          setUsuario(dados);
          
          limparCampo();
      })
      .catch(err => console.error(err));
    }


    const listarPost = () => {
      fetch(`${url}/Post`, {
          headers : {
              'authorization' : 'Bearer ' + AsyncStorage.getItem('@jwt')
          }
      })
      .then(response => response.json())
      .then(dados => {
          setPost(dados.data);
          console.log(dados.data);

      })
      .catch(err => console.error(err));
    }
    const GetItem = async () => {
        {
            try {
                const usuario = await AsyncStorage.getItem('@jwt');
                if(value !== null) {
                    return "Token sem valor";
                }

            }
            catch (e) {
                // error reading value
            }
        }
    }

    const salvar = (event) => {
        event.preventDefault();
        
        
        let usuario = GetItem();
      
      
        const posts = {
            texto : texto,
            idUsuario : usuario.idUsuario,
            urlImagem : urlImagem
        }

        
        let method = (id === 0 ? 'POST' : 'PUT');
        let urlRequest = (id === 0 ? `${url}/Post` :  `${url}/Post/${id}`);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(posts), 
            headers : {
                'content-type' : 'application/json',
                'authorization' : 'Bearer ' + AsyncStorage.getItem('@jwt')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Post salvo');
            console.log(dados)
          
       
         
            listarPost();
        })
        .catch(err => console.error(err))
    }


    const uploadFile = (event) => {
        event.preventDefault()

        console.log(event);
        //crio o formulário para envio do arquivo
        let formdata = new FormData();
        formdata.append('arquivo', event.target.files[0]);
        
        fetch(`${url}/Upload`,
        {
            method : 'POST',
            body : formdata,
            headers : {
                'authorization' : 'Bearer ' + AsyncStorage.getItem('@jwt')
            }
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            setUrlImagem(data.url);
        })
        .catch(err => console.error(err))
    }
    const limparCampo = () => {
        setId(0);
        setTexto('');
        setIdUsuario('');
        setUrlImagem('');
    }

    const renderItem = (post) => {
        return (
            <ItemPost
                nome={post.item.nome} 
                texto={post.item.texto}
                imagem={post.item.urlImagem}
               />
        )
    }   
    return (
        <View>
            <Text>TIMELINE</Text>
             <FlatList 
                data={post}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    )

}

export default TimeLine;