import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";

export type SearchedRecipeCardProps = {
    recipe:{
        id: number;
        image: string;
        title: string;
    }
}

const SearchedRecipeCard = (props: SearchedRecipeCardProps) => {

    const navigation = useNavigation();

    const goToRecipe = () => {
        navigation.navigate("Recipe",{
            id: props.recipe.id
        })
    }

    return (
        <Pressable style={styles.container}>
        {/*    recipe image */}
            <Image
                source={{
                    uri: props.recipe.image
                }}
                style={styles.image}
            />
        {/*    recipe name */}
            <Text style={styles.name}>
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
        width: "90%",
        alignSelf: "center",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        elevation: 10,
        shadowOffset:{
            height: 5,
            width: 5
        },
        backgroundColor: "#fff",
        marginTop: 20
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
        marginLeft: 10

    }

});