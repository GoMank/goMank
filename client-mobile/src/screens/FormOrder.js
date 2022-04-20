import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { useState, useEffect, } from "react";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import DateTimePicker from "@react-native-community/datetimepicker";
import ModalOrder from "../components/ModalOrder";
// import { YellowBox } from 'react-native';
// YellowBox.ignoreWarnings(['Remote debugger']);
import { LogBox } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function FormOrder(mamank) {
  const navigation = useNavigation();
  LogBox.ignoreLogs(['Remote debugger']);
  const dataMamank = mamank.route.params.mamank.mamank;
  console.log(mamank.route.params.mamank.mamank, 1111111111111111);
  // buat maps
  const [address, setAddress] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [formAddress, setFormAddress] = useState(
    `Your Address or you can Automatically fill with press 'My Location'`
  );
  // buat dateTime picker
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [isPickerShowTime, setIsPickerShowTime] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [time, setTime] = useState(new Date(Date.now()));
  // buat modal
  const [modalVisible, setModalVisible] = useState(false);

  console.log(
    time.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
    })
    // .slice(0, -4), 222222222
  );
  // console.log(time);
  const datePlus = new Date(Date.now());
  datePlus.setDate(datePlus.getDate() + 7);

  const showPicker = () => {
    setIsPickerShow(true);
  };
  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  const showPickerTime = () => {
    setIsPickerShowTime(true);
  };
  const onChangeTime = (event, value) => {
    setTime(value);
    if (Platform.OS === "android") {
      setIsPickerShowTime(false);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync({
        latitude: +location.coords.latitude,
        longitude: +location.coords.longitude,
      });
      setAddress(address);
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = location;
  }

  function getAddress() {
    return setFormAddress(
      `Jl. ${address[0].street},\n${address[0].city}, ${address[0].district}\n${address[0].subregion} ${address[0].postalCode},\n${address[0].region},${address[0].country}`
    );
  }

  if (text === "Waiting..") {
    return (
      <View style={styles.container}>
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text>tunggu</Text>
        </View>
      </View>
    );
  } else {
    // console.log(address);
    const currentLocation = {
      latitude: text.coords.latitude,
      longitude: text.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View>
            <Image
              source={{ uri: dataMamank.image }}
              style={styles.imageProduct}
            />
          </View>

          <View style={{ flex: 5, alignItems: "center" }}>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textAreaForm}
                // underlineColorAndroid="transparent"
                placeholder={formAddress}
                // placeholderTextColor="grey"
                value={formAddress}
                onChangeText={(alamat) => setFormAddress(alamat)}
                numberOfLines={6}
                multiline={true}
              />
            </View>

            <TouchableOpacity
              style={styles.buttonLocation}
              onPress={getAddress}
            >
              <Text style={styles.textLocation}>My Location</Text>
            </TouchableOpacity>

            <View style={{ bottom: "12%" }}>
              {/* select date */}
              <View style={styles.cardDateTime}>
                {!isPickerShow && (
                  <TouchableOpacity
                    style={styles.buttonDate}
                    onPress={showPicker}
                  >
                    <Text style={styles.textButtonBook}>Select Date</Text>
                  </TouchableOpacity>
                )}
                {/* The date picker */}
                {isPickerShow && (
                  <DateTimePicker
                    value={date}
                    mode={"date"}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    is24Hour={true}
                    onChange={onChange}
                    minimumDate={new Date(Date.now())}
                    maximumDate={new Date(datePlus)}
                    style={styles.datePicker}
                  />
                )}
                <View style={styles.textDate}>
                  <Text style={styles.textDateInner}>
                    {date.toUTCString().split(" ").slice(1, 4).join(" ")}
                  </Text>
                </View>
              </View>
              {/* Display the selected time */}
              <View style={styles.cardDateTime}>
                {!isPickerShowTime && (
                  <TouchableOpacity
                    style={styles.buttonTime}
                    onPress={showPickerTime}
                  >
                    <Text style={styles.textButtonBook}>Select Time</Text>
                  </TouchableOpacity>
                )}
                {/* The time picker */}
                {isPickerShowTime && (
                  <DateTimePicker
                    value={time}
                    mode={"time"}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    is24Hour={true}
                    onChange={onChangeTime}
                    style={styles.datePicker}
                  />
                )}
                <View style={styles.textTime}>
                  <Text style={styles.textTimeInner}>
                    {time
                      .toLocaleTimeString("en-US", {
                        hour12: false,
                        hour: "numeric",
                        minute: "numeric",
                      })}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ flex: 2.2, alignItems: "center" }}>
            <View style={styles.maps}>
              <MapView
                style={styles.maps2}
                showsUserLocation
                initialRegion={currentLocation}
              />
            </View>
          </View>
          <View style={{ flex: 2.3, justifyContent: "space-evenly" }}>
            <View>
              <Text style={styles.textPrice2}>{dataMamank.name}</Text>
              <Text style={styles.textPrice}>Rp {dataMamank.price}</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.buttonBook}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.textButtonBook}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView2}>
            <View style={styles.modalView}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View >
                  <Text style={styles.textModalName}>Adul Fikri</Text>
                  <Text style={styles.textModalName}>085689651234</Text>
                </View>
                <View >
                  <Image style={styles.image} source={require('../../assets/LogoGomank.png')} />
                </View>
              </View>

              <Text style={styles.textModalJudul}>Price</Text>
              <Text style={styles.textModalIsi}>Rp {dataMamank.price}</Text>

            <View style={{flexDirection:'row'}}>
              
            <View style={{marginRight:"20%"}}>
              <Text style={styles.textModalJudul}>Date</Text>
              <Text style={styles.textModalIsi}>
                {date.toUTCString().split(" ").slice(1, 4).join(" ")}
              </Text>
            </View>
            <View>
              <Text style={styles.textModalJudul}>Time</Text>
              <Text style={styles.textModalIsi}>
                {time.toLocaleTimeString("en-US", {hour12: false, hour: "numeric", minute: "numeric",})}
              </Text>
              </View>
            </View>
              <Text style={styles.textModalJudul}>Address</Text>
              <Text style={styles.textModalIsi}>{ formAddress }</Text>
              
              <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:40}}>

              <Pressable
                style={[styles.buttonBack]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle2}>Back</Text>
              </Pressable>
              <Pressable
                style={styles.buttonCheckout}
                onPress={() => navigation.navigate("PaymentPage",{
                  clientId:`625584887e8eeed032147b55`,
                  mamangId:`62559dcfc9054d53a273fb14`,
                  service:+dataMamank.id,
                  price:+dataMamank.price,
                  email:"test@gmail.com",
                  date:date.toUTCString().split(" ").slice(1, 4).join(" "),
                  time:time.toLocaleTimeString("en-US", {hour12: false, hour: "numeric", minute: "numeric",}),
                })}
              >
                <Text style={styles.textStyle}>Checkout</Text>
              </Pressable>
              </View>

            </View>
          </View>
        </Modal>
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
    width: "85%",
    elevation: 5,
    padding: 1,
    // backgroundColor:'pink'
  },
  maps2: {
    flex: 1,
    borderRadius: 25,
  },
  textButtonBook: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  buttonBook: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#003B6A",
    borderRadius: 15,
    width: "85%",
  },

  cardDateTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 8,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 10,
    width: "85%",
  },

  buttonDate: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 4,
    elevation: 5,
    backgroundColor: "#FFB300",
    borderRadius: 10,
    width: "45%",
  },
  textDate: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 10,
    width: "55%",
  },
  textDateInner: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#003B6A",
  },

  buttonTime: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    // paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 5,
    backgroundColor: "#FFB300",
    borderRadius: 10,
    width: "60%",
  },
  textTime: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 10,
    width: "40%",
  },
  textTimeInner: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#003B6A",
  },

  textArea: {
    // width: "80%",
    height: 100,
    justifyContent: "flex-start",
    textAlignVertical: "top",
    padding: 5,
  },
  textAreaContainer: {
    width: "85%",
  },
  textAreaForm: {
    textAlignVertical: "top",
    marginVertical: 17,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    width: "100%",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#003B6A",
  },

  textLocation: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  buttonLocation: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    elevation: 5,
    backgroundColor: "#FFB300",
    borderRadius: 25,
    // position:'absolute',
    left: "25%",
    bottom: "20%",
  },

  textPrice: {
    color: "#003B6A",
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: "10%",
  },
  textPrice2: {
    color: "#003B6A",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: "10%",
    marginBottom:-5,
    marginTop:10
  },

  imageProduct: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    // borderRadius: 10,
    backgroundColor: "pink",
  },

  // pickedDateContainer: {
  //   padding: 15,
  //   backgroundColor: "#eee",
  //   borderRadius: 10,
  // },
  // pickedDate: {
  //   fontSize: 18,
  //   color: "black",
  // },

  // // This only works on iOS
  // datePicker: {
  //   width: 320,
  //   height: 260,
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "flex-start",
  // },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyle2: {
    color: "#FFB300",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    // textAlign: "center",
  },
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.8)",
  },

  textModalName: {
    fontSize: 22,
    color: "#003B6A",
    fontWeight: "bold",
  },
  textModalJudul: {
    fontSize: 14,
    color: "#FFB300",
    fontWeight: "bold",
    paddingTop: 15,
  },
  textModalIsi: {
    fontSize: 16,
    color: "#003B6A",
    // fontWeight: "bold",
  },
  buttonBack: {
    width: "47%",
    backgroundColor:"white",
    borderColor: "#FFB300",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    borderRadius: 10,
    borderWidth: 3,
    paddingVertical: 8,
  },
  buttonCheckout: {
    width: "47%",
    backgroundColor:"#FFB300",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    // backgroundColor: "pink",
    paddingTop: 5,
    width: 53,
    height: 53,
    resizeMode: 'contain',
  },
});
