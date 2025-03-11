import { router, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import {useAuth} from '@/contexts/AuthContext'

const AuthScreen = () => {
    const {login,register} = useAuth();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [IsRegistering,setIsRegistering] = useState(false)
    const [error, setError] = useState(false)

    const handleAuth = async ()=> {
        if (!email.trim() || !password.trim()) {
            setError('Input fields are required!')
            return
        }
        if (IsRegistering && password !== confirmPassword) {
            setError ('Passwords dont match')
            return
        }

        let response;

        if (IsRegistering) {
            response = await register(email,password)
        }
        else {
            response = await login(email,password)
        }

        if (response?.error) {
            Alert.alert('Error',response.error)
            return
        }

        router.replace('/notes')
    }

    return (
        <View style={styles.container}>
<Text style={styles.header}>{IsRegistering ? 'Sign Up' : 'Log In'}</Text>

{error ? <Text style={styles.error}>{error}</Text>: null}

<TextInput style={styles.input}
placeholder="Email"
placeholderTextColor={'#aaa'}
value={email}
onChangeText={setEmail}
autoCapitalize="none"
keyboardType="email-adress"
/>

<TextInput style={styles.input}
placeholder="Password"
placeholderTextColor={'#aaa'}
value={password}
onChangeText={setPassword}
secureTextEntry
textContentType="none"
/>

{IsRegistering && (
    <TextInput style={styles.input}
    placeholder="Confirm password"
    placeholderTextColor={'#aaa'}
    value={confirmPassword}
    onChangeText={setConfirmPassword}
    secureTextEntry
    textContentType="none"
    
    />
)}

<TouchableOpacity style={styles.button}
onPress={handleAuth}>
    <Text style={styles.buttonText}>
        {IsRegistering? 'Sign Up' : 'Log in'}
    </Text>
</TouchableOpacity>

<TouchableOpacity onPress={()=> setIsRegistering(!IsRegistering)}>
<Text style={styles.switchText}>
        {IsRegistering? 'Already have an account? Login' : 'Dont have an account? Sign up'}
    </Text>
</TouchableOpacity>
    </View>
    )
}

export  default AuthScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f8f9fa',
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    input: {
      width: '100%',
      padding: 12,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      marginBottom: 12,
      backgroundColor: '#fff',
      fontSize: 16,
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 12,
      borderRadius: 8,
      width: '100%',
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    switchText: {
      marginTop: 10,
      color: '#007bff',
      fontSize: 16,
    },
    error: {
      color: 'red',
      marginBottom: 10,
      fontSize: 16,
    },
  });