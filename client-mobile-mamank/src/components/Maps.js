import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import React, { useState, useEffect, useRef } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { GET_NEAREST_MAMANG, UPDATE_MAMANG_LOCATION } from '../../config/queries';
import { gql, useMutation } from '@apollo/client';
// import Anchor from './Linking';
// import axios from 'axios';
import { LogBox } from 'react-native';
let foregroundSubscription = null;
export default function Maps() {
    LogBox.ignoreLogs(['Remote debugger']);
    const {
        data: nearestMamang,
        loading: nearestLoading,
        error: nearestError,
    } = useMutation(GET_NEAREST_MAMANG);
    const [updateMamangLoc, { data: mamangLoc, loading: mamangLoading, error: mamangtError }] =
        useMutation(UPDATE_MAMANG_LOCATION);

    const [address, setAddress] = useState([]);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [distance, setDistance] = useState(Infinity);
    const [clientLoc, setClientLoc] = useState(null);
    const countRef = useRef(null);
    countRef.current = distance;
    const GOOGLE_MAPS_APIKEY = 'AIzaSyAlqVN_Y9I6JGPrCIgA5LR0iytHX1hIRaY';

    let t;
    useEffect(() => {
        t = setInterval(() => {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
                let currentLocation = await Location.getCurrentPositionAsync({});
                let currentAddress = await Location.reverseGeocodeAsync({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                });
                setAddress(currentAddress);

                const _currentDistance =
                    getDistance(
                        currentLocation?.coords?.latitude,
                        currentLocation?.coords?.longitude,
                        -6.269459394758885,
                        107.01111910348448
                    ) * 1000;
                if (currentLocation && _currentDistance >= 5) {
                    setLocation(currentLocation);
                    updateMamangLoc({
                        variables: {
                            address: [
                                currentLocation.coords.longitude,
                                currentLocation.coords.latitude,
                            ],
                            id: '62559ddfc9054d53a273fb15',
                        },
                    });
                } else {
                    clearInterval(t);
                }
            })();
        }, 5000);

        return () => {
            clearInterval(t);
        };
    }, []);

    // hitung jarak
    const getDistance = (lat1 = 0, lon1 = 0, lat2 = 1000, lon2 = 1000) => {
        const R = 6371;
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
                Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    // hasil client location
    const car = [
        {
            latitude: -6.26999,
            longitude: 107.01102,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        },
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

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(address);
    }

    if (text === 'Waiting..') {
        return (
            <View style={styles.container}>
                <Text>{text}</Text>
            </View>
        );
    }

    if (mamangLoc) {
        console.log(mamangLoc);
    }

    // ini user location nih bisa hard code
    const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
    };

    return (
        <View>
            {/* <Anchor /> */}
            <MapView
                tiltEnabled={true}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsCompass={true}
                showsUserLocation={true}
                initialRegion={currentLocation} //your region data goes here.
            >
                <MapViewDirections
                    origin={location.coords}
                    destination={car[0]}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={10}
                    strokeColor='hotpink'
                />

                {car.map((item, index) => (
                    <MapView.Marker coordinate={item} key={index}></MapView.Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
