import {FlatList, Platform, SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';


import SearchBar from "../components/SearchBar";
import {useState} from "react";
import axios from "axios";
import SearchedRecipeCard from "../components/SearchedRecipeCard";

export default function GuessNutritionScreen() {
    const [searchText,setSearchText] = useState("");
    const [queryImage,setQueryImage] = useState("");
    const [nutrition,setNutrition] = useState({});
    const [showResult,setShowResult] = useState(false);

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
                console.log(response.data);
                setShowResult(true);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

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
                console.log(response.data.results[0].links.download);
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

    const getResult = () => {
        getQueryPhoto();
        getNutrition();
    }

    const clearSearch = () => {
        setSearchText("");
        setShowResult(false);
    }

    return (
        <SafeAreaView style={styles.container}>

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
                        <Image
                            source={{
                                uri: queryImage
                            }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <View style={styles.dataContainer}>
                            <Text style={styles.heading}>calories:</Text>
                            <Text style={styles.data}>{nutrition.calories.value} {nutrition.calories.unit}</Text>
                        </View>

                        <View style={styles.dataContainer}>
                            <Text style={styles.heading}>carbs:</Text>
                            <Text style={styles.data}>{nutrition.carbs.value} {nutrition.carbs.unit}</Text>
                        </View>

                        <View style={styles.dataContainer}>
                            <Text style={styles.heading}>fat:</Text>
                            <Text style={styles.data}>{nutrition.fat.value} {nutrition.fat.unit}</Text>
                        </View>

                        <View style={styles.dataContainer}>
                            <Text style={styles.heading}>protein:</Text>
                            <Text style={styles.data}>{nutrition.protein.value} {nutrition.protein.unit}</Text>
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
        backgroundColor: "#fff",
        marginTop: Platform.OS === "android" ? 50 : 0
    },
    nutritionContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    image:{
        height: 300,
        width: 300,
        marginBottom: 20,
        borderRadius: 150,

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
        color: "#FF7878",
        fontWeight: "bold",
        textTransform: "capitalize"
    },
    data:{
        fontSize: 18,
        color: "#000",
        fontWeight: "500",

    }
});
