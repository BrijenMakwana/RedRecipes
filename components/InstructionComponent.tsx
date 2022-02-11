import React from 'react';
import {StyleSheet, View, Text, Image, FlatList} from "react-native";
import StepItem from "./StepItem";

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

    return (
        <View style={styles.container}>
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
        backgroundColor: "#fff",
        width: "90%",
        alignSelf: "center",

    }

});