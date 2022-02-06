import {Dimensions, FlatList, SafeAreaView, StyleSheet} from 'react-native';


import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import {useEffect, useState} from "react";

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [recipes,setRecipes] = useState([]);

  const getRandomRecipes = () => {
    axios.get('https://api.spoonacular.com/recipes/random?number=50&tags=vegetarian,dessert',{
        params:{
            apiKey: ""
        }

    })
        .then((response)=> {
          // handle success
          // console.log(response.data.recipes);
          setRecipes(response.data.recipes)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
  }

  useEffect(()=>{
    getRandomRecipes();
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
          data={recipes}
          renderItem={({item})=> <RecipeCard recipe={item}/>}
          keyExtractor={item=>item.id}
          horizontal
          snapToAlignment="start"
          decelerationRate={"fast"}
          snapToInterval={Dimensions.get("window").width}
          showsHorizontalScrollIndicator={false}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
