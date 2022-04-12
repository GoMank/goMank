import { StyleSheet, Text, View, Image } from "react-native";

export default function LogPage() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={{justifyContent:'center'}}>
          <Image source={require("../../assets/LogoGomank.png")} style={styles.Image} />
        </View>
        <View style={{justifyContent:'center'}}>
          <Text style={styles.title}>Booking Status CANCEL</Text>
          <Text style={styles.subTitle}>No: 2019100007</Text>
          <Text style={styles.description}>Your booking status no. 2019100007 has been canceled</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    
  },
  card: {
    flexDirection: "row",
    // justifyContent: "space-between",
    padding: 20,
    margin: 5,
    backgroundColor: "white",
    width: "94%",
    height: 135,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0386EE",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#929292",
  },
  description: {
    fontSize: 14,
    marginTop: 10,
    color: "#929292",
    width: "70%",
    // backgroundColor:'black'
  },
  Image: {
    height: 100,
    width: 55,
    marginRight: 20,
    resizeMode: "contain",
  },
});
