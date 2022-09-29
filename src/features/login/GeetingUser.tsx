import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser, userLogout, userSession } from "./userSlice";

export const GreetingUser = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const logout = () => {
    userSession.removeUser();
    dispatch(userLogout());
  };
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <p>hello {user?.name}</p>
        <img src={user?.picture} />
        <button onClick={logout}>logout</button>
      </Grid>
    </>
  );
};
