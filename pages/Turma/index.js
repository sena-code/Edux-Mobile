import React, {useState, useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';
import {ItemTurma} from '../../components/itemTurma/itemTurma';
import AsyncStorage from '@react-native-async-storage/async-storage';

  const Turma = ({navigation}) => {
    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        listarTurmas();
    },[])

    const listarTurmas = () => {
        fetch(`${url}/Turma`, {
            headers : {
                'authorization' : 'Bearer ' + AsyncStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(dados => {
          console.log(dados.data);
            setTurmas(dados.data);
        })
        .catch(err => console.error(err));
      }

    const renderItem = (turma) => {
        return (
            <ItemTurma 
                descricao={turma.item.descricao}  />
        )
    }   

      return(
          <View>
              <Text>Turmas</Text>

           <FlatList 
                data={turmas}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
          </View>
      )
  }

  export default Turma;