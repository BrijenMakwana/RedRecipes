import React from 'react';
import {StyleSheet, View, Text, Image} from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export type EquipmentCardProps = {
    equipment: {
        name: string;
        image: string;
    }
}

const EquipmentCard = (props: EquipmentCardProps) => {
    const colorScheme = useColorScheme();

    return (
        <View style={[styles.container,{
            backgroundColor: Colors[colorScheme].background
        }]}>
            {/* equipment image */}
            <Image
                source={{
                    uri: `https://spoonacular.com/cdn/equipment_100x100/${props.equipment.image}`
                }}
                style={styles.image}
                resizeMode= "contain"
            />
            {/* equipment name */}
            <Text
                style={[styles.name,{
                    color: Colors[colorScheme].tint
                }]}
                numberOfLines={2}
            >
                {props.equipment.name}
            </Text>
        </View>
    );
};

export default EquipmentCard;

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        marginHorizontal: 5,
        justifyContent: "center",
        width: 80,
        height: 80
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