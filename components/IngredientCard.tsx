import React from 'react';
import {StyleSheet, View, Text, Image} from "react-native";

export type IngredientCardProps = {
    ingredient: {
        id: string;
        name: string;
        image: string;
    }
}


const IngredientCard = (props: IngredientCardProps) => {

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: `https://spoonacular.com/cdn/ingredients_100x100/${props.ingredient.image}`
                }}
                style={styles.image}
                resizeMode= "contain"
            />
            <Text style={styles.name}>
                {props.ingredient.name}
            </Text>
        </View>
    );
};

export default IngredientCard;

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        marginHorizontal: 10,
        justifyContent: "center",

    },
    image:{
        height: 50,
        width: 50
    },
    name:{
        fontSize: 14,
        textTransform: "capitalize",
        marginTop: 5,
        color: "#FF7878",
        fontWeight: "bold"
    }
});