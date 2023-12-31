import { View, Text, Image, StyleSheet, ScrollView, Pressable, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addFav } from '../../Redux/Slice/FoodSlice'

const Details = () => {

  const navigation = useNavigation();

  const route = useRoute();
  const dispatch = useDispatch();
  const foodData = useSelector(state => state.food.data);
  const favData = useSelector(state => state.food.favorites);


  const [isIngredients, setIsIngredients] = useState(true);
  const [isMethod, setIsMethod] = useState(true);
  const [isAdded, setIsAdd] = useState(false);
  const [isAlreadyFav, setIsALreadyFav] = useState(false);
  

  const { itemID } = route.params;

  const final = foodData.find(data => data.recipe.uri === itemID);

  const ingrdientsHandle = () => {
    setIsIngredients(true);
    setIsMethod(false);
  }


  const methodHandle = () => {
    setIsIngredients(false);
    setIsMethod(true);
  }

  const addedHandle = () =>{

      setIsAdd(true);
      dispatch(addFav(final.recipe))
      setIsALreadyFav(true)

  }
  
  const ViewFav = () =>{
    setIsALreadyFav(true);
    navigation.navigate('Favorites');
  }

  // ...............................................................................
  const InstructionView = () => {
    return (
      <View style={{ flex: 1, marginBottom:20 }} >
        {
          isIngredients? (final.recipe.ingredientLines.map((ingredient, index) => (
            <>
            <View key={index} style={styles.ingredientContainer} >
              <Text style={styles.ingredientText} >{ingredient}</Text>
            </View>
            </>
          ))) : (
            final.recipe.ingredients.map((ingredient, foodId) => (
              <>
                <View key={foodId} style={styles.ingredientContainer}>
                  <Text style={styles.ingredientText}> {` ${ingredient.quantity} ${ingredient.measure} ${ingredient.food}`}</Text>
                </View>
              </>
            ))
          )
        }
      </View>
    )
  }

  // console.log(final.recipe);

  return (
    <View style={{ flex: 1, backgroundColor: '#f7e9c1' }} >

      <View style={styles.ImageView} >

        <View style={styles.HeadingView} >
          <Text style={styles.HeadingText} >{final.recipe.label}</Text>
        </View>


        <View style={styles.imageStylePro} >
          <ImageBackground style={styles.imageStyle}  source={{ uri: final.recipe.image }} >
            <View style={{ width:80, height:80, borderRadius:100, backgroundColor:'orange', alignItems:'center', margin:1, elevation:2, borderColor:'#000', borderWidth:1 }} >
              <Text style={{color:'#fff', fontSize:14 , fontWeight:'bold',textAlign:'center', borderRadius:100,paddingVertical:30 }} >{final.recipe.mealType}</Text>
            </View>
          </ImageBackground>
        </View>

      </View>

      <View style={styles.instruction} >

        <View style={styles.instructionHeading} >

          <Pressable style={styles.instructionTextView} onPress={() => ingrdientsHandle()} >
            <Text style={styles.instructionText}>INSTRUCTIONS</Text>
          </Pressable>

          <Pressable style={styles.instructionTextView} onPress={() => methodHandle()} >
            <Text style={styles.instructionText}>INGREDIENTS</Text>
          </Pressable>
        </View>

        <ScrollView style={styles.instructionContent} >
          {
            isIngredients ? <InstructionView text={final.recipe.ingredientLines} /> : isMethod ? <InstructionView text={final.recipe.ingredients} /> : !isIngredients
          }
        </ScrollView>
        <View>
          <View style={{ backgroundColor:'#735709', width:70, marginBottom:-29, marginLeft:10 ,justifyContent:'center', alignItems:'center' ,height:70, borderRadius:50, borderBottomLeftRadius:19 }} >
            <Text style={{color:'#fff', textAlign:'center', paddingHorizontal:1, fontSize:12, fontWeight:'bold', marginBottom:5 }} >{final.recipe.dishType}</Text>
          </View>

          {
            isAdded? (
              <Pressable onPress={()=>ViewFav() } style={{backgroundColor:'orange',  borderWidth:1, borderColor:'#735709',justifyContent:'flex-end', alignItems:'center', marginBottom:10, padding:10, borderBottomLeftRadius:20 ,borderTopRightRadius:20, borderBottomRightRadius:20 ,marginHorizontal:10}} >
                <Text style={{color:'#fff', fontWeight:'bold', fontSize:14 }} >View Favorites</Text>
              </Pressable>
            ):(
              <Pressable onPress={()=>addedHandle() } style={{backgroundColor:'orange',  borderWidth:1, borderColor:'#735709',justifyContent:'flex-end', alignItems:'center', marginBottom:10, padding:10, borderBottomLeftRadius:20 ,borderTopRightRadius:20, borderBottomRightRadius:20 ,marginHorizontal:10}} >
                <Text style={{color:'#fff', fontWeight:'bold', fontSize:14 }} >Add to Favourite</Text>
              </Pressable>
            )
          }

        </View>
      </View>


    </View>
  )
}


const styles = StyleSheet.create({
  ImageView: {
    flex: 1,
    padding: 10,
    marginHorizontal: 2
  },
  imageStyle: {
    width: 'auto',
    height:'auto',
    marginTop:5,
    marginLeft:5,
    marginRight:5,

    backgroundColor: '#000',
    flex: 3,
    padding: 2,

    borderTopRightRadius:10,
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5
  },
  imageStylePro: {
    flex: 4,
    borderTopWidth:2,
    borderRightWidth:2,
    borderLeftWidth:2,
    borderTopRightRadius:10,
    borderColor:'#735709'
  },
  HeadingText: {
    color: '#735709',
    fontSize: 22,
    marginBottom: 5,
    textAlign: 'center', 
    fontFamily:'MontserratAlternates-Bold'
  },
  HeadingView: {
    justifyContent:'flex-end',
    marginBottom:5,
  },
  underImageView: {
  },
  instruction: {
    flex: 1,
    marginHorizontal: 5
  },
  instructionHeading: {
    flexDirection: 'row',
    backgroundColor: '#e6ca7e',
    justifyContent: 'space-between',
    elevation: 2,
  },
  instructionText: {
    color: '#000',
    fontSize: 18,
    fontFamily:'JosefinSans-Bold',
    textAlign: 'center',
    
  },
  instructionTextView: {
    padding: 10,
    borderWidth: 1,
    flex: 1,
    borderColor: '#735709',
    // marginLeft:5
  },
  instructionContent: {
    backgroundColor: '#faf4e3',
    marginBottom:5
  },
  ingredientContainer: {
    marginTop: 10,
    marginBottom: 5,
    flex:4
  },
  ingredientText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 5,
    fontFamily:'QuickSand-Regular'
  },
})
export default Details