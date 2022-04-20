import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { useQuery } from "@apollo/client";
import { FETCH_ORDERS } from "../../config/queries";

export default function LogOrder() {
  const { loading, error, data } = useQuery(FETCH_ORDERS);

  // const { data, loading, error } = useQuery(FETCH_ORDER_BY_ID, {
  //   variables: {
  //     id: 1,
  //   },
  // });

  if (loading) {
    return (
      <View style={styles.container}>
        <View nestedScrollEnabled={true}>
          <ScrollView>
            <View>
              <Text>Loading .....</Text>
            </View>
          </ScrollView>
        </View>
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
  console.log(data.orders,"<<<<<<<<");
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      style={{ flex: 1, backgroundColor: "#E5E5E5" }}
      >
      <View style={{ marginTop: 20 }} />

      {/* <View style={styles.card}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.title}>CANCEL</Text>
            <Text style={styles.subTitle}>No: 2019100007</Text>

            <Text style={styles.liteTitle}>Time</Text>
            <Text style={styles.description}>16 Oct 2019</Text>
            <Text style={styles.description}>07.00</Text>

            <Text style={styles.liteTitle}>Customer</Text>
            <Text style={styles.description}>MAMANG BUDI</Text>
          </View>
          <View style={{ marginLeft: "20%" }}>
            <Text style={styles.price}>Rp.50.000</Text>
            <Text style={styles.description}>CASH</Text>

            <Text style={styles.liteTitle}>Payment</Text>
            <Text style={styles.description}>PENDING</Text>
          </View>
        </View>

        <View>
          <Text style={styles.liteTitle}>Address</Text>
          <Text style={styles.description}>Jalan kenangan mantan, yang masih membekas</Text>
        </View>

        <Pressable style={styles.button}>
          <Text style={styles.textButton}>Details</Text>
        </Pressable>
      </View> */}


      {data.orders.map((order,index) => {
        return (
          // <></>

          <View style={styles.card} key={index}>
                <Text style={styles.title}>INVOICE</Text>
                <Text style={styles.subTitle}>No: {order.invoiceNumber}</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{flex:1.5}}>

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

              <View style={{flex:1}}>
                {/* <Text style={styles.price}> {order.price}</Text> */}
                <Text style={styles.liteTitle}>Service</Text>
                <Text style={styles.description}>
                  {order.service}
                </Text>

                <Text style={styles.liteTitle}>Price</Text>
                <Text style={styles.description}>
                  Rp {order.price}
                </Text>

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

            <View style={{flexDirection: "row", flex:1}}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
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
    backgroundColor: "#E5E5E5",
    alignItems: "center",
  },
  card: {
    // flexDirection: "row",
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#FEC900",
  },
  liteTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#C2C2C2",
    marginTop: 15,
  },
  price: {
    fontSize: 18,
    color: "#FEC900",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#929292",
  },
  description: {
    fontSize: 16,
    color: "#606060",
  },
  Image: {
    height: 100,
    width: 55,
    marginRight: 20,
    resizeMode: "contain",
  },
  button: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#FEC900",
    borderRadius: 8,
    marginTop: 25,
    marginHorizontal:5
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
