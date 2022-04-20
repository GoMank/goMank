import React, { useRef } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';

const XendinPayment = (urlData) => {
    const navigation = useNavigation();

    console.log(urlData.route.params.urlData, "ini url");
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
                address: "Address", 
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
  }, 3000)
  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{
          uri:
          `${urlData.route.params.urlData}`,
        }}
        onNavigationStateChange={(newNavState) => {
            
            // if(newNavState.url.includes('#/success')){
            //   setTimeout(() => {
            //             navigation.navigate('TabNav')
            //           }, 3000)
            // }
            if (newNavState.canGoBack) {
                setTimeout(() => {
                  submitOrder()
                    navigation.navigate('TabNav')
                  }, 10000)
            }
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

export default XendinPayment