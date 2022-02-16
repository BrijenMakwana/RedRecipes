import React from 'react';
import {StyleSheet, View, Text, Image, FlatList} from "react-native";
import StepItem from "./StepItem";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export type InstructionComponentProps = {
    instruction: {
        steps: [
            {
                number: number;
                step: string;
            }
        ]

    }
}


const InstructionComponent = (props: InstructionComponentProps) => {
    const colorScheme = useColorScheme();

    return (
        <View style={[styles.container,{
            backgroundColor: Colors[colorScheme].background
        }]}>
            <FlatList
                data={props.instruction.steps}
                renderItem={({item})=> <StepItem number={item.number} step={item.step}/>}
                keyExtractor={item=> item.step}
            />
        </View>
    );
};

export default InstructionComponent;

const styles = StyleSheet.create({
    container:{
        width: "90%",
        alignSelf: "center",

    }

});