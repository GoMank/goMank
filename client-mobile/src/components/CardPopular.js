import { StyleSheet, Text, ScrollView, View, TouchableOpacity, ImageBackground, Image } from "react-native";

export default function CardPopular(mamank) {
  return (
    <View style={styles.cardPopular} key={mamank.mamank.id}>
    <Image source={{ uri: mamank.mamank.image }} style={styles.imagePopular} />
    <Text style={styles.textPopular}>{mamank.mamank.title}</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  cardPopular: {
    backgroundColor: "#fff",
    // width: "85%",
    padding: 5,
    alignItems: "center",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
    borderRadius: 25,
    flexDirection: "row",
    margin: 5,
  },
  imagePopular: {
    width: 45,
    height: 45,
    resizeMode: "contain",
    borderRadius: 45,
  },
  textPopular: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
});
