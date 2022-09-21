export interface UserSessionObj {
    userID: string
    picture: string
    email: string
    name: string
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
        return JSON.parse(item)


    }
    saveUser(user: any) {
        const serializedUser = JSON.stringify(user)
        sessionStorage.setItem(this.storageKey, serializedUser);
    }
}