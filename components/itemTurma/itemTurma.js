import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7F7F7',
      marginTop:60
    },
    listItem:{
      margin:10,
      padding:10,
      backgroundColor:"black",
      width:"80%",
      flex:1,
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:5
    }
  });

const itemTurma = (turma) => {
    const {descricao, curso} = turma;

    return (
        <View style={styles.listItem}>
            
            <View style={{alignItems:"center",flex:1}}>
                <Text style={{fontWeight:"bold"}}>{descricao}</Text>
                <Text style={{fontWeight:"bold"}}>{curso}</Text>
            </View>
        </View>
    )
}

export default itemTurma;