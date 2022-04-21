// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   TouchableOpacity,
//   ImageBackground,
//   Image,
//   Platform,
// } from "react-native";
// import * as Location from "expo-location";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import React, { useState, useEffect } from "react";
// import { Marker } from "react-native-maps";
// import { useMutation } from "@apollo/client";
// import { GET_NEAREST_MAMANG } from "../../config/queries";

// export default function Maps() {
//   const [
//     nearestMamang,
//     { data: mamangLoc, loading: mamangLoading, error: mamangtError },
//   ] = useMutation(GET_NEAREST_MAMANG);

//   const [address, setAddress] = useState([]);
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         return;
//       }

//       let currentLocation = await Location.getCurrentPositionAsync({});
//       let currentAddress = await Location.reverseGeocodeAsync({
//         latitude: currentLocation.coords.longitude,
//         longitude: currentLocation.coords.latitude,
//       });
//       setAddress(currentAddress);
//       setLocation(currentLocation);

//       // if(currentLocation){
//       //   setAddress(currentAddress);
//       //   setLocation(currentLocation);
//       //   console.log(currentLocation, '??????????????');
//       //   nearestMamang({
//       //     variables: {
//       //       location: [
//       //         currentLocation.coords.longitude,
//       //         currentLocation.coords.latitude,
//       //       ],
//       //     },
//       //   });
//       // }
//     })();
//   }, []);

//   let text = "Waiting..";
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     // text = JSON.stringify(location);
//     text = location;
//   }
//   if(mamangLoc){

//     console.log(mamangLoc, "<<<<<<<<<<<<<");
//   }

//   console.log(address);

//   const car = [
//     {
//       latitude: -6.254782,
//       longitude: 106.86587,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     },
//     {
//       latitude: -6.254558,
//       longitude: 106.864834,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     },
//     {
//       latitude: -6.255126,
//       longitude: 106.865199,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     },
//   ];

//   const tokyoRegion = {
//     latitude: -6.254782,
//     longitude: 106.86587,
//     latitudeDelta: 0.005,
//     longitudeDelta: 0.005,
//   };

//   if (text === "Waiting..") {
//     return (
//       <View style={styles.container}>
//         <Text>tunggu</Text>
//       </View>
//     );
//   } else {
//     const currentLocation = {
//       latitude: text.coords.latitude,
//       longitude: text.coords.longitude,
//       latitudeDelta: 0.005,
//       longitudeDelta: 0.005,
//     };
//     return (
//       <View style={styles.container}>
//         <View style={styles.container}>
//           <MapView
//             style={styles.maps}
//             showsUserLocation
//             initialRegion={currentLocation} //your region data goes here.
//           >
//             {car.map((item, index) => (
//               <Marker coordinate={item} key={index}>
//                 <Image
//                   source={require("../../assets/card-dummy.png")}
//                   style={{ width: 50, height: 50, resizeMode: "contain" }}
//                 />
//               </Marker>
//             ))}
//           </MapView>
//         </View>

//         {/*Make sure the Marker component is a child of MapView. Otherwise it won't render*/}
//         {/* <Marker coordinate={{ latitude: -6.254558, longitude: 106.864834 }} />
//       <Marker coordinate={{ latitude: -6.255126, longitude: 106.865199 }} /> */}

//         {/* <MapView
//           style={styles.maps}
//           showsUserLocation
//           initialRegion={{
//             latitude: text.coords.latitude,
//             longitude: text.coords.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//         </MapView> */}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   maps: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//   },
// });

import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ImageBackground,
    Image,
    Platform,
} from 'react-native';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { Marker } from 'react-native-maps';
import { useMutation, useQuery } from '@apollo/client';
import { GET_NEAREST_MAMANG, GET_MAMANG_LOC } from '../../config/queries';
import axios from 'axios';
export default function Maps() {
    const [address, setAddress] = useState([]);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [nearestMamang, { data: mamangLoc, loading: mamangLoading, error: mamangtError }] =
        useMutation(GET_NEAREST_MAMANG);
    // const [arrived, setArrived] = useState(false);
    // const {
    //     data: mamangPollLoc,
    //     loading: mamangPollLoading,
    //     stopPolling,
    //     startPolling,
    // } = useQuery(GET_MAMANG_LOC, {});

    // useEffect(() => {
    //     if (mamangPollLoc) {
    //         console.log(mamangPollLoc);
    //     }
    // }, [mamangPollLoc]);

    // useEffect(() => {
    //     // versionRefetch()
    //     if (!arrived) {
    //         startPolling(4000);
    //     } else {
    //         stopPolling();
    //     }
    //     return () => {
    //         stopPolling();
    //     };
    // }, [stopPolling, startPolling, arrived]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            let currentAddress = await Location.reverseGeocodeAsync({
                latitude: -6.2547686,
                longitude: 106.8654622,
            });
            if (currentLocation) {
                setAddress(currentAddress);
                setLocation(currentLocation);
                nearestMamang({
                    variables: {
                        location: [
                            currentLocation.coords.longitude,
                            currentLocation.coords.latitude,
                        ],
                    },
                });
            }
        })();

        return () => {};
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = location;
    }

    //nearest mamang
    let nearest = [];
    if (mamangLoc) {
        mamangLoc.nearestMamang.forEach((e) => {
            nearest.push({
                latitude: e.address.coordinates[1],
                longitude: e.address.coordinates[0],
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        });
    }

    if (text === 'Waiting..') {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                }}>
                <Text>tunggu</Text>
                <Image source={require('../../assets/loadingLogo.gif')} style={styles.logo} />
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
                    <MapView
                        style={styles.maps}
                        showsUserLocation
                        initialRegion={currentLocation} //your region data goes here.
                    >
                        {nearest.length > 0 &&
                            nearest.map((item, index) => (
                                <Marker coordinate={item} key={index}>
                                    <Image
                                        source={require('../../assets/card-dummy.png')}
                                        style={{
                                            width: 50,
                                            height: 50,
                                            resizeMode: 'contain',
                                        }}
                                    />
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
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: 'white',
    },
    maps: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    containerLogo: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 230,
        resizeMode: 'contain',
        marginBottom: '20%',
    },
});
