import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import "./SignUp.css";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { isImgLink, imageToDataURL } from "../image";
import { Avatar, Button } from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import { initialSignUpUser } from "../../user/UserDatabase";
import { User } from "../../user/user";

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const [signUpUser, setSignUpUser] = useState<User>(initialSignUpUser());
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const setAttribute = (key: string, value: string) => {
    const newSignUpUser = { ...signUpUser, [key]: value };
    setSignUpUser(newSignUpUser);
    let isValid = true;
    for (const [key, value] of Object.entries(newSignUpUser)) {
      if (value === "") {
        isValid = false;
      }
    }
    // isValid =
    //   isValid && newSignUpUser["confirmPassword"] === newSignUpUser["password"];
    setIsFormValid(isValid);
  };
  const setChangeValue = (key: string) => {
    const inputOnChange = (event: any) => {
      return setAttribute(key, event.target.value);
    };
    return inputOnChange;
  };
  const btnstyle = {
    margin: "8px 0",
    backgroundColor: isFormValid ? "#69F0AE" : "#FF5252",
  };
  const avatarStyle = { backgroundColor: isFormValid ? "#1bbd7e" : "#FFFFF" };
  const fetchFaceBookUrl = async (url: string) => {
    setAttribute("facebookImageUrl", url);
    if (!isImgLink(url)) {
      setAttribute("picture", "");
      return false;
    }
    const imageSrcUrl = await imageToDataURL(url);
    setAttribute("picture", imageSrcUrl);
  };
  const saveSignUpUser = async () => {
    // dispatch(saveUser());
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={4}></Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar style={avatarStyle}>
          <DoneOutlineIcon />
        </Avatar>
        <h2>Sign up</h2>
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <TextField
          value={signUpUser["email"]}
          onChange={setChangeValue("email")}
          label="Email"
          variant="standard"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        {/* <TextField
          value={signUpUser["password"]}
          onChange={setChangeValue("password")}
          label="Password"
          type="password"
          variant="standard"
          fullWidth
          required
        />
        <TextField
          value={signUpUser["confirmPassword"]}
          onChange={setChangeValue("confirmPassword")}
          label="Password confirm"
          type="password"
          variant="standard"
          fullWidth
          required
        /> */}
        <TextField
          value={signUpUser["facebookURL"]}
          onChange={setChangeValue("facebookURL")}
          label="facebook url"
          type="text"
          variant="standard"
          fullWidth
        />
        <TextField
          value={signUpUser["facebookImageUrl"]}
          label="facebook profile image source url"
          type="text"
          variant="standard"
          onChange={(e) => fetchFaceBookUrl(e.target.value)}
          fullWidth
        />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={3}>
            <img className="thumb" src={signUpUser["picture"]} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <Button
          type="submit"
          variant="contained"
          style={btnstyle}
          onClick={saveSignUpUser}
          disabled={isFormValid}
          fullWidth
        >
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
};
