import {Dimensions, FlatList, SafeAreaView, StyleSheet, Image, ScrollView} from 'react-native';


import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";

export default function RecipeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

    const [recipe,setRecipe] = useState([]);
    const route = useRoute();
    const [recipeId,setRecipeId] = useState(route.params.id);


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

    useEffect(()=>{
        getRecipe();
    },[])
    return (
        <ScrollView style={styles.container} contentContainerStyle={{alignItems: "center"}}>
            <SafeAreaView style={{alignItems: "center"}}>
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
                    />
                    {/* duration*/}
                    <View style={styles.duration}>
                        <Text style={styles.time}>{recipe.readyInMinutes} min</Text>
                    </View>
                </View>
                {/* information about recipe*/}
                <View style={styles.info}>
                    <Text style={styles.instructions}>
                        {recipe.instructions}
                    </Text>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAEEE7",


    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        marginHorizontal: 10,
        color: "#000"
    },
    imageContainer:{
        marginTop: 40,
        borderRadius: 30,
    },
    image: {
        height: 250,
        width: 250,
        borderRadius: 30
    },
    duration:{
        height: 50,
        width: 50,
        backgroundColor: "#FF7878",
        position: "absolute",
        right: 15,
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
    info:{
        marginTop: 20,
        padding: 20,
        backgroundColor: "#FF7878",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    instructions:{
        fontSize: 18,
        lineHeight: 30,
        color: "#fff",
        fontWeight: "700"
    }
});
