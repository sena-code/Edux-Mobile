import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {itemTurma} from '../../components/itemTurma/itemTurma';
import { url } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Item = ({descricao, idCurso}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{descricao}  -  {idCurso}</Text>
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
         idCurso={item.idCurso} />
    );  

      return(
          <View  style={styles.container} >
            <Text style={styles.titulo}>Turmas</Text>
           <FlatList 
                data={turma}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
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
      backgroundColor: "green",
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 11,
    },
    title: {
      fontSize: 30,
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
    }
  });

  export default Turma;

  