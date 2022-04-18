// // App.js
// import React, { useState } from "react";
// import { StyleSheet, View, Text, Button, Platform } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";

// const App = () => {

//   const [isPickerShow, setIsPickerShow] = useState(false);
//   const [isPickerShowTime, setIsPickerShowTime] = useState(false);
//   const [date, setDate] = useState(new Date(Date.now()));
//   const [time, setTime] = useState(new Date(Date.now()));

// //   console.log("ini time", new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"}).slice(0, -3));

//   const datePlus = new Date(Date.now());
//   datePlus.setDate(datePlus.getDate() + 7);
//   const showPicker = () => {setIsPickerShow(true)};

//   const onChange = (event, value) => {
//     setDate(value);
//     if (Platform.OS === "android") {setIsPickerShow(false)}};

//   const showPickerTime = () => {setIsPickerShowTime(true)};
//   const onChangeTime = (event, value) => {
//     setTime(value);
//     if (Platform.OS === "android") {setIsPickerShowTime(false)}};

//   return (
//     <View style={styles.container}>
//       {/* Display the selected date */}
//       <View style={styles.pickedDateContainer}>
//         <Text style={styles.pickedDate}>{date.toUTCString().split(" ").slice(1, 4).join(" ")}</Text>
//       </View>

//       {/* The button that used to trigger the date picker */}
//       {!isPickerShow && (
//         <View style={styles.btnContainer}>
//           <Button title="Show Picker" color="purple" onPress={showPicker} />
//         </View>
//       )}

//       {/* The date picker */}
//       {isPickerShow && 
//       <DateTimePicker 
//         value={date} 
//         mode={"date"} 
//         display={Platform.OS === "ios" ? "spinner" : "default"} 
//         is24Hour={true} 
//         onChange={onChange} 
//         minimumDate={new Date(Date.now())} 
//         maximumDate={new Date(datePlus)} 
//         style={styles.datePicker} 
//     />}



//      {/* Display the selected time */}
//      <View style={styles.pickedDateContainer}>
//         <Text style={styles.pickedDate}>{time.toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"}).slice(0, -3)}</Text>
//       </View>

//       {/* The button that used to trigger the time picker */}
//       {!isPickerShowTime && (
//         <View style={styles.btnContainer}>
//           <Button title="ini waktu" color="blue" onPress={showPickerTime} />
//         </View>
//       )}

//       {/* The time picker */}
//       {isPickerShowTime && 
//       <DateTimePicker 
//         value={time} 
//         mode={"time"} 
//         display={Platform.OS === "ios" ? "spinner" : "default"} 
//         is24Hour={true} 
//         onChange={onChangeTime} 
//         style={styles.datePicker} 
//     />}

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     flex: 1,
//     justifyContent: "center",
//     padding: 50,
//   },
//   pickedDateContainer: {
//     padding: 20,
//     backgroundColor: "#eee",
//     borderRadius: 10,
//   },
//   pickedDate: {
//     fontSize: 18,
//     color: "black",
//   },
//   btnContainer: {
//     padding: 30,
//   },
//   // This only works on iOS
//   datePicker: {
//     width: 320,
//     height: 260,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start",
//   },
// });

// export default App;

// import React, { useState, useCallback, useEffect } from 'react'
// import { GiftedChat } from 'react-native-gifted-chat'

// export function SandboxTest() {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: 'Hello developer',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//     ])
//   }, [])

//   const onSend = useCallback((messages = []) => {
//     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
//   }, [])

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={messages => onSend(messages)}
//       user={{
//         _id: 1,
//       }}
//     />
//   )
// }


// import * as React from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
// import Animated from 'react-native-reanimated';
// import BottomSheet from 'reanimated-bottom-sheet';

// export default function App() {
//   const renderContent = () => (
//     <View
//       style={{
//         backgroundColor: 'white',
//         padding: 16,
//         height: 450,
//       }}
//     >
//       <Text>Swipe down to close</Text>
//     </View>
//   );

//   const sheetRef = React.useRef(null);

