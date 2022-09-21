import { fetchSpreadSheetJson } from "../google-spreadsheet"

export class UserDatabase {
    private spreadSheetId: string
    private gid: string
    constructor(spreadSheetId: string, gid: string) {
        this.spreadSheetId = spreadSheetId
        this.gid = gid
    }
    async getUsers() {
        return await fetchSpreadSheetJson(this.spreadSheetId, this.gid)
    }
    isUserExist(userId: string, users: Array<any>): boolean {
        const user = users.find((user: any) => {
            if (!user.hasOwnProperty("user_id")) {
                return false;
            }
            return user.user_id === userId;
        });
        if (user && user !== null && user !== undefined) {
            return true;
        }
        return false;
    };
}