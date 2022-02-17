import {Dimensions, FlatList, Platform, SafeAreaView, StyleSheet} from 'react-native';


import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import {useEffect, useState} from "react";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export type RecipeCategoryProps = {
    category: {
        id: string;
        categoryName: string;
        tags: string;
    }
}

export default function RecipeCategory(props: RecipeCategoryProps) {

    const [recipes,setRecipes] = useState([]);

    // get recipes based on tags
    const getRandomRecipes = () => {
        axios.get('https://api.spoonacular.com/recipes/random?number=25',{
            params:{
                apiKey: "",
                tags: props.category.tags
            }

        })
            .then((response)=> {
                // handle success
                setRecipes(response.data.recipes)

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

    useEffect(()=>{
        getRandomRecipes();
    },[])

    return (
            <View style={[styles.container,{
                backgroundColor: Colors[colorScheme].background
            }]}>
                {/* category name */}
                <Text
                    style={[styles.categoryName,{
                        color: Colors[colorScheme].text
                    }]}
                >
                    {props.category.categoryName}
                </Text>

                {/* list of recipe cards */}
                <FlatList
                    data={recipes}
                    renderItem={({item})=> <RecipeCard recipe={item}/>}
                    keyExtractor={item=>item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>



    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15
    },
    categoryName:{
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 15,
    }
});
