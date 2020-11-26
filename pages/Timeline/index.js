import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, KeyboardAvoidingView, Platform, View, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard , SafeAreaView, ScrollView} from 'react-native';
import { url } from '../../utils/constants';
import Constants from 'expo-constants';
import ImagePicker from 'expo-image-picker';
import jwt_decode from 'jwt-decode';

import AsyncStorage from '@react-native-async-storage/async-storage';

const TimeLine = ({navigation}) => {

    const [id, setId] = useState(0);
    const [idUsuario, setIdUsuario] = useState('');
    const [usuario, setUsuario] = useState([]);
    const [urlImagem, setUrlImagem] = useState('');
    const [post, setPosts] = useState([]);
    const [texto, setTexto] = useState('');
    const [Imagem, setImagem] = useState('');
  
    
    const salvarToken = async (value) => {
        try {
            await AsyncStorage.setItem('@jwt', value)
        } catch (e) {
            // saving error
        }
    }
  
const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@jwt')
      if(value !== null) {
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }
  
  
   

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
        
        
     
       
        const token = getData();

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

    async function imagePickerCall() {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
          if (status !== "granted") {
            alert("Nós precisamos dessa permissão.");
            return;
          }
        }
    
        const data = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All
        });
    
        if (data.cancelled) {
          return;
        }
    
        if (!data.uri) {
          return;
        }
    
        setUrlImagem(data);
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
        <Text style={{color: "white",  justifyContent:"center",alignItems:"center", paddingBottom: 25}}>{  textos}</Text>
        </View>
        <Image source={{uri:imagem}}  style={{width: 355, height: 410}} />
    
    </View>
   
        )
    }


        const renderItem = ({ item }) => (
            <Item nome={item.usuario.nome}  textos={item.texto} imagem={item.urlImagem} />
          );
      
    return (
        <View >
            
           

           <View style={styles.container}>
               
           <Image source={{uri:'https://raw.githubusercontent.com/sena-code/Edux-react/main/src/assets/img/logo_2.png'}} style={{width : 150, height: 65, marginTop : 68}}/>
           <TextInput
                        style={styles.input}
                        placeholder="Digite aqui"
                        onChangeText={text => setTexto(text)}
                        value={texto}
                       
                       
                    />

            <TouchableOpacity style={styles.button} onPress={imagePickerCall} onChange={event => uploadFile(event)}>
               <Text style={styles.buttonText}>Escolher imagem</Text>
                 </TouchableOpacity>
                


                    <TouchableOpacity
                        style={styles.button}
                        onPress={salvar}
                    >
                        <Text style={styles.textButton}>Postar</Text>
                    </TouchableOpacity>
          
                    </View>
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
      backgroundColor: '#f8f8f8',
      alignItems: 'center',
        justifyContent: 'center',
    },
    item:{
        margin:10,
        marginTop: 40,
        padding:8,
        
        backgroundColor:"#000",
        width:"100%",
      
        alignSelf:"center",
       
        borderRadius:5
    },
    input: {
        width: 355,
        height: 65,
        color: '#000',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 80,
        marginBottom: 80,
        padding: 5,
        paddingLeft: 10,
        borderRadius: 10,
      
    },
    button: {
        backgroundColor: 'red',
        width: 150,
        padding: 10,
        borderRadius: 10,
        marginBottom: 80,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
      
        color: 'white'
    }
  });