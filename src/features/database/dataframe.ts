import { Dictionary } from "@reduxjs/toolkit";

import { DataFrame as DataFrameJs } from "dataframe-js";

export const dateStringToTimestamp = (dateString: any) => {
  const date = eval("new " + dateString);
  return date.getTime();
};

export class DataFrame {
  private data: Array<Dictionary<any>>;
  private df: DataFrameJs;
  constructor(data: Array<Dictionary<any>>) {
    this.data = data;
    this.df = new DataFrameJs(this.data);
  }
  toTimestamp(df: DataFrameJs, column: string = "date", fromColumn: string = "Timestamp") {
    /* @ts-ignore */
    return df.map((row: any) =>
      row.set(column, dateStringToTimestamp(row.get(fromColumn)))
    ).sortBy(["date"], false);;
  }
  locEquals(df: DataFrameJs, locKwargs: Dictionary<any>) {
    /* @ts-ignore */
    return df.filter((row: any) => {
      const bools = Object.entries(locKwargs).reduce((isRow: any, [key, value]) => {
        return isRow && (row.get(key) === value)
      }, true)
      return bools;
    });
  }
  dropDuplicates(locKwargs: Dictionary<any>): DataFrameJs {
    const df = this.toTimestamp(this.df);
    return this.locEquals(df, locKwargs)
  }
  getLastUnique(locKwargs: Dictionary<any>): Dictionary<any> | undefined {
    const df = this.dropDuplicates(locKwargs);
    const itemDF = this.last(df);
    const items = itemDF.toCollection();
    if (!items) {
      return undefined;
    }
    return items[0];
  }
  last(df: DataFrameJs): any {
    return df.tail(1);
  }
}
