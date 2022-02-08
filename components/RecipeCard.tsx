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

               {/* image container*/}
                <View style={styles.imageContainer}>
                    <Image
                        source={{
                            uri: props.recipe.image
                        }}
                        style={styles.image}
                        resizeMode= "cover"
                    />
                </View>
                {/* duration*/}
                <View style={styles.duration}>
                    <Text style={styles.timeText} numberOfLines={2}>{props.recipe.readyInMinutes} min</Text>
                </View>
                {/* info */}
                <View style={styles.info}>
                    {/* title */}
                    <Text style={styles.title} numberOfLines={2} ellipsizeMode={"tail"}>
                        {props.recipe.title}
                    </Text>
                    {/* dish type*/}
                    <Text style={styles.dishType}>
                        {props.recipe.dishTypes[0]}
                    </Text>
                    {/*/!* summary*!/*/}
                    {/*<Text style={styles.summary} numberOfLines={7} ellipsizeMode={"tail"}>*/}
                    {/*    {props.recipe.summary}*/}
                    {/*</Text>*/}
                </View>
        </Pressable>
    );
};

export default RecipeCard;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: 250,
        marginLeft: 30,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        elevation: 10,
        shadowOffset:{
            height: 5,
            width: 5
        },
        backgroundColor: "#fff",
        borderRadius: 30,
        marginVertical: 20

    },
    imageContainer: {


    },
    image:{
        height: 180,
        width: 250,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30

    },
    duration:{
        marginTop: 20,
        backgroundColor: "#FF7878",
        borderRadius: 30,
        height: 60,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        position: "absolute",
        top: 130,
        right: 20

    },
    timeText:{
        fontSize: 15,
        fontWeight: "bold",
        color: "#fff"
    },
    info:{
        marginTop: 35,
        padding: 10,
        marginBottom: 10

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
        color: "#000"
    },
    summary: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: "600",
        color: "#000"
    }
});