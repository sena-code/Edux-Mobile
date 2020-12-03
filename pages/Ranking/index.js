import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {url} from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Ranking = () => {

    const [nota , setNota] = useState([])

    const PegarNotas =() => {
        
        fetch(`${url}/ObjetivoAluno`
           
        )
        .then(response => response.json())
        .then(dados => {
            setNota(dados.data);
        })

    }

    useEffect(() => {
        PegarNotas();
    }, [])
    
    const Item = (notas) => {
        const {nota} = notas;
        return (
            <View style={styles.item} >
               
        <View >
        <Text style={{fontWeight:"bold", flex: 20, color : "white"}}>{nota}</Text>
        </View>
      
    
    </View>
   
        )
    }

    const renderItem = ({item}) => {
        return (
            <Item nota={item.nota}/>
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
        backgroundColor: "#000",
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
    }
})
export default Ranking;