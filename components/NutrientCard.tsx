import React from 'react';
import {StyleSheet, View, Text, Image} from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export type NutrientCardProps = {
    nutrient: {
        name: string;
        amount: number;
        unit: string;

    }
}


const NutrientCard = (props: NutrientCardProps) => {
    const colorScheme = useColorScheme();

    return (
        <View style={[styles.container,{
            backgroundColor: Colors[colorScheme].background
        }]}>
            <Text style={[styles.name,{
                color: Colors[colorScheme].tint
            }]}>
                {props.nutrient.name}
            </Text>
            <Text style={[styles.data,{
                color: Colors[colorScheme].text
            }]}>{props.nutrient.amount} {props.nutrient.unit}</Text>
        </View>
    );
};

export default NutrientCard;

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "center",
        width: "100%",
        padding: 7,
        marginVertical: 5,
        flexDirection: "row",
    },
    name: {
        fontSize: 17,
        fontWeight: "bold",
        marginLeft: 25
    },
    data:{
        fontSize: 15,
        fontWeight: "500",
        marginRight: 25
    }

});