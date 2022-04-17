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

import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

export function Example() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}