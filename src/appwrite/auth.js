import {Client, Account, ID} from 'appwrite'
import config from '../config/config'

export class AuthService {
    client = new Client()
    account;

    constructor(){
        this.client
            .setProject(config.appwriteId)
            .setEndpoint(config.appwriteUrl)

        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(
            ID.unique(), email, password, name
            )
            if (userAccount) {
                return await this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(
                email, password
            )
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            if (error.code === 401) return null;
            console.error(error);
            return null
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions() 
        } catch (error) {
            
        }
    }
}

const authService = new AuthService()

export default authService