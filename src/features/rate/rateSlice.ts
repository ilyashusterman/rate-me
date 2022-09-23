import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

import DataFrame, { Row } from "dataframe-js";

import { FormUpload } from "../database/FormUpload";
import { SpreadSheetDatabase } from "../database/SpreadSheetDatabase";
import { UserSessionObj } from "../user/UserSession";

export interface UserRating {
  good: "1" | "" | string;
  bad: "1" | "" | string;
  sexy: "1" | "" | string;
  ugly: "1" | "" | string;
  smart: "1" | "" | string;
  stupid: "1" | "" | string;
  young: "1" | "" | string;
  old: "1" | "" | string;
  slow: "1" | "" | string;
  fast: "1" | "" | string;
  comment: "1" | "" | string;
  user_id_from: string;
  user_id_to: string;
}

export interface RateState {
  user: UserSessionObj | undefined;
  rate: UserRating | undefined;
  status: "idle" | "loading" | "failed";
  response: "idle" | "updated";
}

//https://docs.google.com/spreadsheets/d/178RxwQdfTVrkcDavTDoNRUqddzNfk9MdOQWSUJMIt6M/edit#gid=1514002834
//https://docs.google.com/spreadsheets/d/178RxwQdfTVrkcDavTDoNRUqddzNfk9MdOQWSUJMIt6M/edit?resourcekey#gid=1514002834
const ratingDatabase = new SpreadSheetDatabase(
  "178RxwQdfTVrkcDavTDoNRUqddzNfk9MdOQWSUJMIt6M",
  "1514002834"
);

const initialRate = (user_id_from: string, user_id_to: string): UserRating => {
  return {
    good: "",
    bad: "",
    sexy: "",
    ugly: "",
    smart: "",
    stupid: "",
    young: "",
    old: "",
    slow: "",
    fast: "",
    comment: "",
    user_id_from: user_id_from,
    user_id_to: user_id_to,
  };
};

const RATE_NONE_KEYS = ["Timestamp", "date", "Score"];

const cleanRate = (rate: any) => {
  return Object.entries(rate).reduce((initialValue: any, [key, value]) => {
    if (!RATE_NONE_KEYS.includes(key)) {
      initialValue[key] = value;
    }
    return initialValue;
  }, {});
};
const initialState: RateState = {
  user: undefined,
  rate: initialRate("None", "None"),
  status: "idle",
  response: "idle",
};

export const rateUserAsync = createAsyncThunk(
  "rate/rateUser",
  async (props: any) => {
    const { rate, formRef } = props;
    const formUpload = new FormUpload(formRef);
    await formUpload.submit();
    return "updated";
  }
);
export const dateStringToTimestamp = (dateString: any) => {
  const date = eval("new " + dateString);
  return date.getTime();
};
interface RateInput {
  userIdFrom: string;
  userIdTo: string;
}
export const getRateUser = async ({ userIdFrom, userIdTo }: RateInput) => {
  const rates = await ratingDatabase.getRecords();
  const df = new DataFrame(rates);
  /* @ts-ignore */
  const ratesDates = df.map((row: any) =>
    row.set("date", dateStringToTimestamp(row.get("Timestamp")))
  );
  const sorted = ratesDates.sortBy(["date"], false);
  /* @ts-ignore */
  const filtered = sorted.filter((row) => {
    const user_id_from = row.get("user_id_from");
    const user_id_to = row.get("user_id_to");
    if (user_id_from === userIdFrom && user_id_to === userIdTo) {
      return true;
    }
    return false;
  });
  const tail = filtered.tail(1);
  const items = tail.toCollection();
  if (!items) {
    return undefined;
  }
  const item = items[0];
  return cleanRate(item);
};
export const getRateUserAsync = createAsyncThunk(
  "rate/getRateUser",
  async (props: RateInput) => {
    return await getRateUser(props);
  }
);

export const rateSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {
    setRateUser: (state, action: PayloadAction<UserSessionObj | any>) => {
      state.user = action.payload;
    },
    setRating: (state, action: PayloadAction<UserRating | any>) => {
      state.rate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(rateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(rateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.response = "updated";
      })
      .addCase(rateUserAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getRateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const rate = cleanRate(action.payload);
        state.rate = rate;
      });
  },
});

export const { setRateUser, setRating } = rateSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserRate = (state: RootState) => state.rate.user;
export const selectRating = (state: RootState) => state.rate.rate;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default rateSlice.reducer;
