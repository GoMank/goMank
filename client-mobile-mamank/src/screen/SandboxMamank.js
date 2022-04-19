import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Platform,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import React, { useState, useEffect, useRef } from "react";
import { Marker } from "react-native-maps";
import { LogBox } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Chat from "../components/Chat";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'

export default function Maps() {
    const navigation = useNavigation();
  LogBox.ignoreLogs(["Remote debugger"]);
  const [address, setAddress] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const refRBSheet = useRef();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync({
        latitude: -6.2547686,
        longitude: 106.8654622,
      });
      setAddress(address);
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    // text = JSON.stringify(location);
    text = location;
  }

  console.log(address);

  const car = [
    // {
    //   latitude: -6.254782,
    //   longitude: 106.86587,
    //   latitudeDelta: 0.01,
    //   longitudeDelta: 0.01,
    // },
    {
      latitude: -6.254558,
      longitude: 106.864834,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    // {
    //   latitude: -6.255126,
    //   longitude: 106.865199,
    //   latitudeDelta: 0.01,
    //   longitudeDelta: 0.01,
    // },
  ];

  const tokyoRegion = {
    latitude: -6.254782,
    longitude: 106.86587,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  if (text === "Waiting..") {
    return (
      <View style={styles.container}>
        <Text>tunggu</Text>
      </View>
    );
  } else {
    const currentLocation = {
      latitude: text.coords.latitude,
      longitude: text.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {/* <Image source={require("../../assets/card-dummy.png")} style={{ width: 50, height: 50, resizeMode: "contain" }} /> */}
          <MapView
            style={styles.maps}
            showsUserLocation
            initialRegion={currentLocation} //your region data goes here.
          >
            {car.map((item, index) => (
              <Marker coordinate={item} key={index}></Marker>
            ))}
          </MapView>

          <View style={{ alignItems: "flex-start" }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                //   width:'25%',
                padding: 10,
                bottom: 2,
              }}
            >
              <TouchableOpacity
                // onPress={() => refRBSheet.current.open()}
                onPress={()=>navigation.navigate('Chat')}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  //   height:50,
                  marginBottom: 10,
                  marginLeft: 10,
                  backgroundColor: "#003B6A",
                  justifyContent: "center",
                  alignItems: "center",
                  //   width:'95%',
                  elevation: 5,
                  borderRadius: 10,
                }}
              >
                <Entypo name="chat" size={32} color="white" />
                {/* <Text style={{color:'white', fontWeight:'bold', fontSize:16}}>Orders</Text> */}
              </TouchableOpacity>
            </View>
          </View>
          <RBSheet
            ref={refRBSheet}
            height={300}
            animationType="slide"
            closeOnDragDown={true}
            closeOnPressMask={true}
            // openDuration={250}
            customStyles={{
              wrapper: {
                backgroundColor: "transparent",
                // borderRadius:50
              },
              draggableIcon: {
                backgroundColor: "#000",
              },
            }}
          >
            <View style={{ flex: 1, alignItems: "center", width:"100%" }}>
              <Chat  />
            </View>
          </RBSheet>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  containerImage: {
    flex: 2,
    alignItems: "center",
    // backgroundColor: "darkorange"
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  cardUser: {
    backgroundColor: "black",
    flexDirection: "row",
    padding: 10,
    width: "90%",
    borderRadius: 10,
    elevation: 5,
  },
  containerButton: {
    // backgroundColor:'black',
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonUser: {
    backgroundColor: "#FFB300",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  containerText: {
    flex: 4,
    justifyContent: "center",
    marginLeft: 10,
    // backgroundColor: "green"
  },
  textNama: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  textService: {
    fontSize: 14,
    color: "white",
  },
});
