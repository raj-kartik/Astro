import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { removeFav } from '../../Redux/Slice/FoodSlice';

const AddFav = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favData = useSelector((state) => state.food.favorites);
1

  // console.log({favData});

  const renderItem = ({item}) =>{

    return (
      <Pressable onPress={()=> navigation.navigate('Recipe', { itemID: item.uri } ) } style={styles.FavContainer} >

        <View style={{flex:2}} >
          <Text style={styles.LabelText} >{item.label}</Text>
          <Text style={styles.dishText} >({item.dishType})</Text>
        </View>

        <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
          <Image resizeMode='cover' style={styles.imageStyle} source={{uri:item.image }} />
        </View>

        <Pressable onPress={()=>dispatch(removeFav(item.uri))} style={{justifyContent:'center'}} >
          <Icon name='remove' size={20} color='#fff' />
        </Pressable>
      </Pressable>
    )
  } 

  // console.log(favData);
  return (
    <View style={{flex:1, backgroundColor:'#f7e9c1'}} >
      <FlatList
        keyExtractor={favData.uri}
        data={favData}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  FavContainer:{
    marginVertical:5,
    flex:1,
    backgroundColor:'#735709',
    marginHorizontal:5,
    paddingHorizontal:5,
    paddingVertical:10,
    borderRadius:10,
    flexDirection:'row',
    justifyContent:'space-between',
    elevation:5
  },
  LabelText:{
    fontSize:20,
    color:'#fff',
    fontFamily:'Cinzel-Bold'
  },
  dishText:{
    fontFamily:'QuickSand-Bold',
    color:'#fff',
    fontSize:16,
    marginLeft:5
  },
  imageStyle:{
    width:70,
    height:70,
    borderRadius:50,
    borderWidth:2,
    borderColor:'orange'
  }
})

export default AddFav