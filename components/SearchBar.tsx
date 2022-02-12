import React from 'react';
import {StyleSheet, View, TextInput, Pressable} from "react-native";
import { FontAwesome, MaterialIcons} from "@expo/vector-icons";

export type SearchBarProps ={
    placeholder: string;
    searchText: string;
    onChangeText: (text: string) => void;
    onSubmit: () => void;
    onClear: () => void;
}

const SearchBar = (props: SearchBarProps) => {

    return (
        <View style={styles.container}>
            {/*   search icon */}
            <FontAwesome name="search" size={20} color="#FF7878" />
            {/*    texInput for search */}
            <TextInput
                placeholder={props.placeholder}
                value={props.searchText}
                onChangeText={props.onChangeText}
                onSubmitEditing={props.onSubmit}
                style={styles.searchInput}
            />
            {/*    clear button */}
            <Pressable style={styles.clear} onPress={props.onClear}>
                <MaterialIcons name="clear" size={24} color="black" />
            </Pressable>

        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#fff",
        flexDirection: "row",
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: "#FF7878",
        borderRadius: 15,
        padding: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    searchInput:{
        flex: 1,
        marginLeft: 10
    },
    clear:{
        padding: 1,
        justifyContent: "center",
        alignItems: "center"
    }

});