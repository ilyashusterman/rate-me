import SHA256 from 'crypto-js/sha256';
import { User } from './user';


export class UserSession {
    private storageKey: string
    constructor(storageKey: string = "rate_me_user_session") {
        this.storageKey = storageKey
    }
    loadUser(): User | undefined {
        const item = sessionStorage.getItem(this.storageKey)
        if (!item) {
            return undefined
        }
        const user = JSON.parse(item);
        return user
    }
    saveUser(user: User) {
        // user.email = UserSession.encryptString(user.email)
        const serializedUser = JSON.stringify(user)
        sessionStorage.setItem(this.storageKey, serializedUser);
    }
    static encryptString(content: string): any {
        const hashed = SHA256(content).toString()
        return hashed
    }
    removeUser() {
        sessionStorage.removeItem(this.storageKey);
    }
}