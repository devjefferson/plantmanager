import React from "react";
import { Text, Dimensions ,Image, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import watering from "../assets/watering.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";



import { Feather } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/core";

export function Welcome() {
  const navigation = useNavigation()

  function handleStart(){
    navigation.navigate("UserIdentification")
  }
  return (
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.title}>
        Gerencie {"\n"} suas plantas de {"\n"}forma fácil
      </Text>

      <Image 
        source={watering} 
        style={styles.image} 
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
        sempre que precisar.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleStart}>
      <Feather name="chevron-right"  style={styles.buttonText} />
    
  </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //marginTop: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    color: colors.heading,
    marginTop: 34,
    fontFamily: fonts.heading,
    lineHeight: 38,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text
  },
  image: {
    height: Dimensions.get('window').width * 0.7,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
    //marginTop: 40,
  },
  buttonText: {
    color: colors.white,
    fontSize: 28,
  },
});
