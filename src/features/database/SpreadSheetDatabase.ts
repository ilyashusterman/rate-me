import { fetchSpreadSheetJson } from "./google-spreadsheet"

export class SpreadSheetDatabase {
    private spreadSheetId: string
    private gid: string
    constructor(spreadSheetId: string, gid: string) {
        this.spreadSheetId = spreadSheetId
        this.gid = gid
    }
    async getRecords() {
        return await fetchSpreadSheetJson(this.spreadSheetId, this.gid)
    }
}