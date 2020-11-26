import React, { useState } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, Platform, View, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { url } from '../../utils/constants';
import JWT from 'expo-jwt';

import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const salvar = async (value) => {
        try {
            await AsyncStorage.setItem('@jwt', value)
        } catch (e) {
            // saving error
        }
    }

   
    const Logar = () => {

        const corpo = {
            email: email,
            senha: senha
        }

        fetch(`${url}/Login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(corpo)
        })
        .then(response => {
            //Verifia a resposta da api
            if(response.ok){
                return response.json();
            }

            //Caso não retorne Ok mostra um alert
            alert('Dados inválidos')
        })
            .then(data => {
                console.log(data);

                salvar(data.token)
         

            
                    
            if(data.status != 404){
                alert('Login efetuado com sucesso!')
                salvar(data.token)
                navigation.push('Aluno')
            }else{
                alert('Dados incorretos')
            }
               

               
            })
            .catch(err => console.error(err))

    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}
        >
            
                <View style={styles.container}>
                    <Image source={{uri : 'https://raw.githubusercontent.com/sena-code/Edux-react/main/src/assets/img/logo_branco_2-8.png'}} style={{width: 150, height : 80, marginBottom : 85}} />
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={text => setEmail(text)}
                        value={email}
                       
                       
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        onChangeText={text => setSenha(text)}
                        value={senha}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={Logar}
                    >
                        <Text style={styles.textButton}>Entrar</Text>
                    </TouchableOpacity>
                </View>
           
        </KeyboardAvoidingView>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoHeader: {
        color: 'white',
        margin: 10,
       
        marginBottom: 15,
        fontSize: 24
    },
    input: {
        width: 250,
        height: 40,
        color: '#000',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 20,
        padding: 5,
        paddingLeft: 10,
        borderRadius: 10,
      
    },
    button: {
        backgroundColor: 'white',
        width: 250,
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
      
        color: 'black'
    }

});