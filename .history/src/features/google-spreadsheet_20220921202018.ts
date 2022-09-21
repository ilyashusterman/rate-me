
const fetchItems = (jsonString: string) => {
    const json = JSON.parse(jsonString);
    const cols = json.table.cols
    const rows = json.table.rows
    const mapCols = cols.reduce(
        (previousValue: any, col: any, index: string) => {
            previousValue[index] = col['label'];
            return previousValue
        }, {}
    );
    const jsonRows = rows.map((row: any) => {
        let newRow: any = {};
        for (const [index, element] of row.c.entries()) {
            newRow[mapCols[index]] = element.v
        }
        return newRow
    });
    return jsonRows;
}

const getJsonItems = (url: string) => {

    return fetch(url)
        .then(response => response.text())
        .then((data) => {
            return fetchItems(data.slice(47, -2))
        }).catch((e) => console.error(e));
}

class GoogleSpreadSheetFetch {
    private spreadSheetId: string
    private gid: string
    constructor(spreadSheetId: string, gid: string) {
        this.spreadSheetId = spreadSheetId
        this.gid = gid
    }
    async fetchJSON() {
        const url = this.makeUrl()
        return await this.getJsonItems(url);
    }
    makeUrl() {
        return `https://docs.google.com/spreadsheets/d/${this.spreadSheetId}/gviz/tq?tqx=out:json&tq&gid=${this.gid}`
    }
    async getJsonItems(url: string) {
        const response = await fetch(url)
        const data = await response.text()
        return this.fetchItems(data.slice(47, -2))
    }
    fetchItems(jsonString: string) {
        const json = JSON.parse(jsonString);
        const cols = json.table.cols
        const rows = json.table.rows
        const mapCols = cols.reduce(
            (previousValue: any, col: any, index: string) => {
                previousValue[index] = col['label'];
                return previousValue
            }, {}
        );
        const jsonRows = rows.map((row: any) => {
            let newRow: any = {};
            for (const [index, element] of row.c.entries()) {
                newRow[mapCols[index]] = element.v
            }
            return newRow
        });
        return jsonRows;
    }
}

export const fetchSpreadSheetJson = async (spreadSheetId: string, gid: string) => {
    const url = `https://docs.google.com/spreadsheets/d/${spreadSheetId}/gviz/tq?tqx=out:json&tq&gid=${gid}`;
    return await getJsonItems(url)
}