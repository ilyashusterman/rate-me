import { Dictionary } from "@reduxjs/toolkit";
import { DatabaseFB } from "../database/firebase";
import { User } from "./user";


export const initialSignUpUser = (): User => {
    return {
        name: "",
        email: "",
        facebookImageUrl: "",
        facebookURL: "",
        picture: "",
        userId: "",
    };
};

export class UserDatabase extends DatabaseFB {

    constructor() {
        super("users/")
    }
    async getUsers(): Promise<Array<Dictionary<any>>> {
        return Object.values(await this.all());
    }
    async saveUser(user: User) {
        return await this.saveObj(`${this.endpoint}${user.userId}`, user)
    }
    async isUserExist(userId: string) {
        const endpoint = `${this.endpoint}${userId}`
        return await this.isRecordExist(endpoint)
    }
}