import { account } from "./appwrite";
import { ID } from "react-native-appwrite";

const authService = {
    // Register
    async register(email,password) {
        try {
            const response = await account.create(ID.unique(),email,password)
            return response
        }
        catch(err) {
            return {error: err.message || 'Registration failed, please try again'}
        }
    },
    async login(email,password) {
        try {
            const response = await account.createEmailPasswordSession(email,password)
            return response
        }
        catch(err) {
            return {error: err.message || 'Log in failed, please try again'}
        }
    },
    async getUser() {
        try {
            const response = await account.get()
            return response
        }
        catch(err) {
            return null
        }
    },
    async logout() {
        try {
            await account.deleteSession('current')
        } catch (error) {
            return {error: err.message || 'Log out failed, please try again'}
        }
    }
}

export default authService