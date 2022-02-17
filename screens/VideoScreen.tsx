import {ActivityIndicator, FlatList, Platform, SafeAreaView, StyleSheet, View, Text} from 'react-native';


import SearchBar from "../components/SearchBar";
import React, {useState} from "react";
import axios from "axios";
import RecipeVideo from "../components/RecipeVideo";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export default function VideoScreen() {
    const [recipes,setRecipes] = useState([]);
    const [searchText,setSearchText] = useState("");

    // get recipe videos based on user query
    const getSearchedRecipeVideos = () => {
        axios.get('https://api.spoonacular.com/food/videos/search',{
            params:{
                apiKey: "",
                query: searchText,
                number: 50
            }

        })
            .then((response)=> {
                // handle success
                setRecipes(response.data.videos);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    // clear search bar
    const clearSearch = () => {
        setSearchText("");
        setRecipes([]);
    }

    const colorScheme = useColorScheme();

    return (
        <SafeAreaView style={[styles.container,{
            backgroundColor: Colors[colorScheme].background
        }]}>
            <View style={{
                marginTop: Platform.OS === "android" ? 50 : 0,
                backgroundColor: Colors[colorScheme].background
            }}>
                {/* list of RecipeVideo*/}
                <FlatList
                    data={recipes}
                    renderItem={({item})=> <RecipeVideo recipeVideo={item}/>}
                    keyExtractor={item=> item.youTubeId}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                    <SearchBar
                        placeholder="search recipe videos here"
                        searchText={searchText}
                        onChangeText={(text)=>setSearchText(text)}
                        onSubmit={getSearchedRecipeVideos}
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
