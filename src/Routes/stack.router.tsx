import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import colors from '../styles/colors'
import { Welcome } from '../pages/Welcome'
import { UserIdentification } from '../pages/UserIdentification'
import { Confirmation } from '../pages/Confirmation'
import { PlantSelect } from '../pages/PlantSelect'
import { PlantSave } from '../pages/PlantSave'
import { MyPlants } from '../pages/MyPlants'
import AuthRoutes from './tab.router'
import AsyncStorage from '@react-native-async-storage/async-storage'



const stackRoutes = createStackNavigator()

const AppRouter: React.FC = ()=> {
const [signed, setSigned] = useState(false)
  useEffect(()=>{
    signedLoad()
  },[])

  async function signedLoad(){
     const user =  await AsyncStorage.getItem('@plantmaneger:user')
     user && setSigned(true)
  }
 return (
  <stackRoutes.Navigator
  headerMode="none"
  screenOptions={{
    cardStyle:{
      backgroundColor: colors.white
    }
  }}
>

{
  signed ? (<></>) : (<>
    <stackRoutes.Screen name="Welcome" component={Welcome}/>
    <stackRoutes.Screen name="UserIdentification" component={UserIdentification}/>
  </>)
  

}
  
  <stackRoutes.Screen name="PlantSelect" component={AuthRoutes}/>
  <stackRoutes.Screen name="PlantSave" component={PlantSave}/>
  <stackRoutes.Screen name="MyPlants" component={AuthRoutes}/>
  <stackRoutes.Screen name="Confirmation" component={Confirmation}/>
</stackRoutes.Navigator>
 )
}

export default AppRouter