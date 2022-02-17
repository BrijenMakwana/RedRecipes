import { FlatList, Platform, SafeAreaView, StyleSheet} from 'react-native';

import { useState} from "react";
import RecipeCategory from "../components/RecipeCategory";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

export default function HomeScreen() {
    //food categories to show on home screen
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
        },
        {
            id: "7",
            categoryName: "Best in Chicken",
            tags: "chicken"
        }

    ]);

    const colorScheme = useColorScheme();


  return (
    <SafeAreaView
        style={[styles.container,{
            backgroundColor: Colors[colorScheme].background
        }]}
    >
        {/* list of food categories */}
        <FlatList
            data={categories}
            renderItem={({item})=> <RecipeCategory category={item}/>}
            keyExtractor={item=> item.id}
            showsVerticalScrollIndicator={false}
            style={{
                marginTop: Platform.OS === "android" ? 40 : 0
            }}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
