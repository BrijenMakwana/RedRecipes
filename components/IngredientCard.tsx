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
            {/* ingredient image */}
            <Image
                source={{
                    uri: `https://spoonacular.com/cdn/ingredients_100x100/${props.ingredient.image}`
                }}
                style={styles.image}
                resizeMode= "contain"
            />
            {/* ingredient name */}
            <Text style={styles.name} numberOfLines={2}>
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
        color: "#FF7878",
        fontWeight: "bold",
        textAlign: "center"
    }
});