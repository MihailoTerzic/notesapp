import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import notes from '@/assets/images/notes.png';
import { router, useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function HomeScreen() {
  const {user,loading } = useAuth()
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/notes')
    }
  }, [user,loading])

  if (loading) {
    return <View style={styles.centeredContainer}>
      <ActivityIndicator size='large' color='#007bff'></ActivityIndicator>
    </View>
  }
  return (
    <View
      style={styles.container}
    >
      <Image source={notes} style={styles.image}/>
      <Text style={{fontSize: 40, fontWeight: 'bold'}}>Welcome To Notes App</Text>
      <Text style={{fontSize: 20,}}>Capture your thoughts anywhere anytime</Text>

      <TouchableOpacity style={styles.button} onPress={()=> router.push('/notes')}>
        <Text style={styles.buttonText}>Let's Get Started!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginBottom: 20
  },
  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: '15pt',
    textAlign: 'center'
  },
  buttonText: {
    color: 'white',
    padding: 5,
    fontSize: 15,
  }
})
