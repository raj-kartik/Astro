import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/Home/Home'
import Details from './src/Details/Details'
import AddFav from './Components/Colors/AddFav'
const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          
          screenOptions={{statusBarColor:'#dbc179', headerTitleStyle:{fontFamily:'Cinzel-SemiBold'} ,headerShadowVisible:true ,headerStyle:{
            backgroundColor:'#dbc179',
          }}}
        >
          <Stack.Screen
            options={{ 
              headerShadowVisible:true,
            }}
            name='Astro' component={Home} />
          <Stack.Screen name='Recipe'  component={Details} />
          <Stack.Screen name='Favorites' component={AddFav} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App