//   return (
//     <>
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: 'papayawhip',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <Button
//           title="Open Bottom Sheet"
//           onPress={() => sheetRef.current.snapTo(0)}
//         />
//       </View>
//       <BottomSheet
//         ref={sheetRef}
//         snapPoints={[450, 300, 0]}
//         borderRadius={10}
//         renderContent={renderContent}
//       />
//     </>
//   );
// }

// import React, { useRef } from "react";
// import { View, Button, Text } from "react-native";
// import RBSheet from "react-native-raw-bottom-sheet";
 
// export default function Example() {
//   const refRBSheet = useRef();
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "flex-end",
//         // alignItems: "center",
//         backgroundColor: "#000"
//       }}
//     >
//       <Button title="Find Customer" onPress={() => refRBSheet.current.open()} />
//       <RBSheet
//         ref={refRBSheet}
//         closeOnDragDown={true}
//         closeOnPressMask={true}
//         openDuration={500}
//         containerHeight={100}
//         customStyles={{
//           wrapper: {
//             backgroundColor: "transparent"
//           },
//           draggableIcon: {
//             backgroundColor: "#000"
//           }
//         }}
//       >
//         <View><Text>hey</Text></View>
//       </RBSheet>
//     </View>
//   );
// }


// import { StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground, Image, Platform , Button} from "react-native";
// import * as Location from "expo-location";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import React, { useState, useEffect, useRef } from "react";
// import { Marker } from "react-native-maps";

// // import React, { useRef } from "react";
// // import { View, Button, Text } from "react-native";
// import RBSheet from "react-native-raw-bottom-sheet";

// export default function Maps() {
//   const refRBSheet = useRef();

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

//       let location = await Location.getCurrentPositionAsync({});
//       let address = await Location.reverseGeocodeAsync({
//         latitude: -6.2547686,
//         longitude: 106.8654622,
//       });
//       setAddress(address);
//       setLocation(location);
//     })();
//   }, []);

//   let text = "Waiting..";
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     // text = JSON.stringify(location);
//     text = location;
//   }

//   console.log(address);

//   const car = [
//     { latitude: -6.254782, longitude: 106.86587, latitudeDelta: 0.01, longitudeDelta: 0.01 },
//     { latitude: -6.254558, longitude: 106.864834, latitudeDelta: 0.01, longitudeDelta: 0.01 },
//     { latitude: -6.255126, longitude: 106.865199, latitudeDelta: 0.01, longitudeDelta: 0.01 },
//   ];

//   const tokyoRegion = {
//     latitude: -6.254782,
//     longitude: 106.86587,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   };


//   if (text === "Waiting..") {
//     return (
//       <View style={styles.container}>
//         <Text>tunggu</Text>
//       </View>
//     );
//   } else {
      
//   const currentLocation = {
//     latitude: text.coords.latitude,
//     longitude: text.coords.longitude,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   };
//     return (
//           <View style={styles.container}>
//           <View style={styles.container}>
//           <MapView
//             style={styles.maps}
//             showsUserLocation
//             initialRegion={currentLocation} //your region data goes here.
//           >
      
//             {car.map((item, index) => (
//                 <Marker coordinate={item} key={index} >
//                 <Image source={require("../../assets/card-dummy.png")} style={{ width: 50, height: 50, resizeMode: "contain" }} />
//               </Marker>
//             ))}
//           </MapView>
//         </View>
//       <Button title="Find Customer" onPress={() => refRBSheet.current.open()} />
//       <RBSheet
//         ref={refRBSheet}
//         closeOnDragDown={true}
//         closeOnPressMask={true}
//         openDuration={500}
//         height={400}
        
//         customStyles={{
//           wrapper: {
//             backgroundColor: "transparent"
//           },
//           draggableIcon: {
//             backgroundColor: "#000"
//           }
//         }}
//       >
//         <View><Text>hey</Text></View>
      
      

//             {/*Make sure the Marker component is a child of MapView. Otherwise it won't render*/}
//             {/* <Marker coordinate={{ latitude: -6.254558, longitude: 106.864834 }} />
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
//         </RBSheet>
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
