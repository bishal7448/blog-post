import { Client, Account, Databases } from "appwrite";
import configEnv from "../config/configEnv";

const client = new Client()
    .setEndpoint(configEnv.appwriteUrl)
    .setProject(configEnv.appwriteProjectId);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
