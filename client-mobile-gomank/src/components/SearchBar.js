import * as React from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";


const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    //   <View style={{width:'85%', padding:0}}>
          <Searchbar 
            style={{width:'85%', height: 60, borderRadius:10}}
            placeholder="Find what" 
            onChangeText={onChangeSearch} 
            value={searchQuery} />
    //   </View>
  )};

export default SearchBar;
