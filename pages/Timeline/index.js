import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, KeyboardAvoidingView, Platform, View, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { url } from '../../utils/constants';

import {ItemPost} from '../../components/itemPost/itemPost'


import AsyncStorage from '@react-native-async-storage/async-storage';

const TimeLine = ({navigation}) => {

    const [id, setId] = useState(0);
    const [idUsuario, setIdUsuario] = useState('');
    const [usuario, setUsuario] = useState([]);
    const [urlImagem, setUrlImagem] = useState('');
    const [post, setPosts] = useState([]);
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
          console.log(dados);
          setUsuario(dados);
          
          limparCampo();
      })
      .catch(err => console.error(err));
    }


    const listarPost = () => {
      fetch(`${url}/Post`, {
          headers : {
              'authorization' : 'Bearer ' + AsyncStorage.getItem('token')
          }
      })
      .then(response => response.json())
      .then(dados => {
        console.log(dados.data);
          setPosts(dados.data);
          

      })
      .catch(err => console.error(err));
    }

    const salvar = (event) => {
        event.preventDefault();
        
        
     
        AsyncStorage.setItem('@jwt', data.token)
        const token = AsyncStorage.getItem('@jwt')

        let usuario = jwt_decode(token);
      
        const posts = {
            texto : textos,
            idUsuario : usuario.idUsuario,
            urlImagem : urlImagems
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

    const Item = (post) => {
        const {nome, textos, imagem} = post;
        return (
            <View style={styles.item} >
               
        <View >
        <Text style={{fontWeight:"bold", flex: 20, color : "white"}}>{nome}</Text>
        </View>
        <View>
        <Text style={{color: "white",  justifyContent:"center",alignItems:"center", paddingLeft: 40}}>{  textos}</Text>
        </View>
        <Image source={{uri:imagem}}  style={{width:300, height:300, borderRadius:30}} />
    
    </View>
   
        )
    }


        const renderItem = ({ item }) => (
            <Item nome={item.usuario.nome}  textos={item.texto} imagem={item.urlImagem} />
          );
      
    return (
        <View>
            <Text>TIMELINE</Text>
            <Image source={{uri:'https://raw.githubusercontent.com/sena-code/Edux-react/main/src/assets/img/logo_2.png'}} style={{width : 250, height: 250, alignItems : "center"}}/>
    <Text>{texto}</Text>
    
             <FlatList 
                data={post}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    )

}

export default TimeLine;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7F7F7',
      marginTop:60
    },
    item:{
        margin:10,
        padding:10,
        backgroundColor:"#000",
        width:"80%",
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        borderRadius:5
    }
  });