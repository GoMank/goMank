import { View, Text, TouchableOpacity } from 'react-native';
import Maps from '../components/Maps';
import React from 'react';
import tw from 'twrnc';

const DrivingMap = () => {
    return (
        <View style={{ flex: 1 }}>
            <View
                style={[
                    tw.style(`bg-[#003B6A]`),
                    {
                        flex: 1,
                        resizeMode: 'cover',
                        justifyContent: 'center',
                    },
                ]}>
                <Maps />
            </View>
            <View style={tw`absolute bottom-20 w-full`}>
                <TouchableOpacity
                    style={tw`bg-[#FFB300] w-[90%] p-5 rounded-lg mb-5 mx-auto`}
                    title='Go to Home'
                    onPress={() => navigation.navigate('HomeMamang')}>
                    <Text style={tw`mx-auto text-black`}>Chat Mamang</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DrivingMap;
