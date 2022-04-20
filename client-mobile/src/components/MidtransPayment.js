import React, { useRef } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { CREATE_ORDER } from "../../config/queries";
import { useMutation } from "@apollo/client";

const MidtransPayment = (urlData) => {
    const navigation = useNavigation();

    console.log(urlData.route.params.urlData, "ini url");
    console.log(urlData.route.params.order, "ini order")
    // const url = urlData;
    const order = urlData.route.params.order
    const [addOrder] = useMutation(CREATE_ORDER);
    const submitOrder = () => {
        addOrder({
            variables: {
                clientId: order.clientId, 
                mamangId: order.mamangId, 
                service: order.service, 
                date: order.date, 
                time: order.time, 
                address: "Adress", 
                paymentMethod: order.payment
            },
        });
        
    };
    console.log("masuk222");
  const webViewRef = useRef(null);
  const run = `
    document.body.style.backgroundColor = 'blue';
    true;
  `
  setTimeout(() => {
    webViewRef.current.injectJavaScript(run)
  }, 10000)
  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{
          uri:
          `${urlData.route.params.urlData}`,
        }}
        onNavigationStateChange={(newNavState) => {
            
            if(newNavState.url.includes('#/success')){
              submitOrder()
              setTimeout(() => {
                        navigation.navigate('TabNav')
                      }, 3000)
            }
            // else if (newNavState.canGoBack) {
            //     setTimeout(() => {
            //         navigation.navigate('TabNav')
            //       }, 10000)
            // }
            //  if (newNavState.title !== `Random`) {
            //   navigation.navigate('TabNav')
            // }
            console.log(newNavState);
            }
        }
      />
    </View>
  )
}

export default MidtransPayment