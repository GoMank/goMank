import { StyleSheet, Text, View, Image } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function CardPaymank() {
  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.boxGomank}>
        <View style={styles.boxGomankIn}>
          <View>
            <View style={{flexDirection:"row", alignItems:'flex-end'}}>
              <Image style={styles.image} source={require('../../assets/LogoGomank.png')} />
              <Text style={{ color: "#003B6A", fontSize: 16, fontWeight: "bold" }}>PayMank</Text>
            </View>
            <Text style={{ color: "#003B6A", fontSize: 18, fontWeight: "bold" }}>Rp400.000</Text>
            <Text style={{ color: "#FFB300", fontSize: 12 }}>See Details</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "55%" }}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.iconBoxGomank}>
              <MaterialCommunityIcons name="arrow-up-bold-box" size={28} color="white" />
            </View>
            <Text style={{ color: "black", fontSize:12, fontWeight:'bold', color:"white" }}>Pay</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={styles.iconBoxGomank}>
            <MaterialCommunityIcons name="plus-box" size={28} color="white" />
            </View>
            <Text style={{ color: "black", fontSize:12, fontWeight:'bold', color:"white" }}>Top Up</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={styles.iconBoxGomank}>
              <MaterialCommunityIcons name="compass" size={28} color="white" />
            </View>
            <Text style={{ color: "black", fontSize:12, fontWeight:'bold', color:"white" }}>Explore</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxGomank: {
    backgroundColor: "#003B6A",
    width: "92%",
    height: 100,
    alignItems: "center",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 10,
    flexDirection: "row",
  },
  boxGomankIn: {
    backgroundColor: "white",
    width: "38%",
    height: "73%",
    marginLeft: "4%",
    borderRadius: 10,
    justifyContent: "center",
    padding: 15,
  },
  iconBoxGomank: {
    // backgroundColor: "pink",
    justifyContent: "center",
    textAlign: "center",
    width: 30,
    height: 30,
  },
  image: {
    // backgroundColor: "pink",
    paddingTop: 5,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  }
});
