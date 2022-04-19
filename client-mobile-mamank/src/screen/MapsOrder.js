import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ImageBackground,
    Image,
    Platform,
    Button
  } from "react-native";
  import { LinearGradient } from 'expo-linear-gradient';
  import * as Location from "expo-location";
  import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
  import React, { useState, useEffect, useRef  } from "react";
  import { Marker } from "react-native-maps";
  import { LogBox } from "react-native";
  import RBSheet from "react-native-raw-bottom-sheet";
  import { useNavigation } from '@react-navigation/native'
  
  export default function MapsOrder() {
  //   LogBox.ignoreLogs(["Remote debugger"]);
    const navigation = useNavigation();
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
      {
        latitude: -6.254782,
        longitude: 106.86587,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      {
        latitude: -6.254558,
        longitude: 106.864834,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      {
        latitude: -6.255126,
        longitude: 106.865199,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
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
              {/* <Image source={require("../../assets/card-dummy.png")} style={{ width: 50, height: 50, resizeMode: "contain" }} /> */}
            <MapView
              style={styles.maps}
              showsUserLocation
              initialRegion={currentLocation} //your region data goes here.
            >
              {car.map((item, index) => (
                  <Marker coordinate={item} key={index}>
                </Marker>
              ))}
            </MapView>
            
         <View style={{alignItems:'center'}}>  
          <View style={{
              justifyContent:'center',
              alignItems:'center',
              position:'absolute',
              width:'95%',
              bottom:2
              }}>

          <TouchableOpacity onPress={() => refRBSheet.current.open()}
            style={{
              height:50,
              marginBottom:10,
              backgroundColor:'#003B6A',
              justifyContent:'center',
              alignItems:'center',
              width:'95%',
              borderRadius:50
            }}>
              <Text style={{color:'white', fontWeight:'bold', fontSize:16}}>Orders</Text>
          </TouchableOpacity>
                  </View>
                  </View>
        <RBSheet
          ref={refRBSheet}
          animationType="slide"
          openDuration={300}
          height={400}
          closeOnDragDown={true}
          closeOnPressMask={true}
          // openDuration={250}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
              // borderRadius:50
            },
            draggableIcon: {
              backgroundColor: "#000"
            }
          }}
        >
  
            <View style={{alignItems:'center'}}>
              <LinearGradient colors={['#003B6A', '#001527']} style={styles.cardUser}>     
              <View style={styles.containerImage}>
                  <Image style={styles.image} source={{uri:'https://media.istockphoto.com/photos/smiling-japanese-woman-looking-at-camera-picture-id1061803534?b=1&k=20&m=1061803534&s=170667a&w=0&h=muhcd2m7ABTRI-c0PjpU-4GiS0drwoySc3Qs6-JzOvM='}}/>
              </View>
              <View style={styles.containerText}>
                  <Text style={styles.textNama}>Nama Client</Text>
                  <Text style={styles.textService}>Car Wash</Text>
              </View>
              <View style={styles.containerButton}>
                  <TouchableOpacity style={styles.buttonUser} onPress={()=>navigation.navigate('SandboxMamank')}>
                      <Text>Accept</Text>
                  </TouchableOpacity>
              </View>
              </LinearGradient>
              <LinearGradient colors={['#003B6A', '#001527']} style={styles.cardUser}>     
              <View style={styles.containerImage}>
                  <Image style={styles.image} source={{uri:'https://media.istockphoto.com/photos/smiling-japanese-woman-looking-at-camera-picture-id1061803534?b=1&k=20&m=1061803534&s=170667a&w=0&h=muhcd2m7ABTRI-c0PjpU-4GiS0drwoySc3Qs6-JzOvM='}}/>
              </View>
              <View style={styles.containerText}>
                  <Text style={styles.textNama}>Nama Client</Text>
                  <Text style={styles.textService}>Car Wash</Text>
              </View>
              <View style={styles.containerButton}>
                  <TouchableOpacity style={styles.buttonUser} onPress={()=>navigation.navigate('SandboxMamank')}>
                      <Text>Accept</Text>
                  </TouchableOpacity>
              </View>
              </LinearGradient>
              <LinearGradient colors={['#003B6A', '#001527']} style={styles.cardUser}>     
              <View style={styles.containerImage}>
                  <Image style={styles.image} source={{uri:'https://media.istockphoto.com/photos/smiling-japanese-woman-looking-at-camera-picture-id1061803534?b=1&k=20&m=1061803534&s=170667a&w=0&h=muhcd2m7ABTRI-c0PjpU-4GiS0drwoySc3Qs6-JzOvM='}}/>
              </View>
              <View style={styles.containerText}>
                  <Text style={styles.textNama}>Nama Client</Text>
                  <Text style={styles.textService}>Car Wash</Text>
              </View>
              <View style={styles.containerButton}>
                  <TouchableOpacity style={styles.buttonUser} onPress={()=>navigation.navigate('SandboxMamank')}>
                      <Text>Accept</Text>
                  </TouchableOpacity>
              </View>
              </LinearGradient>
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
    containerImage:{
      flex:2,
      alignItems:'center',
      // backgroundColor: "darkorange"
    },
    image:{
      width:60,
      height:60,
      borderRadius:50
    },
    cardUser: {
      backgroundColor: "black", 
      flexDirection:'row', 
      padding:10, 
      width:'90%',
      borderRadius:10,
      elevation:5,
      marginBottom:15
      },
      containerButton:{
          // backgroundColor:'black', 
          flex:2,
          alignItems:'center',
          justifyContent:'center',
      },
    buttonUser:{
      backgroundColor: "#FFB300",
      borderRadius:10,
      alignItems:'center',
      justifyContent:'center',
      paddingVertical:5,
      paddingHorizontal:15,
      },
    containerText:{
      flex:4,
      justifyContent:'center',
      marginLeft:10,
      // backgroundColor: "green"
    },
    textNama:{
      fontSize:18,
      fontWeight:'bold',
      color:'white',
    },
    textService:{
      fontSize:14,
      color:'white',
    }
  });
  