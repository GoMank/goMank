import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { LogBox } from "react-native";

const SplashScreen = ({ navigation }) => {
    LogBox.ignoreLogs(["Remote debugger"]);
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                style={[
                    tw.style(`bg-[#003B6A]`),
                    {
                        flex: 1,
                        resizeMode: 'cover',
                        justifyContent: 'center',
                    },
                ]}></ImageBackground>

            <View style={tw`absolute bottom-2 w-full`}>
                <Text style={tw`ml-[5%] text-white text-4xl mb-5`}>Welcome To GoMang</Text>
                <Text style={tw`ml-[5%] text-xl text-white mb-20`}>
                    Jadilah Partner kami untuk menyambut cuan-cuan kehidupan wahai mamang
                </Text>
                <TouchableOpacity
                    style={tw`bg-[#3BAAFF] w-[90%] p-5 rounded-lg mb-5 mx-auto`}
                    title='Go to Home'
                    onPress={() => navigation.navigate('HomeMamang')}>
                    <Text style={tw`mx-auto text-black`}>Become A Partner</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw`bg-[#FFB300] w-[90%] p-5 rounded-lg mb-5 mx-auto`}
                    title='Go to Home'
                    onPress={() => navigation.navigate('MapsOrder')}>
                    <Text style={tw`mx-auto text-black`}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SplashScreen;
