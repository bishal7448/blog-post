import configEnv from "../config/configEnv"
import { Client, Account, ID } from "appwrite"

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setProject(configEnv.appwriteProjectId) // Project ID
            .setEndpoint(configEnv.appwriteUrl); // Appwrite Endpoint
            
        this.account = new Account(this.client);
    }

    // Sign up a new user
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if(userAccount) {
                // Login the user after successful account creation
                return this.login({email, password});
            }else {
                throw new Error("Failed to create account");
            }
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    // Login an existing user
    async login({email, password}) {
        try {
            const session = await this.account.createEmailPasswordSession(
                email,
                password
            );

            if(session) {
                return session;
            }else {
                throw new Error("Failed to login");
            }
        }catch (error) {
            console.error("Error in login:", error);
            throw error;
        }
    }

    // Logout the current user
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Error in logout:", error);
            throw error;
        }
    }

    // Get current user session
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Error to get current user:", error);
        }

        return null; // Return null if no user is logged in
    }
    
}

const authService = new AuthService()

export default authService
