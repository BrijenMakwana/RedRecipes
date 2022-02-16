import {FlatList, Platform, SafeAreaView, StyleSheet, View} from 'react-native';


import SearchBar from "../components/SearchBar";
import {useState} from "react";
import axios from "axios";
import SearchedRecipeCard from "../components/SearchedRecipeCard";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export default function SearchScreen() {
  const [recipes,setRecipes] = useState([]);
  const [searchText,setSearchText] = useState("");

  const gerSearchedRecipes = () => {
    axios.get('https://api.spoonacular.com/recipes/complexSearch',{
      params:{
          apiKey: "",
          query: searchText,
          number: 25
      }

    })
        .then((response)=> {
          // handle success

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

  const colorScheme = useColorScheme();

  const clearSearch = () => {
    setSearchText("");
    setRecipes([]);
  }
  return (
    <SafeAreaView style={[styles.container,{
        backgroundColor: Colors[colorScheme].background
    }]}>

        <View style={{
            marginTop: Platform.OS === "android" ? 50 : 0
        }}>
            <FlatList
                data={recipes}
                renderItem={({item})=> <SearchedRecipeCard recipe={item}/>}
                keyExtractor={item=> item.id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <SearchBar
                        placeholder="search recipe here"
                        searchText={searchText}
                        onChangeText={(text)=>setSearchText(text)}
                        onSubmit={gerSearchedRecipes}
                        onClear={clearSearch}
                    />
                }

            />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  }
});
