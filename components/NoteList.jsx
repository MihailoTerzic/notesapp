import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, onDelete, onEdit }) => {

  return (
    <View>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => 
        {
          //console.log('Rendering fetched notes?',notes)
         // console.log('Rendering fetched notes?',notes)
        //  console.log('StaticNotes',staticNotes)
         // console.log("Rendering item from notes, this is log from notelist", item);
         return <NoteItem note={item} onDelete={onDelete} onEdit={onEdit} />}
        }
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({});

export default NoteList;
