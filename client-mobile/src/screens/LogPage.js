import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import {FETCH_HISTORY} from "../../config/queries"
export default function LogPage() {
  const {loading, error, data} = useQuery(FETCH_HISTORY)
  
 
  if(loading) {
    return (
      <View style={styles.container} >
      

      <View nestedScrollEnabled={true} >
       
        

        <ScrollView >
          <View >
          <Text>Loading .....</Text>
          </View>



          



        </ScrollView>


      </View>

    </View>
    )
    
  }
  if(error) {
    return (
      <View style={styles.container}>
      
      <View nestedScrollEnabled={true} >
       
        <ScrollView>
          <View >
          <Text >Error:  {error.message}</Text>
          </View>

        </ScrollView>


      </View>

    </View>
    )
  } 
  console.log(data.histories, "INI HISTORY")
  return (
    <ScrollView contentContainerStyle={ {alignItems: "center"}} style={{flex: 1,
      backgroundColor: "#E5E5E5",
     }}>
      <View style={{ marginTop: 20 }} />
      <View style={styles.card}>
        <View style={{ justifyContent: "center" }}>
          <Image source={require("../../assets/LogoGomank.png")} style={styles.Image} />
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.title}>Booking Status CANCEL</Text>
          <Text style={styles.subTitle}>No: 2019100007</Text>
          <Text style={styles.description}>Your booking status no. 2019100007 has been canceled</Text>
        </View>
      </View>
      {data.histories.map(history => {
          return (
            <View style={styles.card}>
        <View style={{ justifyContent: "center" }}>
          <Image source={require("../../assets/LogoGomank.png")} style={styles.Image} />
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.title}>Booking Status { history.order  ? history.order.orderStatus.toUpperCase() : "_" }</Text>
          <Text style={styles.subTitle}>No: { history.order  ? history.order.invoiceNumber : "" }</Text>
          <Text style={styles.description}>{history.description}</Text>
        </View>
      </View>
          )
        })}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    padding: 20,
    margin: 5,
    backgroundColor: "white",
    width: "90%",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0386EE",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#929292",
  },
  description: {
    fontSize: 14,
    marginTop: 10,
    color: "#929292",
    width: "70%",
    // backgroundColor:'black'
  },
  Image: {
    height: 100,
    width: 55,
    marginRight: 20,
    resizeMode: "contain",
  },
});
