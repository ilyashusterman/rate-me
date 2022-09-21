interface UserSessionObj {
    userID: string
    picture: string
    email: string
    name: string
}

export class UserSession {
    private storageKey: string
    constructor(storageKey: string = "rate_me_user_session") {
        this.storageKey = storageKey
    }
    loadUser(): UserSessionObj {

    }
    setUser(user: any) {

    }
}