export class GoogleSpreadSheetFetch {
    private spreadSheetId: string
    private gid: string
    constructor(spreadSheetId: string, gid: string) {
        this.spreadSheetId = spreadSheetId
        this.gid = gid
    }
    async fetchJSON(): Promise<Array<any>> {
        const url = this.makeUrl()
        return await this.getJsonItems(url);
    }
    makeUrl(): string {
        return `https://docs.google.com/spreadsheets/d/${this.spreadSheetId}/gviz/tq?tqx=out:json&tq&gid=${this.gid}`
    }
    async getJsonItems(url: string): Promise<Array<any>> {
        const response = await fetch(url)
        const data = await response.text()
        return this.fetchItems(data.slice(47, -2))
    }
    fetchItems(jsonString: string): Array<any> {
        const json = JSON.parse(jsonString);
        const cols = json.table.cols
        const rows = json.table.rows
        const mapCols = cols.reduce(
            (previousValue: any, col: any, index: string) => {
                previousValue[index] = this.cleanColumn(col['label']);
                return previousValue
            }, {}
        );
        const jsonRows = rows.map((row: any) => {
            let newRow: any = {};
            for (const [index, element] of row.c.entries()) {
                newRow[mapCols[index]] = this.getRowCellValue(element)
            }
            return newRow
        });
        return jsonRows;
    }
    getRowCellValue(element: any): any {
        if (element === null || element === undefined) {
            return ""
        }
        return element.v
    }
    cleanColumn(column: string): string {
        return column.replace(/\s/g, '')
    }
}

export const fetchSpreadSheetJson = async (spreadSheetId: string, gid: string) => {
    const googleSpreadSheet = new GoogleSpreadSheetFetch(spreadSheetId, gid)
    return await googleSpreadSheet.fetchJSON()
}