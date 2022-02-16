import {Dimensions, FlatList, SafeAreaView, StyleSheet, Image, ScrollView, Pressable} from 'react-native';


import { Text, View } from '../components/Themed';

import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";
import IngredientCard from "../components/IngredientCard";
import {Entypo, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

import SimilarRecipeCard from "../components/SimilarRecipeCard";
import NutrientCard from "../components/NutrientCard";
import EquipmentCard from "../components/EquipmentCard";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";


export default function RecipeScreen() {

    const [recipe,setRecipe] = useState([]);
    const route = useRoute();
    const [recipeId,setRecipeId] = useState(route.params.id);
    const [ingredients,setIngredients] = useState([]);
    const [equipments,setEquipments] = useState([]);
    const [similarRecipes,setSimilarRecipes] = useState([]);
    const [nutrition,setNutrition] = useState([]);

    const navigation = useNavigation();

    const colorScheme = useColorScheme();


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
        // WebBrowser.openBrowserAsync(recipe.sourceUrl);

        navigation.navigate("Instruction",{
            id: recipeId
        });
    }

    const getSimilarRecipes = () => {
        axios.get(`https://api.spoonacular.com/recipes/${recipeId}/similar`,{
            params:{
                apiKey: "",
                normalize: true
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

    const getEquipments = () => {
        axios.get(`https://api.spoonacular.com/recipes/${recipeId}/equipmentWidget.json`,{
            params:{
                apiKey: ""
            }

        })
            .then((response)=> {
                // handle success
                setEquipments(response.data.equipment);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    // const getTaste = () => {
    //     axios.get(`https://api.spoonacular.com/recipes/${recipeId}/tasteWidget.json`,{
    //         params:{
    //             apiKey: "aec1c681869d4aff8737283c1a15a3c5"
    //         }
    //
    //     })
    //         .then((response)=> {
    //             // handle success
    //             console.log(response.data);
    //
    //         })
    //         .catch(function (error) {
    //             // handle error
    //             console.log(error);
    //         })
    //         .then(function () {
    //             // always executed
    //         });
    // }

    useEffect(()=>{
        getRecipe();
        getSimilarRecipes();
        getEquipments();

    },[])
    return (
            <SafeAreaView
                style={[styles.container,{
                    backgroundColor: Colors[colorScheme].background
                }]}>

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
                            <Text style={[styles.title,{
                                color: Colors[colorScheme].text
                            }]}>
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
                                <View style={[styles.duration,{
                                    backgroundColor: Colors[colorScheme].tint
                                }]}>
                                    <Text
                                        style={[styles.time,{
                                            color: Colors[colorScheme].background
                                        }]}
                                        numberOfLines={2}
                                    >
                                        {recipe.readyInMinutes} min
                                    </Text>
                                </View>

                                {/* full recipe*/}
                                <Pressable
                                    style={[styles.fullRecipe,{
                                        backgroundColor: Colors[colorScheme].tint
                                    }]}
                                    onPress={goToFullRecipe}
                                >
                                    <Ionicons name="play" size={24} color="#fff" />
                                </Pressable>
                            </View>
                            {/* Ingredients*/}
                            <View style={styles.ingredientContainer}>
                                <View style={[styles.ingredientIconContainer,{
                                    backgroundColor: Colors[colorScheme].tint
                                }]}>
                                    <Entypo
                                        name="shopping-cart"
                                        size={30} color="#fff"
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
                            {/* equipments*/}
                            <View style={styles.ingredientContainer}>
                                <View style={[styles.ingredientIconContainer,{
                                    backgroundColor: Colors[colorScheme].tint
                                }]}>
                                    <MaterialCommunityIcons
                                        name="toaster-oven"
                                        size={30}
                                        color="#fff"
                                    />
                                </View>
                                <FlatList
                                    data={equipments}
                                    renderItem={({item})=> <EquipmentCard equipment={item}/>}
                                    keyExtractor={item=> item.name}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                            {/*    similar recipes*/}
                            <View style={styles.similarRecipesContainer}>
                                <Text style={[styles.similarRecipeTitle,{
                                    color: Colors[colorScheme].text
                                }]}>
                                    Related Recipes
                                </Text>
                                <FlatList
                                    data={similarRecipes}
                                    renderItem={({item})=> <SimilarRecipeCard recipe={item}/>}
                                    keyExtractor={item=> item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                            <Text
                                style={[styles.nutritionTitle,{
                                    color: Colors[colorScheme].text
                                }]}>Nutrition</Text>
                        </View>
                        }
                    />
                </View>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        marginHorizontal: 10,
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
        position: "absolute",
        right: 120,
        bottom: -22,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center"
    },
    time:{
        fontSize: 15,
        fontWeight: "bold"
    },
    fullRecipe: {
        height: 50,
        width: 50,
        position: "absolute",
        right: 110,
        top: -20,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    ingredientContainer:{
        marginTop: 25,
        flexDirection: "row",
        alignItems: "center"
    },
    ingredientIconContainer:{
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        width: 60,
        borderRadius: 35,
        marginHorizontal: 25
    },
    similarRecipesContainer:{
        marginTop: 20,
        height: 250,
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
