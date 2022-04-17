import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
export default function PaymentPage() {
    
    return(
       <View style={styles.container}>
           <TouchableOpacity style={styles.containerImage}>
               {/* <View style={styles.containerImage}> */}
                <Image source={require("../../assets/xendit.png")} style={styles.image} />
               {/* </View> */}
           </TouchableOpacity>
           <TouchableOpacity style={styles.containerImage}>
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
    containerImage:{
        alignItems:'center',
        marginVertical:10
    },
    image: {
        width: "85%",
        height: 155,
        resizeMode: "contain",
        borderRadius: 10,
    },
})