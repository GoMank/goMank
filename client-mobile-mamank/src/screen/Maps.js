import { StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground, Image, Platform } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import React, { useState, useEffect } from "react";
import { Marker } from "react-native-maps";

export default function Maps() {
  const [address, setAddress] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
    { latitude: -6.254782, longitude: 106.86587, latitudeDelta: 0.01, longitudeDelta: 0.01 },
    { latitude: -6.254558, longitude: 106.864834, latitudeDelta: 0.01, longitudeDelta: 0.01 },
    { latitude: -6.255126, longitude: 106.865199, latitudeDelta: 0.01, longitudeDelta: 0.01 },
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
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <MapView
            style={styles.maps}
            showsUserLocation
            initialRegion={currentLocation} //your region data goes here.
          >
      
            {car.map((item, index) => (
                <Marker coordinate={item} key={index} >
                <Image source={require("../../assets/card-dummy.png")} style={{ width: 50, height: 50, resizeMode: "contain" }} />
              </Marker>
            ))}
          </MapView>
        </View>

            {/*Make sure the Marker component is a child of MapView. Otherwise it won't render*/}
            {/* <Marker coordinate={{ latitude: -6.254558, longitude: 106.864834 }} />
      <Marker coordinate={{ latitude: -6.255126, longitude: 106.865199 }} /> */}

        {/* <MapView
          style={styles.maps}
          showsUserLocation
          initialRegion={{
            latitude: text.coords.latitude,
            longitude: text.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        </MapView> */}
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
});
