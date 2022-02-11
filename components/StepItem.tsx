import React from 'react';
import {StyleSheet, View, Text, Image} from "react-native";

export type StepItemProps = {
    number: number;
    step: string;
}


const StepItem = (props: StepItemProps) => {

    return (
        <View style={styles.container}>
            <Text style={styles.number}>Step: {props.number}</Text>
            <Text style={styles.step}>{props.step}</Text>
        </View>
    );
};

export default StepItem;

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#fff",
        width: "100%",
        padding: 10,
        marginVertical: 5,
    },
    number:{
        fontSize: 20,
        color: "#FF7878",
        fontWeight: "bold"
    },
    step:{
        fontSize: 17,
        marginTop: 7,
        fontWeight: "500",
        color: "#000"
    }

});