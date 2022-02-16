import {ActivityIndicator, FlatList, Platform, SafeAreaView, StyleSheet, View, Text} from 'react-native';


import SearchBar from "../components/SearchBar";
import React, {useState} from "react";
import axios from "axios";
import SearchedRecipeCard from "../components/SearchedRecipeCard";
import RecipeVideo from "../components/RecipeVideo";
import {AntDesign} from "@expo/vector-icons";

export default function VideoScreen() {
    const [recipes,setRecipes] = useState([]);
    const [searchText,setSearchText] = useState("");
    const [isLoading,setIsLoading] = useState(false);

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


    const clearSearch = () => {
        setSearchText("");
        setRecipes([]);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                marginTop: Platform.OS === "android" ? 50 : 0
            }}>
                {isLoading && <ActivityIndicator color="#FF7878"/>}
                { !isLoading &&
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
                }
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
