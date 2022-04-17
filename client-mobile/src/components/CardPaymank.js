import { StyleSheet, Text, View } from "react-native";

export default function CardPaymank() {
  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.boxGomank}>
        <View style={styles.boxGomankIn}>
          <View>
            <Text style={{ color: "#003B6A", fontSize: 14, fontWeight: "bold" }}>PayMank</Text>
            <Text style={{ color: "#003B6A", fontSize: 16, fontWeight: "bold", marginBottom: 15 }}>Rp400.000</Text>
            <Text style={{ color: "#FFB300", fontSize: 12 }}>PayMank</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "55%" }}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.iconBoxGomank}></View>
            <Text style={{ color: "black", fontSize:12, fontWeight:'bold' }}>Pay</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={styles.iconBoxGomank}></View>
            <Text style={{ color: "black", fontSize:12, fontWeight:'bold' }}>Top Up</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={styles.iconBoxGomank}></View>
            <Text style={{ color: "black", fontSize:12, fontWeight:'bold' }}>Explore</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxGomank: {
    backgroundColor: "#003B6A",
    width: "85%",
    height: 120,
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
    width: "42%",
    height: "75%",
    marginLeft: "4%",
    borderRadius: 10,
    justifyContent: "center",
    padding: 20,
  },
  iconBoxGomank: {
    backgroundColor: "black",
    width: 30,
    height: 30,
  },
});
