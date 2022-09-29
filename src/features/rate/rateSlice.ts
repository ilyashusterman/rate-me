import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { DatabaseFB } from "../database/firebase";

import { User } from "../user/user";


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
    user: User | undefined;
    rate: UserRating | undefined;
    status: "idle" | "loading" | "failed";
    response: "idle" | "updated";
}

export class RatingDatabase extends DatabaseFB {

    constructor() {
        super("rates/")
    }
    async getRate(user_id_from: string, user_id_to: string) {
        const endpoint = `${user_id_from}-${user_id_to}`;
        return await this.getRecord(endpoint)
    }
    async saveRate(rate: UserRating) {
        return await this.saveObj(`${this.endpoint}${rate.user_id_from}-${rate.user_id_to}`, rate)
    }
    async updateRate(rate: UserRating) {
        return await this.updateObj(`${this.endpoint}${rate.user_id_from}-${rate.user_id_to}`, rate)
    }
}
const ratingDatabase = new RatingDatabase();
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

const cleanRate = (rate: any = undefined) => {
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
        const { rate } = props;
        const rateSaved = await ratingDatabase.saveRate(rate);
        return "updated";
    }
);
export const rateUserUpdateAsync = createAsyncThunk(
    "rate/rateUserUpdate",
    async (props: any) => {
        const { rate } = props;
        const rateSaved = await ratingDatabase.updateRate(rate);
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
    const rate = await ratingDatabase.getRate(userIdFrom, userIdTo);
    // if (rates.length === 1) {
    //     return initialRate(userIdFrom, userIdTo)
    // }
    // const df = new DataFrame({ data: rates });
    // const dfLoc = df.loc((row: any) => {
    //     return (row.get('user_id_from') === userIdFrom) && (row.get('user_id_to') === userIdTo)
    // })
    // const dfUnique = dfLoc.dropDuplicates('user_id_from', 'user_id_to')
    // const dfItems = dfUnique.toCollection()
    // const item = dfItems[0]
    // 
    if (rate !== null) {
        return cleanRate(rate);
    }
    return initialRate(userIdFrom, userIdTo)
}

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
        setRateUser: (state, action: PayloadAction<User | any>) => {
            state.user = action.payload;
        },
        setRatingSelect: (state, action: PayloadAction<UserRating | any>) => {
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

export const { setRateUser, setRatingSelect } = rateSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserRate = (state: RootState) => state.rate.user;
export const selectRating = (state: RootState) => state.rate.rate;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default rateSlice.reducer;
