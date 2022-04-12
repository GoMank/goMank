import { StyleSheet, Text, View, Pressable, ImageBackground } from "react-native";

export default function Login({navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/bannerLogin.jpg")} style={styles.backgroundImage}>
        <View style={styles.frontText}>
          
          <Text style={styles.text}>Hello Welcome To KEELINK</Text>
          <Text style={styles.sideText}>Watch your favorite movie just from home without going outside</Text>
          
          <Pressable style={styles.button} onPress={() => navigation.navigate("AppNavigator")}>
            <Text style={styles.textButton}>Next</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  mainButton: {
    // width: "100%",
    backgroundColor: "red",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
    justifyContent: "center",
  },
  frontText: {
    padding: 25,
    backgroundColor: "transparent",
    // alignItems: 'center',
    position: "absolute",
    bottom: "1%",
    // left: "5%",
  },
  text: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#FF0000",
    marginBottom: 10,
    
  },
  sideText: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: "white",
    paddingBottom: "10%",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgb(170, 0, 0)',
    borderRadius:25
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

  
});
