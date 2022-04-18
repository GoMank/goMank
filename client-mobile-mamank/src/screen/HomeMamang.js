import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import Maps from '../components/Maps';
import tw from 'twrnc';

const HomeMamang = ({ navigation }) => {
    // fetch all order from server
    //
    return (
        <View>
            <View style={tw`h-[50%]`}>
                <Maps />
            </View>
            <View
                style={tw`h-[50%] bg-slate-800 rounded-t-[2.5rem] pl-[10%] pb-[10%] shadow-xl`}>
                <View style={tw`h-[10%]`} />
                <ScrollView style>
                    <TouchableOpacity
                        title='Go to Home'
                        onPress={() => navigation.navigate('DrivingMap')}
                        style={tw`flex items-center flex-row`}>
                        <View style={tw`h-20 w-20 m-5 rounded-lg bg-yellow-300`} />
                        <View>
                            <Text style={tw`text-xl text-white font-bold`}>Order by User</Text>
                            <Text style={tw`text-white`}>Jl. jalan ke pasar senen</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`flex items-center flex-row`}>
                        <View style={tw`h-20 w-20 m-5 rounded-lg bg-yellow-300`} />
                        <View>
                            <Text style={tw`text-xl text-white font-bold`}>Order by User</Text>
                            <Text style={tw`text-white`}>beli mangga lagi batuk</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`flex items-center flex-row `}>
                        <View style={tw`h-20 w-20 m-5 rounded-lg bg-yellow-300`} />
                        <View>
                            <Text style={tw`text-xl text-white font-bold`}>Order by User</Text>
                            <Text style={tw`text-white`}>aduh besok hari senen</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`flex items-center flex-row `}>
                        <View style={tw`h-20 w-20 m-5 rounded-lg bg-yellow-300`} />
                        <View>
                            <Text style={tw`text-xl text-white font-bold`}>Order by User</Text>
                            <Text style={tw`text-white`}>ini kerjaan masih numpuk</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

export default HomeMamang;
