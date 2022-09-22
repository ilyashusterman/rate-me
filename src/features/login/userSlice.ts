import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { UserDatabase } from '../user/UserDatabase';
import { UserSession, UserSessionObj } from '../user/UserSession';



export interface LoginState {
    user: UserSessionObj | undefined;
    users: Array<any>;
    statusUsers: 'idle' | 'loading' | 'failed';
    loggedIn: boolean;
}

export const userSession = new UserSession("rate_me_user_session");
//https://docs.google.com/spreadsheets/d/18inUTVlf-RWZspSEBA7tw0_1o8XL_FlUbJvxqKu2-WY/edit#gid=1705778969
const userDatabase = new UserDatabase(
    "18inUTVlf-RWZspSEBA7tw0_1o8XL_FlUbJvxqKu2-WY",
    "1705778969"
);

const initialState: LoginState = {
    user: userSession.loadUser(),
    users: [],
    loggedIn: userSession.loadUser() !== undefined,
    statusUsers: 'idle'
};

export const getUsers = async () => {
    return await userDatabase.getUsers()
}
export const getUsersAsync = createAsyncThunk(
    'user/getUsers',
    async () => {
        const response = await userDatabase.getUsers();
        return response;
    }
);
export const isUserExist = (userId: string, users: Array<any>) => {
    return userDatabase.isUserExist(userId, users)
}
export const saveUser = createAsyncThunk(
    'user/saveUser',
    async (props: any) => {
        const { response, picture } = props;
        let user = {
            name: response.name,
            email: response.email,
            user_id: response.userID,
            picture: picture,
            response: response,
        }
        userSession.saveUser(user);
        return user;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogout: (state) => {
            state.user = undefined;
            state.loggedIn = false;
        }
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(getUsersAsync.pending, (state) => {
                state.statusUsers = 'loading';
            })
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.statusUsers = 'idle';
                state.users = action.payload;
            })
            .addCase(getUsersAsync.rejected, (state) => {
                state.statusUsers = 'failed';
            })
            .addCase(saveUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loggedIn = true;
            });
    },
});

export const { userLogout } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUsers = (state: RootState) => state.user.users;
export const selectUser = (state: RootState) => state.user.user;
export const selectIsLoggedIn = (state: RootState) => state.user.loggedIn;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default userSlice.reducer;