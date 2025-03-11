import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import NoteList from "../../components/NoteList";
import AddNoteModal from "../../components/AddNoteModal";
import noteService from "../../services/noteService";
import { useRouter } from "expo-router";

import {useAuth} from '@/contexts/AuthContext'

const NoteScreen = () => {

  const router = useRouter()
  const {user,loading:authLoading} = useAuth()
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

useEffect(() => {
  if (!authLoading && !user) {
    router.replace('/auth')
  }
}, [user,authLoading])

  useEffect(() => {
    if (user) {

      fetchNotes();
    }
  }, [user])

  /*
  // for debugging
  useEffect(() => {
    console.log("Updated notes state:",notes)
  }, [notes])
*/
 

  const fetchNotes = async () => {
    setLoading(true);
    const response = await noteService.getNotes(user.$id);
  //  console.log("Fetched data:", response.data);

    if (response.error) {
      setError(response.error);
      Alert.alert('Error', response.error);
    } else {
      setNotes(response.data);
  //    console.log('Notes set in state',response.data)
      setError(null);
    }

    setLoading(false);
  };

  const deleteNote = async (id) => {
    Alert.alert('Delete note', 'Are you sure?', [{text: 'Cancel'},{text:'Delete',onPress: async ()=> {
        const response = await noteService.deleteNote(id)
        if (response?.error) Alert.alert('Error, ',response.error)
            else {
                setNotes(notes.filter((note)=> note.$id !== id))
            }
    }}])
  }

  const addNote = async () => {
    if (newNote.trim() === "") return;
   
    const response = await noteService.addNote(user.$id,newNote)

    if (response.error) {
        Alert.alert('Error, ' ,response.error)
    }
    else {
        setNotes(prevNotes => [...prevNotes, response.data]);
    }
    setNewNote("");
    setModalVisible(false);
  };

 const editNote = async(id,newText)=> {

  if(!newText.trim()) {
    Alert.alert('Error', 'Note text cannot be empty')
    return
  }
  const response = await noteService.updateNote(id,newText)
  if (response.error) {
    Alert.alert('Error', response.error)
  } else {
    setNotes((prev)=>prev.map((note)=>note.$id === id ? {...note, text: response.data.text}: note))
  }
 }

  return (
    <View style={styles.container}>
        {loading? (
            <ActivityIndicator size='large' color='#007bff'/>
        ):
        (
            <>
            {error && <Text>{error}</Text>}
            {notes.length === 0 ? (<Text style={styles.nonotes}>You have no notes</Text>):
            (
            <NoteList notes={notes} onEdit={editNote} onDelete={deleteNote}></NoteList>
            )}
           
            </>
        
        )}
      

      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "white", fontSize: 20 }}> + Add New Note</Text>
      </TouchableOpacity>

      <AddNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={addNote}
      />
    </View>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    //  alignItems: 'center',
    backgroundColor: "white",
  },

  button: {
    backgroundColor: "blue",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  nonotes: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 15,
  }
});
