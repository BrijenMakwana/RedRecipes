import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from "react-native";

export type RecipeCardProps = {
    recipe:{
       id: number;
       image: string;
       readyInMinutes: number;
       title: string;
       dishTypes: [string];
       summary: string;

    }
}

const RecipeCard = (props: RecipeCardProps) => {
    // const ColorCode = 'rgb(' + (Math.floor(Math.random() * 256))*(1/4) + ',' + (Math.floor(Math.random() * 256))*(1/2) + ',' + (Math.floor(Math.random() * 256))*(3/4) + ')';

    return (
        <View style={styles.container}>
            <View style={[styles.recipe,{
                backgroundColor: "#B0EACD",
            }]}>


               {/* image container*/}
                <View style={styles.imageContainer}>
                    <Image
                        source={{
                            uri: props.recipe.image
                        }}
                        style={styles.image}
                    />
                </View>
                {/*duration*/}
                <View style={styles.duration}>
                    <Text style={styles.timeText} numberOfLines={2}>{props.recipe.readyInMinutes} min</Text>
                </View>
                {/*info */}
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={2} ellipsizeMode={"tail"}>
                        {props.recipe.title}
                    </Text>
                    <Text style={styles.dishType}>
                        {props.recipe.dishTypes[0]}
                    </Text>
                    <Text style={styles.summary} numberOfLines={7} ellipsizeMode={"tail"}>
                        {props.recipe.summary}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default RecipeCard;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        alignItems: "center"
        // backgroundColor: "red"

    },
    recipe:{
        backgroundColor: "#AEE6E6",
        width: "60%",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 25

    },
    imageContainer: {
        marginTop: 20,

    },
    image:{
        height: 130,
        width: 130,

    },
    duration:{
        marginTop: 20,
        backgroundColor: "#fff",
        borderRadius: 30,
        height: 60,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
        padding: 5

    },
    timeText:{
        fontSize: 15,
        fontWeight: "bold"
    },
    info:{
        marginTop: 15,
        padding: 10
    },
    title:{
        fontSize: 17,
        fontWeight: "bold"
    },
    dishType:{
        marginTop: 5,
        fontSize: 15,
        fontWeight: "500"
    },
    summary: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: "400"
    }
});