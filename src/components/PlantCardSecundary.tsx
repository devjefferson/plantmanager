import React from 'react';
import { Text, View,  StyleSheet} from 'react-native';

import { SvgFromUri} from 'react-native-svg'


import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import  Swipeable from 'react-native-gesture-handler/Swipeable';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Animated from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

interface PlantCardProps extends RectButtonProps{
  data:{
    name: string,
    photo: string,
    hour: string
  }
  handleRemove:() => void
}

export function PlantCardSegundary({data, handleRemove, ...rest}: PlantCardProps){
  
  
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={()=>(
        <Animated.View>
          <View>
            <RectButton 
              style={styles.buttonRemove}
              onPress={handleRemove}
            >
              <Feather
                name="trash"
                size={32}
                color={colors.white}
              />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
    <RectButton 
      style={styles.container} 
      {...rest}
    >
      <SvgFromUri 
        uri={data.photo}
        width={50}
        height={50}
      />
      
      <Text style={styles.title}>
        {data.name}
      </Text>
      <View style={styles.details}>
      <Text style={styles.timeLabel}>
          Regar às
        </Text>
        <Text style={styles.time}>
          {data.hour}
        </Text>
      </View>
    </RectButton>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    flexDirection: "row",
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 25,
    alignItems: "center",
    marginVertical: 5
    },
    title:{
      flex: 1,
      fontFamily: fonts.heading,
      marginVertical: 17
  },
  details:{
    alignItems: 'flex-end'
  },
  timeLabel:{
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light
  },
  time:{
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark
  },
  buttonRemove:{
    width: 100,
    height: 85,
    backgroundColor: colors.red,
    marginTop: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
    right: 20,
    paddingLeft: 15,

  }
})