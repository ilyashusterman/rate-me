import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { UserDatabase } from '../user/UserDatabase';
import { UserSession, UserSessionObj } from '../user/UserSession';



export interface LoginState {
    user: UserSessionObj | undefined;
    users: Array<any>;
    statusUsers: 'idle' | 'loading' | 'failed';
    statusUser: 'idle' | 'loading' | 'failed';
}

const userSession = new UserSession("rate_me_user_session");
const userDatabase = new UserDatabase(
    "1eK7WHr7gI8-gYEyD86_zbLIJwNGJIiZWKTzmGhSTsJw",
    "857018344"
);

const initialState: LoginState = {
    user: userSession.loadUser(),
    users: [],
    statusUsers: 'idle'
};

export const getUsers = createAsyncThunk(
    'login/getUsers',
    async () => {
        const response = await userDatabase.getUsers();
        return response;
    }
);

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        // builder
        // .addCase(getUsers.pending, (state) => {
        //     state.status = 'loading';
        // })
        // .addCase(getUsers.fulfilled, (state, action) => {
        //     state.status = 'idle';
        //     state.value += action.payload;
        // })
        // .addCase(getUsers.rejected, (state) => {
        //     state.status = 'failed';
        // });
    },
});

// export const { increment, decrement, incrementByAmount } = loginSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUsers = (state: RootState) => state.login.users;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default loginSlice.reducer;
