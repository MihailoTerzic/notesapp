import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';

const NoteItem = ({ note, onDelete, onEdit }) => {
  //  console.log("Rendering NoteItem with note:", note);

  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(note.text)
  const inputRef = useRef(null)

const handleSave = ()=> {
    if (editedText.trim()==='') return;
    onEdit(note.$id,editedText);
    setIsEditing(false)
}

    return (
         <View style={styles.note}>
            {isEditing ? (
                <TextInput
                ref={inputRef}
                value={editedText}
                onChangeText={setEditedText}
                autoFocus
                onSubmitEditing={handleSave}
                returnKeyType='done'
                />
            ) : (

                            <Text style={styles.notetext}>{note.text}</Text>
            )}
            <View style={{flexDirection:'row'}}>

                {isEditing ? (
                    
                    <TouchableOpacity onPress={()=>{
                        handleSave();
                        inputRef.current.blur();
                    }}>
                    <Text>💾</Text>
                </TouchableOpacity>
            
            
        ):(

            
            <TouchableOpacity onPress={()=>{setIsEditing(true);}}>
                        <Text style={{fontSize:20, color: 'blue', marginRight: 10}}>✏</Text>
                    </TouchableOpacity>
                
                    )}
            
                
                            <TouchableOpacity onPress={()=>onDelete(note.$id)}>
                                <Text>❌</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
    );
}

const styles = StyleSheet.create({
    note: {
        paddingVertical: 10,
        marginVertical: 5,
        backgroundColor: 'lightgray',
        padding: 15,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    notetext : {
        fontSize: 18,
    },
})

export default NoteItem;
