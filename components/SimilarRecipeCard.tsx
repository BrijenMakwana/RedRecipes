import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";

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
        // got to recipe source
        WebBrowser.openBrowserAsync(props.recipe.sourceUrl);
    }
    return (
        <Pressable style={styles.container} onPress={goToRecipe}>
            <Text
                style={styles.title}
                numberOfLines={5}
            >
                {props.recipe.title}
            </Text>
            {/* duration*/}
            <View style={styles.duration}>
                <Text style={styles.time}>{props.recipe.readyInMinutes} min</Text>
            </View>
        </Pressable>
    );
};

export default SimilarRecipeCard;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 15,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        elevation: 10,
        shadowOffset:{
            height: 5,
            width: 5
        },
        backgroundColor: "#fff",
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
        backgroundColor: "#FF7878",
        position: "absolute",
        borderRadius: 25,
        right: 25,
        bottom: -13,
        padding: 5
    },
    time:{
        fontSize: 17,
        padding: 1,
        color: "#fff"

    }
});