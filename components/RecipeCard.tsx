import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export type RecipeCardProps = {
    recipe:{
       id: number;
       image: string;
       readyInMinutes: number;
       title: string;
       dishTypes: [string];

    }
}

const RecipeCard = (props: RecipeCardProps) => {

    const navigation = useNavigation();

    const colorScheme = useColorScheme();

    const goToRecipe = () => {
        navigation.navigate("Recipe",{
            id: props.recipe.id
        })
    }
    return (
        <Pressable
            style={[styles.container,{
                backgroundColor: Colors[colorScheme].background
            }]}
            onPress={goToRecipe}
        >

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
                <View style={[styles.duration,{
                    backgroundColor: Colors[colorScheme].tint
                }]}>
                    <Text
                        style={[styles.timeText,{
                            color: Colors[colorScheme].background
                        }]}
                        numberOfLines={2}
                    >
                        {props.recipe.readyInMinutes} min
                    </Text>
                </View>
                {/* info */}
                <View style={styles.info}>
                    {/* title */}
                    <Text
                        style={[styles.title,{
                            color: Colors[colorScheme].text
                        }]}
                        numberOfLines={2}
                        ellipsizeMode={"tail"}
                    >
                        {props.recipe.title}
                    </Text>
                    {/* dish type*/}
                    <Text
                        style={[styles.dishType,{
                            color: Colors[colorScheme].text
                        }]}
                    >
                        {props.recipe.dishTypes[0]}
                    </Text>
                </View>
        </Pressable>
    );
};

export default RecipeCard;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: 250,
        marginLeft: 20,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        elevation: 10,
        shadowOffset:{
            height: 5,
            width: 5
        },
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
    },
    info:{
        marginTop: 35,
        padding: 10,
        marginBottom: 10
    },
    title:{
        fontSize: 18,
        fontWeight: "bold",
    },
    dishType:{
        marginTop: 5,
        fontSize: 16,
        fontWeight: "bold",
    }
});