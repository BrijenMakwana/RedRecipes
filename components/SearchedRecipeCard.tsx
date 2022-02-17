import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export type SearchedRecipeCardProps = {
    recipe:{
        id: number;
        image: string;
        title: string;
    }
}

const SearchedRecipeCard = (props: SearchedRecipeCardProps) => {

    const navigation = useNavigation();

    const colorScheme = useColorScheme();

    //go to recipe screen
    const goToRecipe = () => {
        navigation.navigate("Recipe",{
            id: props.recipe.id
        })
    }

    return (
        <Pressable
            style={[styles.container,{
                backgroundColor: Colors[colorScheme].background
            }]}
            onPress={goToRecipe}
        >
        {/*    recipe image */}
            <Image
                source={{
                    uri: props.recipe.image
                }}
                style={styles.image}
                resizeMode= "cover"
            />
        {/*    recipe name */}
            <Text
                style={[styles.name,{
                    color: Colors[colorScheme].text
                }]}
                numberOfLines={3}
            >
                {props.recipe.title}
            </Text>
        </Pressable>
    );
};

export default SearchedRecipeCard;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        width: "85%",
        height: 150,
        alignSelf: "center",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        elevation: 10,
        shadowOffset:{
            height: 5,
            width: 5
        },
        marginTop: 20,
        marginBottom: 10
    },
    image:{
        height: 150,
        width: 150,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30
    },
    name:{
        fontSize: 20,
        width: 150,
        marginLeft: 10,
        fontWeight: "bold",
    }

});