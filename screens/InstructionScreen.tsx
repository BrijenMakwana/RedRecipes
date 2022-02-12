import {Dimensions, FlatList, SafeAreaView, StyleSheet} from 'react-native';


import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";
import InstructionComponent from "../components/InstructionComponent";

export default function InstructionScreen() {

    const [instructions,setInstructions] = useState([]);

    const route = useRoute();

    const [recipeId,setRecipeId] = useState(route.params.id);

    const getInstructions = () => {
        axios.get(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`,{
            params:{
                apiKey: ""
            }

        })
            .then((response)=> {
                // handle success
                // console.log(response.data.recipes);
                setInstructions(response.data);
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
        getInstructions();
    },[])
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={instructions}
                renderItem={({item})=> <InstructionComponent instruction={item}/>}
                keyExtractor={item=> item.steps[0].step}
            />


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});
