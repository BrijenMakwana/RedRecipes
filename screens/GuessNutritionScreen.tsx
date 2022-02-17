import {FlatList, Platform, SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';


import SearchBar from "../components/SearchBar";
import {useState} from "react";
import axios from "axios";
import SearchedRecipeCard from "../components/SearchedRecipeCard";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export default function GuessNutritionScreen() {
    const [searchText,setSearchText] = useState("");
    const [queryImage,setQueryImage] = useState("");
    const [nutrition,setNutrition] = useState({});

    //only to show result when user enters
    const [showResult,setShowResult] = useState(false);

    const colorScheme = useColorScheme();

    //get Nutrition based on user search
    const getNutrition = async () => {
       await axios.get('https://api.spoonacular.com/recipes/guessNutrition',{
            params:{
                apiKey: "",
                title: searchText
            }

        })
            .then((response)=> {
                // handle success

                setNutrition(response.data);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    //get food photo based on user query from unsplash
    const getQueryPhoto = () => {
        axios.get('https://api.unsplash.com/search/photos',{
            params:{
                query: searchText,
                per_page: 1,
                client_id: ""
            }

        })
            .then((response)=> {
                // handle success
                setQueryImage(response.data.results[0].links.download);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    //get all the results
    const getResult = () => {
        if(searchText){
            getQueryPhoto();
            getNutrition().then(()=>
                setShowResult(true)
            );
        }
        else{
            alert("Please type dish name");
        }

    }

    const clearSearch = () => {
        setSearchText("");
        setShowResult(false);
    }

    return (
        <SafeAreaView
            style={[styles.container,
                {
                    backgroundColor: Colors[colorScheme].background
            }]}
        >
            {/* searchbar */}
            <SearchBar
                placeholder= "type dish name here"
                searchText={searchText}
                onChangeText={(text)=>setSearchText(text)}
                onSubmit={getResult}
                onClear={clearSearch}
            />
            {
                showResult &&
                (
                    <View style={styles.nutritionContainer}>
                        {/* title */}
                        <Text
                            style={[styles.title,{
                                color: Colors[colorScheme].tint
                            }]}
                        >
                            nutrition
                        </Text>
                        {/* image of the food */}
                        <Image
                            source={{
                                uri: queryImage || "https://cdn.pixabay.com/photo/2016/12/08/15/45/panda-1892023__340.png"
                            }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        {/* nutrition data */}
                        <View style={styles.dataContainer}>
                            <Text style={[styles.heading,{
                                color: Colors[colorScheme].tint
                            }]}>
                                calories:
                            </Text>
                            <Text style={[styles.data,{
                                color: Colors[colorScheme].text
                            }]}>
                                {nutrition.calories.value} {nutrition.calories.unit}
                            </Text>
                        </View>

                        <View style={styles.dataContainer}>
                            <Text style={[styles.heading,{
                                color: Colors[colorScheme].tint
                            }]}>
                                carbs:
                            </Text>
                            <Text style={[styles.data,{
                                color: Colors[colorScheme].text
                            }]}>
                                {nutrition.carbs.value} {nutrition.carbs.unit}
                            </Text>
                        </View>

                        <View style={styles.dataContainer}>
                            <Text style={[styles.heading,{
                                color: Colors[colorScheme].tint
                            }]}>
                                fat:
                            </Text>
                            <Text style={[styles.data,{
                                color: Colors[colorScheme].text
                            }]}>
                                {nutrition.fat.value} {nutrition.fat.unit}
                            </Text>
                        </View>

                        <View style={styles.dataContainer}>
                            <Text style={[styles.heading,{
                                color: Colors[colorScheme].tint
                            }]}>
                                protein:
                            </Text>
                            <Text style={[styles.data,{
                                color: Colors[colorScheme].text
                            }]}>
                                {nutrition.protein.value} {nutrition.protein.unit}
                            </Text>
                        </View>

                    </View>
                )
            }

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "android" ? 50 : 0
    },
    nutritionContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    title:{
        fontSize: 35,
        textTransform: "capitalize",
        fontWeight: "bold",
    },
    image:{
        height: 300,
        width: 300,
        marginBottom: 20,
        borderRadius: 150,
        marginTop: 20

    },
    dataContainer:{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        justifyContent: "space-between",
        width: "80%",
    },
    heading:{
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "capitalize"
    },
    data:{
        fontSize: 18,
        fontWeight: "500",

    }
});
