import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export type RecipeCardProps = {
    recipe:{
        id: number;
        title: string;
        readyInMinutes: number;
        sourceUrl: string;

    }
}

const SimilarRecipeCard = (props: RecipeCardProps) => {


    const goToRecipe = () => {
        //go to source url
        WebBrowser.openBrowserAsync(props.recipe.sourceUrl);
    }

    const colorScheme = useColorScheme();

    return (
        <Pressable
            style={[styles.container,{
                backgroundColor: Colors[colorScheme].background
            }]}
            onPress={goToRecipe}
        >
            <Text
                style={[styles.title,{
                    color: Colors[colorScheme].text
                }]}
                numberOfLines={5}
            >
                {props.recipe.title}
            </Text>
            {/* duration*/}
            <View style={[styles.duration,{
                backgroundColor: Colors[colorScheme].tint
            }]}>
                <Text style={[styles.time,{
                    color: Colors[colorScheme].background
                }]}>
                    {props.recipe.readyInMinutes} min
                </Text>
            </View>
        </Pressable>
    );
};

export default SimilarRecipeCard;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 17,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        elevation: 10,
        shadowOffset:{
            height: 5,
            width: 5
        },
        borderRadius: 30,
        height: 170,
        width: 170,
        marginVertical: 10,
        padding: 10

    },
    title:{
        fontSize: 17
    },
    duration:{
        height: 35,
        width: 70,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        borderRadius: 25,
        right: 25,
        bottom: -13,
        padding: 5
    },
    time:{
        fontSize: 17,
        padding: 1,
    }
});