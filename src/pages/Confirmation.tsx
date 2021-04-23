import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";


interface Params {
  title: string
  subtitle: string
  buttonTitle: string
  icon: 'smile' | 'hug',
  nextScreen: string
}

  const emojis = {
    hug: '🤗',
    smile: '😃'
  }

export function Confirmation() {
  const navigation = useNavigation();
  const router = useRoute()


  const { 
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen

  } = router.params as Params

  function handleMoveOn() {
    navigation.navigate(nextScreen);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>

        <View style={styles.footer}>
          <Button title={buttonTitle} onPress={handleMoveOn}/>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  emoji: {
    fontSize: 78,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 38,
    marginTop: 25,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.text,
    paddingVertical: 10,
  },
  footer: {
    marginTop: 40,
    width: "100%",
    paddingHorizontal: 50,
  },
});
