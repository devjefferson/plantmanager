import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Header } from "../components/Header";
import { Load } from "../components/Load";
import { PlantCardSegundary } from "../components/PlantCardSecundary";
import { loadPlant, PlantProps, removePlant, StoragePlantProps } from "../libs/storage";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import waterdrop from "./../assets/waterdrop.png";

// import { Container } from './styles';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>();
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState<string>();

  useEffect(() => {

    
    async function loadStorageData() {
      /*const dados =  await AsyncStorage.removeItem('@plantmaneger:plant')
      console.log(dados)*/
      const plantsStoraged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        {
          locale: pt,
        }
      );

      setNextWaterd(
        `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime} horas`
      );

      setMyPlants(plantsStoraged);
      setLoading(false);
    }
    loadStorageData();
  }, []);

  function handleRemove(plant: PlantProps) {
    Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
      {
        text: "Não 🙏",
        style: "cancel",
      },
      {
        text: "Sim 😰",
        onPress: async function () {
          try {
           
            await removePlant(plant.id)

            setMyPlants((oldData) =>
              oldData?.filter((item) => item.id !== plant.id)
            );
          } catch (error) {

            Alert.alert('Não foi possivel Remover! 😰')
          }
        },
      },
    ]);
  }

  if (loading) {
    return <Load />;
  }
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image style={styles.spotlightImage} source={waterdrop} />
        <Text style={styles.spotlightText}>{nextWaterd}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Proximas Regadas</Text>

        <FlatList
          keyExtractor={(item) => String(item.id)}
          data={myPlants}
          renderItem={({ item }) => (
            <PlantCardSegundary
              handleRemove={() => handleRemove(item)}
              data={item}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    height: 110,
  },
  spotlightText: {
    flex: 1,
    paddingHorizontal: 20,
    fontFamily: fonts.text,
    textAlign: "justify",
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
  flatlist: {
    fontSize: 20,
    fontFamily: fonts.text,
  },
});
