import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";

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

    const navigation = useNavigation();

    const goToRecipe = () => {
        navigation.navigate("Recipe",{
            id: props.recipe.id
        })
    }
    return (
        <Pressable style={styles.container} onPress={goToRecipe}>
            <View style={[styles.recipe,{
                backgroundColor: "#FF7878",
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
        </Pressable>
    );
};

export default RecipeCard;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        alignItems: "center",
        // backgroundColor: "red",
        height: 500

    },
    recipe:{
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
        fontSize: 18,
        fontWeight: "bold",
        color: "#222831"
    },
    dishType:{
        marginTop: 5,
        fontSize: 16,
        fontWeight: "bold",
        color: "#F7F5DD"
    },
    summary: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: "600",
        color: "#fff"
    }
});