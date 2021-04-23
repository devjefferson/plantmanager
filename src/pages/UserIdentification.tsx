import React, { useEffect, useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import {Button} from '../components/Button'
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function UserIdentification(){
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [name, setName] = useState<string>()

  const navigation = useNavigation()

  async function handleSubmit(){

    if(!name){
      Alert.alert('Me diz como chamar você 😕')
      return
    }

    await AsyncStorage.setItem('@plantmaneger:user', name)
  
    
    navigation.navigate("Confirmation",{
      
        title: 'Prontinho',
        subtitle:  'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect'
      
    })
  }

  function handleInputBlur(){
    setIsFocused(false)
    setIsFilled(!!name)

  }
  function handleInputFocus(){
    setIsFilled(true)
  }
  function handleInputChange(value: string){
    setIsFilled(!!value)
    setName(value)
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.emoji}>
            {
              !isFilled? "😃" : "😄"
            }
          </Text>

          <Text style={styles.title}>
            Como podemos {'\n'}chamar você?
          </Text>
          <TextInput 
            style={[
              styles.input,
              (isFocused || isFilled) && { borderColor: colors.green}
            ]}
            placeholder="Digite um nome"
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onChangeText={handleInputChange}
          />
          <View style={styles.footer}>
            <Button 
              onPress={handleSubmit}
              title='Confirmar'
            />
          </View>
        </View>
        
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content:{
    flex: 1,
    width: "100%",
  },
  form:{
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 54,
    alignItems: "center"
  },
  emoji:{
    fontSize: 44
  },
  title:{
    textAlign: "center",
    fontSize: 24,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 32,
    marginTop: 20
  },
  input:{
    borderBottomWidth: 1,
    borderColor: colors.gray,
    width: "100%",
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: "center"
  },
  footer:{
    marginTop: 40,
    width: "90%"
  }
})