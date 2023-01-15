import {
    StyleSheet,
    FlatList,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    ImageBackground,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardPaymank from '../components/CardPaymank';
import SearchBar from '../components/SearchBar';
import CardPopular from '../components/CardPopular';
import CardProduct from '../components/CardProduct';
import {useState, useEffect} from 'react';

const assetMamank = [
    {
        name: 'Car Wash',
        title: 'Mank Wash',
        image: 'https://i.ibb.co/vkGXsc9/CarWash.jpg',
        price: '850.000',
        id: 1,
    },
    {
        name: 'Engine Wash',
        title: 'Mank Engine',
        image: 'https://i.ibb.co/PYHJT0t/engine-Wash.jpg',
        price: '500.000',
        id: 2,
    },
    {
        name: 'Interior Wash',
        title: 'Mank Interior',
        image: 'https://i.ibb.co/qJMVsqS/interior-Wash.jpg',
        price: '450.000',
        id: 3,
    },
    {
        name: 'Eksterior Wash',
        title: 'Mank Eksterior',
        image: 'https://i.ibb.co/t3tRWTm/eksterior-Wash.jpg',
        price: '350.000',
        id: 4,
    },
    {
        name: 'Window Wash',
        title: 'Mank Window',
        image: 'https://i.ibb.co/Bzb23q4/window-Wash.jpg',
        price: '235.000',
        id: 5,
    },
    {
        name: 'Velg Wash',
        title: 'Mank Velg',
        image: 'https://i.ibb.co/372wDvq/VelgWash.jpg',
        price: '185.000',
        id: 6,
    },
];

export default function Homepage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem("user_info")
          .then((res) => {
            setData(JSON.parse(res))
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    console.log(data, '<<<<<<<<');

    if (!data) {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Image
              source={require("../../assets/loadingLogo.gif")}
              style={styles.logo}
            />
          </View>
        );
      } else {
   
    return (<>
    
        <View style={{width:'100%',flexDirection: "row", backgroundColor:'#003B6A', height:70, elevation: 3, alignItems:'center'}}>
            <View style={{flex:1,}}>
            <Image style={styles.imageGomank} source={require('../../assets/logo-gomank-main.png')} />
            </View>
            <View style={{flex:1, flexDirection: "row",}}>

                <View style={{justifyContent:'center',}}>
                    <Text style={{textAlign:"right", color:'white', fontSize:16}}>
                        {data.name}
                        </Text>
                    <Text style={{textAlign:"right", color:'white', fontSize:12}}>
                        {data.phoneNumber}
                    </Text>
                </View>

                <Image style={styles.image} source={require('../../assets/For-Men.jpg')} />
            </View>
        </View>
        <ScrollView>
            <View style={styles.container}>
                {/* <View style={styles.header} /> */}
                <View style={{ marginTop: 5 }}>
                    <Text></Text>
                </View>
                <CardPaymank />

                <View style={{ marginHorizontal: '6%', marginTop: 35, marginBottom: 5 }}>
                    <Text style={styles.TitleText}> Discover</Text>
                    <Text style={styles.TitleText2}> a new wash</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <SearchBar />
                </View>

                <View style={{ marginHorizontal: '8%', marginTop: 45 }}>
                    <Text style={styles.TitleTextDiv}>Popular</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    {/* component popular */}
                    <FlatList
                        horizontal
                        style={{ marginLeft: '6%' }}
                        data={assetMamank}
                        renderItem={({ item }) => <CardPopular mamank={item} />}
                        keyExtractor={(item) => item.id}
                    />
                </View>
                <View style={{ marginHorizontal: '8%', marginTop: 15 }}>
                    <Text style={styles.TitleTextDiv}>Product</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    {/* component Our Product */}
                    <FlatList
                        horizontal
                        style={{ marginLeft: '6%' }}
                        data={assetMamank}
                        renderItem={({ item }) => <CardProduct mamank={item} />}
                        keyExtractor={(item) => item.id}
                    />
                </View>
                <Image style={styles.imageBanner} source={require('../../assets/b1.png')} />
                <Image style={styles.imageBanner2} source={require('../../assets/b2.png')} />
            </View>
        </ScrollView>
        </>
    );
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#003B6A',
        height: 75,
        width: '100%',
        marginBottom: 20,
    },
    TitleText: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#003B6A',
    },
    TitleText2: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#003B6A',
        marginTop: -20,
    },
    TitleTextDiv: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#003B6A',
        // marginTop: -20,
    },
    image: {
        // backgroundColor: "pink",
        paddingTop: 5,
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 100,
        marginLeft:10
      },
      imageGomank: {
        // backgroundColor: "pink",
        paddingTop: 5,
        width: 150,
        height: 55,
        resizeMode: 'contain',
        borderRadius: 100,
        marginLeft:10
      },
      imageBanner: {
        // backgroundColor: "pink",
        paddingTop: 5,
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginTop:10
        // borderRadius: 100,
        // marginLeft:10
      },
      imageBanner2: {
        // backgroundColor: "pink",
        paddingTop: 5,
        width: '100%',
        height: 160,
        resizeMode: 'contain',
        // borderRadius: 100,
        // marginLeft:10
      }
});
