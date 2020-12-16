import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {itemTurma} from '../../components/itemTurma/itemTurma';
import { url } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const Item = ({descricao, idCurso}) => (
  <View style={styles.item}>
    <Text style={styles.titleT}>Turma/Semestre</Text>
    <Text style={styles.title}>{descricao}  </Text>
    <Text style={styles.titleT}>Curso</Text>
    <Text style={styles.title}>{idCurso}</Text>
  </View>
);


  const Turma = () => {
    const [turma, setTurmas] = useState([]);

    useEffect(() => {
        listarTurmas();
    },[])

    const listarTurmas = () => {
        fetch(`${url}/Turma`)
        .then(response => response.json())
        .then(dados => {
            setTurmas(dados.data);
            console.log(dados.data);
          
        })
        .catch(err => console.error(err));
      }
  
    const renderItem = ({ item }) => (   
        <Item
         descricao={item.descricao} 
         idCurso={item.curso.titulo} />
    );  

      return(
          <View  style={styles.container} >
            <ScrollView>
            <Text style={styles.titulo}>Turmas</Text>
           <FlatList 
                data={turma}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
            </ScrollView>
          </View>
      )
  }
 
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 20,
      backgroundColor: "gray",
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 11,
    },
    title: {
      fontSize: 15,
      padding: 10,
      color: "white",
      fontWeight:"bold",
      display: "flex"
    },
    titulo: {
      fontSize: 50,
      alignItems: "center",
      marginVertical: 8,
      color: "purple",
      fontWeight:"bold",
      padding: 15,
      display: "flex",
    },
    titleT: {
      fontSize: 15,
      padding: 10,
      color: "black",
      fontWeight:"bold",
      display: "flex"
    },
  });

  export default Turma;

  