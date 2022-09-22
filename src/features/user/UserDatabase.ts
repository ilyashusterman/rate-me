import { SpreadSheetDatabase } from "../database/SpreadSheetDatabase"

export class UserDatabase extends SpreadSheetDatabase {

    async getUsers() {
        return await this.getRecords();
    }
    isUserExist(userId: string, users: Array<any>): boolean {
        const user = users.find((user: any) => {
            if (!user.hasOwnProperty("user_id")) {
                return false;
            }
            return user.user_id === userId;
        });
        if (user !== null && user !== undefined) {
            return true;
        }
        return false;
    };
}