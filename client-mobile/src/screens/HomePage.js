import { StyleSheet, FlatList, Text, ScrollView, View, TouchableOpacity, ImageBackground, Image } from "react-native";

import CardPaymank from "../components/CardPaymank";
import SearchBar from "../components/SearchBar";
import CardPopular from "../components/CardPopular";
import CardProduct from "../components/CardProduct";

const assetMamank = [
  { name: "Car Wash", title: "Mank Wash", image: "https://i.ibb.co/vkGXsc9/CarWash.jpg", price: "850.000", id: 1 },
  { name: "Engine Wash", title: "Mank Engine", image: "https://i.ibb.co/PYHJT0t/engine-Wash.jpg", price: "500.000", id: 2 },
  { name: "Interior Wash", title: "Mank Interior", image: "https://i.ibb.co/qJMVsqS/interior-Wash.jpg", price: "450.000", id: 3 },
  { name: "Eksterior Wash", title: "Mank Eksterior", image: "https://i.ibb.co/t3tRWTm/eksterior-Wash.jpg", price: "350.000", id: 4 },
  { name: "Window Wash", title: "Mank Window", image: "https://i.ibb.co/Bzb23q4/window-Wash.jpg", price: "235.000", id: 5 },
  { name: "Velg Wash", title: "Mank Velg", image: "https://i.ibb.co/372wDvq/VelgWash.jpg", price: "185.000", id: 6 },
];

export default function Homepage() {
  return (
    <ScrollView>
      <View style={styles.container}>
          <View style={styles.header} />
        <CardPaymank />

        <View style={{ marginHorizontal: "6%", marginTop:35, marginBottom:5}}>
          <Text style={styles.TitleText}> Discover</Text>
          <Text style={styles.TitleText2}> a new wash</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <SearchBar />
        </View>

        <View style={{ marginHorizontal: "8%", marginTop:45}}>
          <Text style={styles.TitleTextDiv}>Popular</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          {/* component popular */}
          <FlatList horizontal style={{ marginLeft: "6%" }} data={assetMamank} renderItem={({ item }) => <CardPopular mamank={item} />} keyExtractor={(item) => item.id} />
        </View>
        <View style={{ marginHorizontal: "8%", marginTop:15}}>
          <Text style={styles.TitleTextDiv}>Product</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          {/* component Our Product */}
          <FlatList horizontal style={{ marginLeft: "6%" }} data={assetMamank} renderItem={({ item }) => <CardProduct mamank={item} />} keyExtractor={(item) => item.id} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    backgroundColor: "#003B6A",
    height: 75,
    width:'100%',
    marginBottom:20,
  },
  TitleText: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#003B6A",
  },
  TitleText2: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#003B6A",
    marginTop: -20,
  },
  TitleTextDiv: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003B6A",
    // marginTop: -20,
  },
});
