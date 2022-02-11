import {Dimensions, FlatList, SafeAreaView, StyleSheet} from 'react-native';


import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import {useEffect, useState} from "react";
import RecipeCategory from "../components/RecipeCategory";

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
    const [categories,setCategories] = useState([
        {
            id: "1",
            categoryName: "Trending Recipes",
            tags: "Paleo"
        },
        {
            id: "2",
            categoryName: "Looking something for Breakfast",
            tags: "breakfast"
        },
        {
            id: "3",
            categoryName: "Best in Salads",
            tags: "salad"
        },
        {
            id: "4",
            categoryName: "Full of Sweetness",
            tags: "dessert"
        }
    ]);


  return (
    <SafeAreaView style={styles.container}>
        <FlatList
            data={categories}
            renderItem={({item})=> <RecipeCategory category={item}/>}
            keyExtractor={item=> item.id}
        />


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    categoryName:{
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 20,
        color: "#000"
    }
});
