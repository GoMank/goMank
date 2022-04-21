import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import SandboxTest from './SandboxTest';
import axios from 'axios';

export default function PaymentPage(order) {
    const dataOrder = order.route.params;
    console.log('🚀 ~ file: PaymentPage.js ~ line 7 ~ PaymentPage ~ dataOrder', dataOrder);
    const navigation = useNavigation();

    const [paymentInput, setPayment] = useState('');
    //console.log(paymentInput, "INI PAYMENT INPUT")

    async function xendit() {
        console.log('masuk');
        const data = await axios.post('https://gomank-server-app.herokuapp.com/payments/xendit', {
            email: dataOrder.email,
            price: dataOrder.price + '000',
        });
        console.log('masuk 2');
        return navigation.navigate('XenditPayment', { urlData: data.data, order: dataOrder });
    }
    //heroku logs -t
    // https://angry-lizard-62.loca.lt/payments/xendit
    async function midTrans() {
        const data = await axios.post(`https://gomank-server-app.herokuapp.com/payments/midtrans`, {
            price: dataOrder.price + '000',
        });
        dataOrder.payment = 'Midtrans';
        return navigation.navigate('MidtransPayment', {
            urlData: data.data,
            order: dataOrder,
        });
    }

    return (
        <View style={styles.container}>
            <View
                style={{
                    marginLeft: '5%',
                    marginBottom: 25,
                    marginTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                <View>
                    <Text
                        style={{
                            fontSize: 36,
                            fontWeight: 'bold',
                            marginBottom: -10,
                            color: '#003B6A',
                        }}>
                        Select Your
                    </Text>
                    <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#003B6A' }}>
                        Payment
                    </Text>
                </View>
                <Image source={require('../../assets/LogoGomank.png')} style={styles.image2} />
            </View>
            <TouchableOpacity style={styles.containerImage} value={xendit} onPress={xendit}>
                <Image source={require('../../assets/xendit.png')} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.containerImage}
                value={midTrans}
                onPress={midTrans}>
                <Image source={require('../../assets/midtrans.png')} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerImage}>
                <Image source={require('../../assets/paymank.png')} style={styles.image} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'blue',
        // alignItems:'center',
    },
    containerImage: {
        alignItems: 'center',
        marginVertical: 5,
        width: '100%',
    },
    image: {
        width: '95%',
        height: 170,
        resizeMode: 'contain',
        borderRadius: 10,
        // backgroundColor:'blue' prikitiw meshmew
    },
    image2: {
        height: 100,
        width: 55,
        marginRight: 20,
        resizeMode: 'contain',
    },
});
