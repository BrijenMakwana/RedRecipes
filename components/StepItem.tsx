import React from 'react';
import {StyleSheet, View, Text, Image} from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export type StepItemProps = {
    number: number;
    step: string;
}


const StepItem = (props: StepItemProps) => {
    const colorScheme = useColorScheme();

    return (
        <View style={[styles.container,{
            backgroundColor: Colors[colorScheme].background
        }]}>
            {/* number of step */}
            <Text style={[styles.number,{
                color: Colors[colorScheme].tint
            }]}>
                Step: {props.number}
            </Text>
            {/* step */}
            <Text style={[styles.step,{
                color: Colors[colorScheme].text
            }]}>
                {props.step}
            </Text>
        </View>
    );
};

export default StepItem;

const styles = StyleSheet.create({
    container:{
        width: "100%",
        padding: 10,
        marginVertical: 5,
    },
    number:{
        fontSize: 20,
        fontWeight: "bold"
    },
    step:{
        fontSize: 17,
        marginTop: 7,
        fontWeight: "500",
    }

});