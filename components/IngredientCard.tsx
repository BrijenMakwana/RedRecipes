import React from 'react';
import {StyleSheet, View, Text, Image} from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export type IngredientCardProps = {
    ingredient: {
        id: string;
        name: string;
        image: string;
    }
}


const IngredientCard = (props: IngredientCardProps) => {
    const colorScheme = useColorScheme();

    return (
        <View style={[styles.container,{
            backgroundColor: Colors[colorScheme].background
        }]}>
            {/* ingredient image */}
            <Image
                source={{
                    uri: `https://spoonacular.com/cdn/ingredients_100x100/${props.ingredient.image}`
                }}
                style={styles.image}
                resizeMode= "contain"
            />
            {/* ingredient name */}
            <Text
                style={[styles.name,{
                    color: Colors[colorScheme].tint
                }]}
                numberOfLines={2}
            >
                {props.ingredient.name}
            </Text>
        </View>
    );
};

export default IngredientCard;

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        marginHorizontal: 5,
        justifyContent: "center",
        width: 80,
        // backgroundColor: "red"
    },
    image:{
        height: 50,
        width: 50
    },
    name:{
        fontSize: 14,
        textTransform: "capitalize",
        marginTop: 5,
        fontWeight: "bold",
        textAlign: "center"
    }
});