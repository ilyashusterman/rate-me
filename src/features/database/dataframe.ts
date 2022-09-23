import { Dictionary } from "@reduxjs/toolkit";

export class DataFrame {
  private data: Array<Dictionary<any>>;
  constructor(data: Array<Dictionary<any>>) {
    this.data = data;
  }
  //   dropDuplicates(...columns) {}
}
