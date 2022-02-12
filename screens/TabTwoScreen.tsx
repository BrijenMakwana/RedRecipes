import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';


import SearchBar from "../components/SearchBar";
import {useState} from "react";
import axios from "axios";
import SearchedRecipeCard from "../components/SearchedRecipeCard";

export default function TabTwoScreen() {
  const [recipes,setRecipes] = useState([]);
  const [searchText,setSearchText] = useState("");

  const gerSearchedRecipes = () => {
    axios.get('https://api.spoonacular.com/recipes/complexSearch',{
      params:{
        apiKey: "",
        query: searchText
      }

    })
        .then((response)=> {
          // handle success
          // console.log(response.data.results);
          setRecipes(response.data.results);


        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
  }

  const clearSearch = () => {
    setSearchText("");
    setRecipes([]);
  }
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
          searchText={searchText}
          onChangeText={(text)=>setSearchText(text)}
          onSubmit={gerSearchedRecipes}
          onClear={clearSearch}
      />
        <View>
            <FlatList
                data={recipes}
                renderItem={({item})=> <SearchedRecipeCard recipe={item}/>}
                keyExtractor={item=> item.id}
            />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: "#fff"
  }
});
