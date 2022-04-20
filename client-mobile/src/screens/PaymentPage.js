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
    //console.log(paymentInput, "INI PAYMENT INPUT")
    

    async function xendit() {
        console.log('masuk');
        const data =  await axios.post('http://d839-139-0-237-101.ngrok.io/payments/xendit',{
            email:dataOrder.email,
            price:dataOrder.price,
        })
        return navigation.navigate('SandboxTest',{urlData: data.data, order: dataOrder})
    }

    async function midTrans() {
        const data =  await axios.post(`http://d839-139-0-237-101.ngrok.io/payments/midtrans`,{
            price:dataOrder.price,
        })
        dataOrder.payment = "midtrans"
        return navigation.navigate('MidtransPayment',{urlData: data.data, order: dataOrder})
    }

    return(
       <View style={styles.container}>
           <TouchableOpacity style={styles.containerImage} value={xendit} onPress={xendit}>
                <Image source={require("../../assets/xendit.png")} style={styles.image} />
           </TouchableOpacity>
           <TouchableOpacity style={styles.containerImage} value={midTrans} onPress={midTrans}>
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