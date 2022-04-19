import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useState, useRef } from "react";
import { useNavigation } from '@react-navigation/native'
import { WebView } from 'react-native-webview';
import SandboxTest from "./SandboxTest";
import axios from 'axios';

export default function PaymentPage(order) {
    const dataOrder = order.route.params
    console.log("🚀 ~ file: PaymentPage.js ~ line 7 ~ PaymentPage ~ dataOrder", dataOrder)
    const navigation = useNavigation();

    const [paymentInput, setPayment] = useState('');
    console.log(paymentInput, "INI PAYMENT INPUT")
    const [addProduct] = useMutation(LOGIN);
    const submitLogin2 = () => {
        addProduct({
            variables: {
                clientId: $clientId, 
                mamangId: $mamangId, 
                service: $service, 
                date: $date, 
                time: $time, 
                address: $address, 
                paymentMethod: $paymentMethod
            },
        });
        
    };

    async function xendit() {
        const data = await axios.post('https://2be5-125-164-21-106.ngrok.io/xenditPay')
        return navigation.navigate('SandboxTest', { urlData: data.data })
    }

    async function midTrans() {
        const data = await axios.post(`https://6305-114-4-213-204.ngrok.io/orders/midTransPay`)
        return navigation.navigate('SandboxTest', { urlData: data.data })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.containerImage} value={setPayment('xendit')} onPress={xendit}>
                {/* <TouchableOpacity style={styles.containerImage} value={xendit} onPress={()=> navigation.navigate('SandboxTest')}> */}
                {/* <View style={styles.containerImage}> */}
                <Image source={require("../../assets/xendit.png")} style={styles.image} />
                {/* </View> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerImage} value={setPayment('midTrans')} onPress={midTrans}>
                <Image source={require("../../assets/midtrans.png")} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerImage}>
                <Image source={require("../../assets/paymank.png")} style={styles.image} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'blue',
        // alignItems:'center',
    },
    containerImage: {
        alignItems: 'center',
        marginVertical: 10
    },
    image: {
        width: "85%",
        height: 155,
        resizeMode: "contain",
        borderRadius: 10,
    },
})