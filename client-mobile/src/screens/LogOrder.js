import {
    StyleSheet,
    Text,
    View,
    Pressable,
    FlatList,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { FETCH_ORDERS, UPDATE_CANCEL_ORDER } from '../../config/queries';
import { useNavigation } from '@react-navigation/native'

// export default function LogOrder() {
// const { loading, error, data } = useQuery(FETCH_ORDERS);

import { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function LogOrder() {
    const navigation = useNavigation();
    const [data2, setData2] = useState([]);
    const { loading, error, data, refetch } = useQuery(FETCH_ORDERS);
    const [updateCancelOrder] = useMutation(UPDATE_CANCEL_ORDER);


    useFocusEffect(
        useCallback(() => {
            console.log('Terpanggil, LOG/HISTORIES USEFOCUS');
            // Do something when the screen is focused
            refetch();
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );
    // useEffect( () => {
    //   const {loading, error, data, refetch} = useQuery(FETCH_ORDERS)

    // if(loading ) {

    // return (
    //   <View style={styles.container} >

    {
        /* // const { data, loading, error } = useQuery(FETCH_ORDER_BY_ID, {
  //   variables: {
  //     id: 1,
  //   },
  // }); */
    }

    if (loading) {
        return (
            // <View style={styles.container}>
            //   <View nestedScrollEnabled={true}>
            //     <ScrollView>
            //       <View>
            //         <Text>Loading .....</Text>
            //       </View>
            //     </ScrollView>
            //   </View>
            // </View>
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
    }
    if (error) {
        return (
            <View style={styles.container}>
                <View nestedScrollEnabled={true}>
                    <ScrollView>
                        <View>
                            <Text>Error: {error.message}</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
    console.log(data.orders, '<<<<<<<<');

    const cancelOrder = (id) => {
        updateCancelOrder({
            variables: {
                updateStatusOrderId: id,
            },
        });
        refetch();
    };

    return (
        <ScrollView
            contentContainerStyle={{ alignItems: 'center' }}
            style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
            <View style={{ marginTop: 20 }} />

            {data.orders.map((order, index) => {
                return (
                    // <></>

                    <View style={styles.card} key={index}>
                        
                        {/* <View style={{ flexDirection: 'row' }}> */}
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={styles.title}>INVOICE</Text>
                                <Text style={styles.subTitle}>No: {order.invoiceNumber}</Text>
                            </View>

                          
                        {/* </View> */}

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1.5 }}>
                                <Text style={styles.liteTitle}>Customer</Text>
                                <Text style={styles.description}>{order.client.name}</Text>

                                <Text style={styles.liteTitle}>Date & Time</Text>
                                <Text style={styles.description}>{order.date}</Text>
                                <Text style={styles.description}>{order.time}</Text>

                                <Text style={styles.liteTitle}>Payment Method</Text>
                                <Text style={styles.description}>
                                    {order.paymentMethod.toUpperCase()}
                                </Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                {/* <Text style={styles.price}> {order.price}</Text> */}
                                <Text style={styles.liteTitle}>Service</Text>
                                <Text style={styles.description}>{order.service}</Text>

                                <Text style={styles.liteTitle}>Price</Text>
                                <Text style={styles.description}>Rp {order.price}</Text>

                                <Text style={styles.liteTitle}>Payment</Text>
                                <Text style={styles.description}>
                                    {order.paymentStatus.toUpperCase()}
                                </Text>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.liteTitle}>Address</Text>
                            <Text style={styles.description}>{order.address}</Text>
                        </View>

                        <TouchableOpacity style={styles.button2} >
                            <Text style={styles.textButton2}>My Order</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', flex: 1, justifyContent:'space-between'}}>
                            <TouchableOpacity style={styles.buttonBack}>
                                <Text style={styles.textStyle2}>Cancel</Text>
                            </TouchableOpacity>
                            <View style={{marginHorizontal:10}}/>
                            <TouchableOpacity style={styles.button} onPress={() => cancelOrder(order.id) }>
                                <Text style={styles.textButton}>Done</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        alignItems: 'center',
    },
    card: {
        // flexDirection: "row",
        padding: 20,
        margin: 5,
        backgroundColor: 'white',
        width: '90%',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FEC900',
    },
    liteTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#C2C2C2',
        marginTop: 15,
    },
    price: {
        fontSize: 18,
        color: '#FEC900',
    },
    subTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#929292',
    },
    description: {
        fontSize: 18,
        color: '#606060',
    },
    Image: {
        height: 100,
        width: 55,
        marginRight: 20,
        resizeMode: 'contain',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#FFB300',
        borderRadius: 8,
        marginTop: 10,
        // marginHorizontal: 5,
    },
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    button2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#FFB300',
        borderRadius: 8,
        marginTop: 10,
        width:"100%"
        // marginHorizontal: 0,
    },
    textButton2: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    logo: {
        width: 230,
        resizeMode: 'contain',
        marginBottom: '20%',
    },
    textStyle2: {
        color: "#FFB300",
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
      },
      buttonBack: {
        backgroundColor: "white",
        borderColor: "#FFB300",
        borderWidth: 3,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 4,
        elevation: 3,
        borderRadius: 8,
        marginTop: 10,
        width:"100%",
      },
});
