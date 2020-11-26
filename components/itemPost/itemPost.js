import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7F7F7',
      marginTop:60
    },
    listItem:{
      margin:10,
      padding:10,
      backgroundColor:"#FFF",
      width:"80%",
      flex:1,
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:5
    }
  });

const ItemPost = (post) => {
    const {nome, imagem, texto} = post;

    return (
        <View style={styles.listItem}>
            
            <View style={{alignItems:"center",flex:1}}>
                <Text style={{fontWeight:"bold"}}>{nome}</Text>
            </View>
            <View style={{alignItems:"center",flex:1}}>
                <Text style={{fontWeight:"bold"}}>{texto}</Text>
            </View>
            <Image source={{uri:imagem}}  style={{width:60, height:60,borderRadius:30}} />
           
        </View>
    )
}

export default ItemPost;