import {Dimensions, FlatList, SafeAreaView, StyleSheet, Image, ScrollView, Pressable} from 'react-native';


import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import * as WebBrowser from 'expo-web-browser';
import axios from "axios";
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";
import IngredientCard from "../components/IngredientCard";
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import RecipeCard from "../components/RecipeCard";
import SimilarRecipeCard from "../components/SimilarRecipeCard";
import NutrientCard from "../components/NutrientCard";


export default function RecipeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

    const [recipe,setRecipe] = useState([]);
    const route = useRoute();
    const [recipeId,setRecipeId] = useState(route.params.id);
    const [ingredients,setIngredients] = useState([]);
    const [similarRecipes,setSimilarRecipes] = useState([]);
    const [nutrition,setNutrition] = useState([]);


    const getRecipe = () => {
        axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true`,{
            params:{
                apiKey: ""
            }

        })
            .then((response)=> {
                // handle success
                // console.log(response.data.recipes);
                setRecipe(response.data);
                setIngredients(response.data.extendedIngredients);
                setNutrition(response.data.nutrition.nutrients);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    const goToFullRecipe = () => {
        // got to recipe source
        WebBrowser.openBrowserAsync(recipe.sourceUrl);

    }

    const getSimilarRecipes = () => {
        axios.get(`https://api.spoonacular.com/recipes/${recipeId}/similar`,{
            params:{
                apiKey: ""
            }

        })
            .then((response)=> {
                // handle success
                setSimilarRecipes(response.data);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    useEffect(()=>{
        getRecipe();
        getSimilarRecipes();
    },[])
    return (
        <View style={styles.container}>
            <SafeAreaView>

                {/*   nutrition information */}
                <View style={styles.nutritionContainer}>
                    <FlatList
                        data={nutrition}
                        renderItem={({item})=> <NutrientCard nutrient={item}/>}
                        keyExtractor={item=> item.name}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                        <View>
                            {/* title */}
                            <Text style={styles.title}>
                                {recipe.title}
                            </Text>
                            {/* image   */}
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{
                                        uri: recipe.image
                                    }}
                                    style={styles.image}
                                    resizeMode= "cover"
                                />
                                {/* duration*/}
                                <View style={styles.duration}>
                                    <Text style={styles.time} numberOfLines={2}>{recipe.readyInMinutes} min</Text>
                                </View>

                                {/* full recipe*/}
                                <Pressable
                                    style={styles.fullRecipe}
                                    onPress={goToFullRecipe}
                                >
                                    <Ionicons name="play" size={24} color="#fff" />
                                </Pressable>
                            </View>
                            {/* Ingredients*/}
                            <View style={styles.IngredientContainer}>
                                <View style={styles.IngredientIconContainer}>
                                    <MaterialCommunityIcons
                                        name="food-variant"
                                        size={40}
                                        color="#fff"
                                    />
                                </View>
                                <FlatList
                                    data={ingredients}
                                    renderItem={({item})=> <IngredientCard ingredient={item}/>}
                                    keyExtractor={item=>item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}

                                />

                            </View>
                            {/*    similar recipes*/}
                            <View style={styles.similarRecipesContainer}>
                                <Text style={styles.similarRecipeTitle}>Similar Recipes</Text>
                                <FlatList
                                    data={similarRecipes}
                                    renderItem={({item})=> <SimilarRecipeCard recipe={item}/>}
                                    keyExtractor={item=> item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                            <Text style={styles.nutritionTitle}>Nutrition</Text>
                        </View>
                        }
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        marginHorizontal: 10,
        color: "#000",
        textAlign: "center"
    },
    imageContainer:{
        marginTop: 40,
        borderRadius: 30,
        alignItems: "center",

    },
    image: {
        height: 200,
        width: 200,
        borderRadius: 30
    },
    duration:{
        height: 60,
        width: 60,
        padding: 5,
        backgroundColor: "#FF7878",
        position: "absolute",
        right: 120,
        bottom: -22,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center"
    },
    time:{
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold"
    },
    fullRecipe: {
        height: 50,
        width: 50,
        backgroundColor: "#FF7878",
        position: "absolute",
        right: 110,
        top: -20,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    IngredientContainer:{
        marginTop: 25,
        flexDirection: "row"
    },
    IngredientIconContainer:{
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        width: 60,
        borderRadius: 35,
        backgroundColor: "#FF7878",
        marginHorizontal: 25
    },
    similarRecipesContainer:{
        marginTop: 20,
        height: 250,
        // backgroundColor: "red"

    },
    similarRecipeTitle:{
        fontSize: 20,
        fontWeight: "600",
        marginLeft: 30,
        marginBottom: 15
    },
    nutritionContainer:{
        marginTop: 10,
    },
    nutritionTitle:{
        fontSize: 20,
        fontWeight: "600",
        marginLeft: 30,
        marginBottom: 15
    }
});
