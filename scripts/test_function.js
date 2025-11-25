import * as sdk from 'node-appwrite';

const ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const PROJECT_ID = '69229a6d00111a3423e8';
const API_KEY = 'standard_f0f5b0489d7c8dec9482c014e7b331d487747a1620f3a1f867e3651f3a600684447a9e3d8d4e71afc4ffcb3d43dba68f5c0978860ed604affd824a4be53016d966ed593afa652e7277d840bbf1d07f264e1df6e0f9500d32d37bb0aa480f998f6409aacd0de32f61c58d40f8bc72c9e92a83c8928d09d3f42eb0c26d170d5ea7';
const FUNCTION_ID = '6922df68331cc6c25b69';

async function run() {
  const client = new sdk.Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

  const functions = new sdk.Functions(client);

  const exec = await functions.createExecution(
    FUNCTION_ID,
    JSON.stringify({ action: 'get', userId: 'verify-user' })
  );

  const det = await functions.getExecution(FUNCTION_ID, exec.$id);
  console.log('status:', det.status);
  console.log('logs:', det.logs);
  console.log('errors:', det.errors);
  console.log('response:', det.responseBody);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});