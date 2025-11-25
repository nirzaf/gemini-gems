import * as sdk from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';
const { Client, Functions } = sdk;
import AdmZip from 'adm-zip';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const PROJECT_ID = '69229a6d00111a3423e8';
const API_KEY = 'standard_f0f5b0489d7c8dec9482c014e7b331d487747a1620f3a1f867e3651f3a600684447a9e3d8d4e71afc4ffcb3d43dba68f5c0978860ed604affd824a4be53016d966ed593afa652e7277d840bbf1d07f264e1df6e0f9500d32d37bb0aa480f998f6409aacd0de32f61c58d40f8bc72c9e92a83c8928d09d3f42eb0c26d170d5ea7';
const FUNCTION_NAME = 'managePreferences';
const FUNCTION_ID = '6922df68331cc6c25b69';
const RUNTIME = 'node-18.0';

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const functions = new Functions(client);

async function deploy() {
    console.log('🚀 Starting Function Deployment...');

    // 1. Expect a prebuilt tarball to exist (created via OS tar)
    const tarPath = path.join(__dirname, 'temp_function.tar.gz');
    if (!fs.existsSync(tarPath)) {
        console.error('❌ Missing temp_function.tar.gz. Please create it before running this script.');
        console.error('   Example: tar -czf scripts/temp_function.tar.gz -C functions/managePreferences .');
        return;
    }
    console.log('✅ Found function package (tar.gz).');

    const functionId = FUNCTION_ID;
    // 2. Ensure function exists (by ID); if not, create by name
    try {
        await functions.get(functionId);
        console.log(`ℹ️ Target function exists (${functionId}). Proceeding to deploy.`);
    } catch (e) {
        console.log(`⚠️ Function ID ${functionId} not found. Creating function "${FUNCTION_NAME}"...`);
        const newFunc = await functions.create(
            functionId,
            FUNCTION_NAME,
            RUNTIME
        );
        console.log(`✅ Function created (${newFunc.$id}).`);
    }

    // 3. Create Deployment
    try {
        console.log('Uploading deployment...');
        const inputFile = InputFile.fromPath(tarPath, 'code.tar.gz');
        const deployment = await functions.createDeployment(
            functionId,
            inputFile,
            true, // Activate immediately
            'src/main.js' // Entrypoint
        );
        console.log(`✅ Deployment created and activated: ${deployment.$id}`);
    } catch (e) {
        console.error('Error creating deployment:', e);
    }

    // 4. Update Variables (Environment Variables)
    try {
        console.log('Updating environment variables...');
        // We need to add the API Key so the function can access the DB

        const vars = [
            { key: 'APPWRITE_API_KEY', value: API_KEY },
            { key: 'APPWRITE_FUNCTION_PROJECT_ID', value: PROJECT_ID }
        ];

        for (const v of vars) {
            try {
                await functions.createVariable(functionId, v.key, v.value);
            } catch (e) {
                // Variable might already exist, try update
                try {
                    await functions.updateVariable(functionId, v.key, v.key, v.value);
                } catch (err) {
                    // Ignore if it fails, might be same value
                }
            }
        }
        console.log('✅ Environment variables updated.');

    } catch (e) {
        console.error('Error updating variables:', e);
    }

    // No cleanup: keep tarball for re-deploys

    console.log('🎉 Deployment Complete!');
    console.log(`FUNCTION_ID: ${functionId}`);
}

deploy().catch(console.error);
