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
            tags: "paleo"
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
        },
        {
            id: "5",
            categoryName: "Problem with Gluten?",
            tags: "gluten free"
        },
        {
            id: "6",
            categoryName: "Fan of Indian Food",
            tags: "indian"
        }

    ]);


  return (
    <SafeAreaView style={styles.container}>
        <FlatList
            data={categories}
            renderItem={({item})=> <RecipeCategory category={item}/>}
            keyExtractor={item=> item.id}
            showsVerticalScrollIndicator={false}
        />


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});
