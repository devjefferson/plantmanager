import React from 'react';
import { Text,  StyleSheet} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '../styles/colors';

import image from '../assets/image.jpg'
import fonts from '../styles/fonts';

interface EnviromentButtonsProps extends RectButtonProps{
  title: string,
  active?: boolean
}

export function EnviromentButtons({title, active = false, ...rest}:EnviromentButtonsProps ){
  return (
    <RectButton
      style={[
        styles.container,
        active && styles.containerActive
      
      ]}

      {...rest}
    >
      <Text style={[styles.text,
      
      active && styles.textActive]}>{title}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.shape,
    borderRadius: 12,
    height: 40,
    width: 76,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5
  },
  containerActive:{
    backgroundColor: colors.green_light
  },
  text:{
    color: colors.heading,
    fontFamily: fonts.text
  },
  textActive:{
    color: colors.green,
    fontFamily: fonts.heading,
  }
})