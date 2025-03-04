import { Account, Avatars, Client, Databases } from "appwrite";

// Initialize the SDK
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);

const avatars = new Avatars(client);

const databases = new Databases(client);

export { account, avatars, databases };
