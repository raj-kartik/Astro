import { View, Text, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';


const Search = (searchText, setSearchText) => {

 


  const handleSearchText = (text) =>{
    setSearchText(text);
  }


  return (
    <View style={{flex:1, marginBottom:10 }} >
        <View style={{borderColor:'#000',borderWidth:1,borderRadius:10, flexDirection:'row', marginBottom:10 ,alignItems:'center'}} >
            {/* icon */}
          <View style={{width:'100%', height:50, marginLeft:5, flexDirection:'row', alignItems:'center'}} >
            <Icon name='search1' size={22} color='#000'  />
            <TextInput placeholder='Search here..' value={searchText} onChangeText={(text)=>handleSearchText(text)} placeholderTextColor={'gray'} style={{color:'#000'}} />
          </View>

          <View>
         
          </View>

        </View>

        
    </View>
  )
}

export default Search