import {Dimensions, FlatList, SafeAreaView, StyleSheet} from 'react-native';


import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import {useEffect, useState} from "react";

export type RecipeCategoryProps = {
    category: {
        id: string;
        categoryName: string;
        tags: string;
    }

}

export default function RecipeCategory(props: RecipeCategoryProps) {

    const [recipes,setRecipes] = useState([]);

    const getRandomRecipes = () => {
        axios.get('https://api.spoonacular.com/recipes/random?number=50',{
            params:{
                apiKey: "",
                tags: props.category.tags
            }

        })
            .then((response)=> {
                // handle success
                // console.log(response.data.recipes);
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

    useEffect(()=>{
        getRandomRecipes();
    },[])
    return (
            <View style={styles.container}>
                <Text style={styles.categoryName}>{props.category.categoryName}</Text>
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
        backgroundColor: "#fff",
        marginTop: 15
    },
    categoryName:{
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 15,
        color: "#000"
    }
});
