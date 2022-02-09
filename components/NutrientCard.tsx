import React from 'react';
import {StyleSheet, View, Text, Image} from "react-native";

export type NutrientCardProps = {
    nutrient: {
        name: string;
        amount: number;
        unit: string;

    }
}


const NutrientCard = (props: NutrientCardProps) => {

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{props.nutrient.name}</Text>
            <Text style={styles.data}>{props.nutrient.amount} {props.nutrient.unit}</Text>
        </View>
    );
};

export default NutrientCard;

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        alignSelf: "center",
        width: "90%",
        padding: 7,
        marginVertical: 5,
        flexDirection: "row",


    },
    name: {
        fontSize: 17,
        color: "#FF7878",
        fontWeight: "bold",
    },
    data:{
        fontSize: 15,
        color: "#000",
        fontWeight: "500",
    }

});