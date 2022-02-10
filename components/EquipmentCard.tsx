import React from 'react';
import {StyleSheet, View, Text, Image} from "react-native";

export type EquipmentCardProps = {
    equipment: {
        name: string;
        image: string;
    }
}


const EquipmentCard = (props: EquipmentCardProps) => {

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: `https://spoonacular.com/cdn/equipment_100x100/${props.equipment.image}`
                }}
                style={styles.image}
                resizeMode= "contain"
            />
            <Text style={styles.name} numberOfLines={2}>
                {props.equipment.name}
            </Text>
        </View>
    );
};

export default EquipmentCard;

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        marginHorizontal: 10,
        justifyContent: "center",
        width: 100
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