import { FlatList, SafeAreaView, StyleSheet} from 'react-native';

import axios from "axios";
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";
import InstructionComponent from "../components/InstructionComponent";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export default function InstructionScreen() {

    const [instructions,setInstructions] = useState([]);

    const route = useRoute();

    const [recipeId,setRecipeId] = useState(route.params.id);

    //get instructions for the recipe based on recipe id
    const getInstructions = () => {
        axios.get(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`,{
            params:{
                apiKey: ""
            }

        })
            .then((response)=> {
                // handle success
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

    const colorScheme = useColorScheme();

    useEffect(()=>{
        getInstructions();
    },[])

    return (
        <SafeAreaView
            style={[styles.container,{
                backgroundColor: Colors[colorScheme].background
            }]}>
            {/* list of instructions set */}
            <FlatList
                data={instructions}
                renderItem={({item})=> <InstructionComponent instruction={item}/>}
                keyExtractor={item=> item.steps[0].step}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
