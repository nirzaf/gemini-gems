import { Client, Account, Databases, Functions } from 'appwrite';

export const client = new Client();

client
    .setEndpoint(import.meta.env.PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(import.meta.env.PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const functions = new Functions(client);

// Constants for DB configuration
export const DB_ID = import.meta.env.PUBLIC_APPWRITE_DATABASE_ID || 'gemini_gems_db';
export const COLLECTION_PREFS = 'user_preferences';
export const FUNCTION_ID = import.meta.env.PUBLIC_APPWRITE_FUNCTION_ID || '';
