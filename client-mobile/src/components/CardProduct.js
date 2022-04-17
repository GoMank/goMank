import { StyleSheet,FlatList, Text, ScrollView, View, TouchableOpacity, ImageBackground, Image } from "react-native";
import { useNavigation } from '@react-navigation/native'

export default function CardProduct(mamank) {
  const navigation = useNavigation();
  return (
    <View style={styles.cardProduct} key={mamank.mamank.id}>
      <Image source={{ uri: mamank.mamank.image }} style={styles.imageProduct} />
      <Text style={styles.textProduct}>{mamank.mamank.name}</Text>
      <Text style={styles.textProductPrice}>Rp {mamank.mamank.price}</Text>
      <TouchableOpacity style={styles.buttonProduct} onPress={() => navigation.navigate("FormOrder",{mamank})}>
        <Text style={styles.textButtonProduct}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    cardProduct: {
        backgroundColor: "#fff",
        // width: "85%",
        padding: 10,
        // alignItems: "center",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 3,
        borderRadius: 10,
        // flexDirection: "row",
        margin: 5,
      },
      imageProduct: {
        width: 130,
        height: 130,
        resizeMode: "contain",
        borderRadius: 10,
      },
      textProduct: {
        marginLeft: 5,
        fontSize: 18,
        fontWeight: "bold",
      },
      textProductPrice: {
        marginLeft: 5,
        fontSize: 14,
        marginBottom:15
      },
      buttonProduct: {
        backgroundColor: "#003B6A",
        // width: "85%",
        padding: 10,
        // alignItems: "center",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 2,
        borderRadius: 10,
        // flexDirection: "row",
        marginVertical: 3,
      },
      textButtonProduct: {
        textAlign:'center',
        fontSize: 12,
        color:'white',
      },
})