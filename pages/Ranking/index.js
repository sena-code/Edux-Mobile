import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {url} from '../../utils/constants';

const Ranking = () => {

    const [nota , setNota] = useState([])

    const PegarNotas =() => {
        
        fetch(`${url}/ObjetivoAluno`)
        .then(response => response.json())
        .then(dados => {
            setNota(dados);
        })

    }

    useEffect(() => 
    {PegarNotas()}, )
    

    const renderItem = () => {
        return (
            <View>
                <Text> notas={nota.item.Nota}</Text>
            </View>
        )
    }   
    return (
        <View style={styles.container} >
            <Text>Ranking</Text>
            <FlatList 
                data={nota}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
})
export default Ranking;