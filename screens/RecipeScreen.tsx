import {Dimensions, FlatList, SafeAreaView, StyleSheet, Image, ScrollView, Pressable} from 'react-native';


import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import * as WebBrowser from 'expo-web-browser';
import axios from "axios";
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";
import IngredientCard from "../components/IngredientCard";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RecipeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

    const [recipe,setRecipe] = useState([]);
    const route = useRoute();
    const [recipeId,setRecipeId] = useState(route.params.id);
    const [ingredients,setIngredients] = useState([]);


    const getRecipe = () => {
        axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false`,{
            params:{
                apiKey: ""
            }

        })
            .then((response)=> {
                // handle success
                // console.log(response.data.recipes);
                setRecipe(response.data);
                setIngredients(response.data.extendedIngredients);
                // console.log(response.data);
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
        // got to article source
        WebBrowser.openBrowserAsync(recipe.sourceUrl);

    }

    useEffect(()=>{
        getRecipe();
    },[])
    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
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
                        <Text style={styles.time}>{recipe.readyInMinutes} min</Text>
                    </View>
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

                {/* information about recipe*/}
                <View style={styles.info}>
                    <Text style={styles.instructions} numberOfLines={5}>
                        {recipe.instructions}
                    </Text>
                    <Pressable onPress={goToFullRecipe} style={styles.getFullRecipe}>
                        <Text style={styles.getFullRecipeText}>
                            Go to Full Recipe
                        </Text>
                    </Pressable>

                </View>
            </SafeAreaView>
        </ScrollView>
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
        height: 50,
        width: 50,
        backgroundColor: "#FF7878",
        position: "absolute",
        right: 110,
        top: -22,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    time:{
        fontSize: 15,
        color: "#fff",
        fontWeight: "bold"
    },
    IngredientContainer:{
        marginTop: 20,
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
    info:{
        marginTop: 20,
        padding: 20,
        backgroundColor: "#FF7878",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: "90%",
        borderRadius: 30,
        alignSelf: "center"
    },
    instructions:{
        fontSize: 18,
        lineHeight: 30,
        color: "#fff",
        fontWeight: "500"
    },
    getFullRecipe:{
        marginTop: 3,
        width: 130,
        alignSelf: "flex-end"
    },
    getFullRecipeText:{
        color: "#252525",
        fontWeight: "bold"
    }
});
