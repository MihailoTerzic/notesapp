import { Platform } from "react-native";
import { Client, Databases, Account } from "react-native-appwrite";

const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env. EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    database: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    collection:{
        notes: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_NOTES_ID,
    } ,
        

}

const client = new Client()
.setEndpoint(config.endpoint)
.setProject(config.projectId)

/*
switch (Platform.OS) {
    case 'android':
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_ANDROID_ID)        
        break;
case "ios":
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_IOS_ID)        
    break;
    default:
        break;
}
        */

const database = new Databases(client)

const account = new Account(client)

export {database,config,client,account}