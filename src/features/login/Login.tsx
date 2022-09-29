import * as React from "react";

import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Link,
} from "@mui/material";
/* 


  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >

*/
export const Login = () => {
  const navigate = useNavigate();
  const btnstyle = { margin: "8px 0", backgroundColor: "#000000" };
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={4}></Grid>
      <Grid item xs={8}>
        <h2>Welcome</h2>
      </Grid>

      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <TextField label="Email" variant="standard" fullWidth required />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <TextField
          label="Password"
          type="password"
          variant="standard"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid container item xs={4}>
        <Grid item xs={6}>
          <FormControlLabel
            control={<Checkbox name="checked" color="primary" />}
            label="Remember for 30 days"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <Link href="#">Forgot password</Link>
          </Typography>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Button type="submit" variant="contained" style={btnstyle} fullWidth>
            Log in
          </Button>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Typography>
            {" "}
            Dont have an account ?
            <Link
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up for free
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
