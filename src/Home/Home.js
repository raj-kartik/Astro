import { View, Text, StyleSheet, FlatList, Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Search from '../Search/Search'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addData } from '../../Redux/Slice/FoodSlice'

const Home = () => {

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const foodData = useSelector((state) => state.food.data);
    const [searchTerm, setSearchTerm] = useState("")
    const [currentData, setCurrentData] = useState([])


    // console.log(foodData);

    const keyExtractor = (item) => item.recipe.uri;

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
      setCurrentData(foodData)   
      
    }, [foodData])
    

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.edamam.com/api/recipes/v2?type=public&app_id=b57fdc35&app_key=%200d219feec0c2ea1063d4694ae22282de%09&health=vegetarian&cuisineType=Indian');
            const json = await response.json();

            dispatch(addData(json.hits));

        } catch (error) {
            console.error(error);
        }
    };

    const filterData = () => {
        const searchData=foodData.filter(item =>
            item.recipe.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCurrentData(searchData)
      };

      useEffect(() => {        
      
       filterData()
      }, [searchTerm])
      

    const contentHandle = (item) => {
        // console.log(item.image);
        navigation.navigate('Recipe', { itemID: item.uri });
    }

    // console.log(foodData.hits.recipe.uri);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.PressableView}   >

                <View style={{ flex: 2, alignItems: 'center', margin: 2, alignItems: 'center' }} >
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 2 }} >
                        <Image style={styles.renderImage} source={{ uri: item.recipe.image }} />
                    </View>

                    <View style={{ flex: 1 }} >
                        <Text style={styles.labelText} >{item.recipe.label.split(' ').slice(0, 5).join(' ')}..</Text>

                    </View>
                </View >

                <View style={{ flex: 1, flexDirection:'row', justifyContent:'center', alignItems:'center', margin:5 }} >
                    <TouchableOpacity onPress={() => contentHandle(item.recipe)} style={styles.TouchableButtonView} >
                        <Text style={{fontSize:16, color:'#fff', fontWeight:'bold'}} > View Recipe </Text>
                    </TouchableOpacity>
                </View>

            </View>)
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f7edd2' }} >
            <View style={styles.searchView} >
                <Search searchText={searchTerm} setSearchText={setSearchTerm} />
            </View>

            {/* suggestion */}
            <View style={styles.contentView} >
                <View style={{ flex: 1 }} >
                    <FlatList
                        numColumns={2}
                        data={currentData}
                        keyExtractor={keyExtractor}  // Replace 'id' with the actual unique identifier of each item
                        renderItem={renderItem}
                    />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    searchView: {
        flex: 1,
        marginTop: 15,
        marginHorizontal: 5,
        borderRadius: 10
    },
    contentView: {
        flex: 9,
        backgroundColor: '#dbca9a',
        marginHorizontal: 2,
        borderTopRightRadius: 15,
        marginTop: 2,
        borderTopLeftRadius: 10
    },
    metricText: {
        color: '#000',
        fontSize: 13,
    },
    TouchableButtonView: {
        flex: 2, 
        justifyContent: 'center', 
        flexDirection: 'row', 
        backgroundColor: 'orange', 
        margin: 5, 
        borderRadius: 5, 
        padding: 5, 
        alignItems: 'center', 
        flexDirection: 'column'
    },
    favButtonView:{
        width: '100%', 
        height: '100%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    renderImage:{
        width: 120, 
        height: 120, 
        backgroundColor: '#fff', 
        borderRadius: 70, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderWidth: 2, 
        borderColor: 'orange'
    },
    PressableView:{
        flex: 1, 
        marginHorizontal: 5, 
        marginVertical: 10, 
        backgroundColor: '#f7e9c1', 
        elevation: 2, 
        borderRadius: 10
    },
    labelText:{
        color: '#000', 
        fontWeight: 'bold', 
        fontSize: 16, 
        textAlign: 'center' 
    }
})

export default Home