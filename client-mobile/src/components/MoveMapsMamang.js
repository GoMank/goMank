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
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_NEAREST_MAMANG, GET_MAMANG_LOC } from '../../config/queries';
const GOOGLE_MAPS_APIKEY = 'AIzaSyAlqVN_Y9I6JGPrCIgA5LR0iytHX1hIRaY';

export default function MoveMapsMamang() {
    const [address, setAddress] = useState([]);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [mamang, { data: mamangPollLoc, loading: mamangPollLoading, refetch }] =
        useLazyQuery(GET_MAMANG_LOC, {
            variables: {
                mamangId: '62603805c6c29c9308948b08',
            },
        });
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
                setLocation(currentLocation);
                const _currentDistance =
                    getDistance(
                        currentLocation?.coords?.latitude,
                        currentLocation?.coords?.longitude,
                        mamangPollLoc?.mamang?.address?.coordinates[0],
                        mamangPollLoc?.mamang?.address?.coordinates[1]
                    ) * 1000;
                if (currentLocation && _currentDistance >= 5) {
                    mamang();
                    console.log('mamangLoc', mamangPollLoc);
                } else {
                    clearInterval(t);
                }
            })();
        }, 10000);

        return () => {
            clearInterval(t);
        };
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = location;
    }

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
        let mamangLocation = {
            latitude: 106.863418,
            longitude: -6.255752,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        };
        if (mamangPollLoc) {
            mamangLocation = {
                latitude: mamangPollLoc?.mamang?.address?.coordinates[0],
                longitude: mamangPollLoc?.mamang?.address?.coordinates[1],
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            };
        }

        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <MapView
                        style={styles.maps}
                        showsUserLocation
                        initialRegion={currentLocation} //your region data goes here.
                        provider={PROVIDER_GOOGLE}>
                        <Marker
                            coordinate={{
                                latitude: -6.255752,
                                longitude: 106.863418,
                            }}
                            title={'Your Location'}
                        />
                    </MapView>
                </View>

                {/*Make sure the Marker component is a child of MapView. Otherwise it won't render*/}
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
