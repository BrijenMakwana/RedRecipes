import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions, Pressable} from "react-native";
import {useNavigation} from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import {AntDesign} from "@expo/vector-icons";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export type RecipeVideoProps = {
    recipeVideo: {
        youTubeId: string;
        thumbnail: string;
        shortTitle: string;
        length: number;
    }
}


const RecipeVideo = (props: RecipeVideoProps) => {

    const navigation = useNavigation();

    const colorScheme = useColorScheme();

    // go to recipe video
    const goToRecipe = () => {
        //go to source url
        WebBrowser.openBrowserAsync(`https://www.youtube.com/watch?v=${props.recipeVideo.youTubeId}`);
    }

    return (
        <Pressable
            style={[styles.container,{
                backgroundColor: Colors[colorScheme].background
            }]}
            onPress={goToRecipe}
        >
            {/* video thumbnail */}
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: props.recipeVideo.thumbnail
                    }}
                    style={styles.image}
                    resizeMode= "cover"
                />
            </View>

            {/*    video title */}
            <Text
                style={[styles.title,{
                    color: Colors[colorScheme].text
                }]}
                numberOfLines={1}>
                {props.recipeVideo.shortTitle}
            </Text>

            {/*    video duration */}
            <View style={[styles.duration,{
                backgroundColor: Colors[colorScheme].tint
            }]}>
                <AntDesign name="youtube" size={24} color="#fff" />
                {/* time */}
                <Text style={[styles.time,{
                    color: Colors[colorScheme].background
                }]}
                >
                    {Math.round(props.recipeVideo.length/60)} min
                </Text>
            </View>
        </Pressable>
    );
};

export default RecipeVideo;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.5,
        elevation: 10,
        shadowOffset:{
            height: 5,
            width: 5
        },
        borderRadius: 30,
        width: "90%",
        height: 270,
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 10
    },
    imageContainer:{
        width: "100%"
    },
    image:{
        height: 180,
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    title:{
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 40,
        marginHorizontal: 10
    },
    duration:{
        width: 100,
        height: 40,
        position: "absolute",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 30,
        top: 160,
        right: 20,
        flexDirection: "row",
    },
    time:{
        fontSize: 15,
        fontWeight: "bold",
    }
});