import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("6948e5a90014745ad64b");

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
