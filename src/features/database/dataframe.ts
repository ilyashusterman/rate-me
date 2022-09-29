import { Dictionary } from "@reduxjs/toolkit";

import { DataFrame as DataFrameJs } from "dataframe-js";

export const dateStringToTimestamp = (dateString: any) => {
  const date = eval("new " + dateString);
  return date.getTime();
};

interface DataFrameInput {
  data?: Array<Dictionary<any>> | undefined
  df?: DataFrameJs | undefined
}
export class DataFrame {

  private data: Array<Dictionary<any>> | undefined;
  private df: DataFrameJs;
  constructor({ data = undefined, df = undefined }: DataFrameInput) {
    this.data = data || undefined;
    /* @ts-ignore */
    this.df = df || new DataFrameJs(this.data);
  }
  toTimestamp(column: string = "date", fromColumn: string = "Timestamp", inplace: boolean = false): DataFrame {
    /* @ts-ignore */
    const df = this.df.map((row: any) =>
      row.set(column, dateStringToTimestamp(row.get(fromColumn)))
    ).sortBy(["date"], true);
    return this.initializeDataframe(df, inplace)
  }
  locEquals(locKwargs: Dictionary<any>, inplace: boolean = false): DataFrame {
    /* @ts-ignore */
    const df: DataFrameJs = this.df.filter((row: any) => {
      const bools = Object.entries(locKwargs).reduce((isRow: any, [key, value]) => {
        return isRow && (row.get(key) === value)
      }, true)
      return bools;
    });
    return this.initializeDataframe(df, inplace)
  }

  loc(callBackFilter: any, inplace: boolean = false) {
    const df = this.df.filter(callBackFilter)
    return this.initializeDataframe(df, inplace)
  }
  dropDuplicatesEquals(locKwargs: Dictionary<any>): DataFrame {
    const df = this.toTimestamp();
    return df.locEquals(locKwargs)
  }
  getLastUniqueEquals(locKwargs: Dictionary<any>): Dictionary<any> | undefined {
    const df = this.dropDuplicatesEquals(locKwargs);
    const itemDF = df.last();
    const items = itemDF.toCollection();
    if (!items) {
      return undefined;
    }
    return items[0];
  }
  last(): any {
    return this.df.tail(1);
  }
  dropDuplicates(...columnNames: string[]) {
    const df = this.toTimestamp();
    const dfSorted = df.sort(["date"], true)
    const dfUnique = dfSorted.df.dropDuplicates(...columnNames)
    return dfUnique
  }
  sort(columnNames: string | string[], reverse: boolean = true, missingValuesPosition?: string): DataFrame {
    const df = this.df.sortBy(columnNames, reverse)
    return this.initializeDataframe(df)
  }
  initializeDataframe(df: DataFrameJs, inplace: boolean = false): DataFrame {
    if (inplace) {
      this.df = df;
      return this
    }
    return new DataFrame({ df: df, data: this.data })
  }
}

export const fetchUniqueRecords = (records: any, ...columns: any) => {
  const df = new DataFrame({ data: records })
  const unique = df.dropDuplicates(...columns)
  const uniqueRecords = unique.toCollection()
  return uniqueRecords
}