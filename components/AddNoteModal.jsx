import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";

const AddNoteModal = ({
  modalVisible,
  setModalVisible,
  newNote,
  setNewNote,
  addNote,
}) => {

  
    
  return (
    <>
      <Modal
        visible={modalVisible}
        style={styles.modal}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>Add New Note</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Input your note here..."
            value={newNote}
            onChangeText={setNewNote}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 6,
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
                setNewNote("");
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={addNote}>
              <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
    padding: 10,
    flex: 1,
  },
  input: {
    padding: 10,
    borderRadius: 15,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,

    width: "80%",
    margin: 20,
  },
});

export default AddNoteModal;
