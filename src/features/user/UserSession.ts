import SHA256 from 'crypto-js/sha256';
import { UserRate } from './user';

export interface UserSessionObj extends UserRate {
    response: any
}

export class UserSession {
    private storageKey: string
    constructor(storageKey: string = "rate_me_user_session") {
        this.storageKey = storageKey
    }
    loadUser(): UserSessionObj | undefined {
        const item = sessionStorage.getItem(this.storageKey)
        if (!item) {
            return undefined
        }
        const user = JSON.parse(item);
        return user
    }
    saveUser(user: UserSessionObj) {
        user.email = UserSession.encryptString(user.email)
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