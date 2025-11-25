import { Client, Databases, Permission, Role, ID } from 'node-appwrite';

// Configuration
const client = new Client();
const databases = new Databases(client);

const ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const PROJECT_ID = '69229a6d00111a3423e8';
const API_KEY = 'standard_f0f5b0489d7c8dec9482c014e7b331d487747a1620f3a1f867e3651f3a600684447a9e3d8d4e71afc4ffcb3d43dba68f5c0978860ed604affd824a4be53016d966ed593afa652e7277d840bbf1d07f264e1df6e0f9500d32d37bb0aa480f998f6409aacd0de32f61c58d40f8bc72c9e92a83c8928d09d3f42eb0c26d170d5ea7';

const DB_ID = 'gemini_gems_db';
const COLLECTION_PREFS = 'user_preferences';

client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

async function setup() {
    console.log('🚀 Starting Appwrite Setup...');

    // 1. Create or Get Database
    let dbId = DB_ID;
    try {
        await databases.get(DB_ID);
        console.log(`✅ Database "${DB_ID}" already exists.`);
    } catch (error) {
        console.log(`Database "${DB_ID}" not found. Checking for existing databases...`);
        const dbList = await databases.list();
        if (dbList.total > 0) {
            dbId = dbList.databases[0].$id;
            console.log(`⚠️ Using existing database: "${dbList.databases[0].name}" (${dbId})`);
        } else {
            console.log(`Creating database "${DB_ID}"...`);
            await databases.create(DB_ID, 'Gemini Gems');
            console.log(`✅ Database created.`);
        }
    }

    // Update global DB_ID for subsequent calls if we switched to an existing one
    // Note: In a real app, we'd need to update the frontend config too.
    // For this script, we just use the variable.
    const targetDbId = dbId;

    // 2. Create Collection
    try {
        await databases.getCollection(targetDbId, COLLECTION_PREFS);
        console.log(`✅ Collection "${COLLECTION_PREFS}" already exists.`);
    } catch (error) {
        console.log(`Creating collection "${COLLECTION_PREFS}"...`);
        await databases.createCollection(targetDbId, COLLECTION_PREFS, 'User Preferences', [
            Permission.read(Role.users()),
            Permission.create(Role.users()),
            Permission.update(Role.users()),
            Permission.delete(Role.users()),
        ]);
        console.log(`✅ Collection created.`);
    }

    // 3. Create Attributes
    const attributes = [
        { key: 'userId', type: 'string', size: 255, required: true },
        { key: 'pinnedGems', type: 'string', size: 10000, required: false }, // JSON string
        { key: 'customColors', type: 'string', size: 10000, required: false }, // JSON string
        { key: 'sortPreference', type: 'string', size: 50, required: false, default: 'default' }
    ];

    for (const attr of attributes) {
        try {
            await databases.getAttribute(targetDbId, COLLECTION_PREFS, attr.key);
            console.log(`✅ Attribute "${attr.key}" already exists.`);
        } catch (error) {
            console.log(`Creating attribute "${attr.key}"...`);
            if (attr.type === 'string') {
                await databases.createStringAttribute(targetDbId, COLLECTION_PREFS, attr.key, attr.size, attr.required, attr.default);
            }
            // Add other types if needed
            console.log(`✅ Attribute "${attr.key}" created.`);
            // Wait a bit to avoid rate limits or race conditions
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    console.log('🎉 Appwrite Setup Complete!');
}

setup().catch(console.error);
