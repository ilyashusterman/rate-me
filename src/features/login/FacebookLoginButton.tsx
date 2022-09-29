import React, { useState, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { initialSignUpUser } from "../user/UserDatabase";
import { UserSession } from "../user/UserSession";
import {
  isUserExist,
  saveUserAsync,
  saveUserSession,
  selectUser,
} from "./userSlice";
import { Grid } from "@mui/material";
import { User } from "../user/user";
import { useNavigate } from "react-router-dom";

const imageToDataURL = (url: string): any => {
  return fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
};

const FacebookLoginButton = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const [signUpUser, setSignUpUser] = useState<User>(initialSignUpUser());
  const loadedUser = useAppSelector(selectUser);
  const [isFaceBookButtonDisabled, setIsFaceBookButtonDisabled] =
    useState(false);
  const responseFacebook = async (response: any) => {
    const url = response?.picture?.data.url;
    const picture: string = await imageToDataURL(url);
    const responseUserId = response.id || response.userID;
    const newUser: User = {
      ...signUpUser,
      userId: responseUserId,
      facebookImageUrl: url,
      email: UserSession.encryptString(response.email),
      name: response.name,
      picture: picture,
    };
    setSignUpUser(newUser);
    if (!(await isUserExist(responseUserId))) {
      await dispatch(saveUserAsync(newUser));
    }
    dispatch(saveUserSession(newUser));
    setIsFaceBookButtonDisabled(true);
    navigate("/");
  };
  useEffect(() => {
    if (loadedUser) {
      setIsFaceBookButtonDisabled(true);
    }
  }, []);
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <FacebookLogin
          appId="802173514313355"
          fields="name,email,picture"
          callback={responseFacebook}
          // redirectUri={"./"}
          isDisabled={isFaceBookButtonDisabled}
        />
      </Grid>
      {/* <form
        action="https://docs.google.com/forms/d/e/1FAIpQLSd3ngW5O6lCczGXG_2Le9xWn4zT9EQ3PgR4dupjEsTbUy1fAw/formResponse"
        target="_self"
        id="userLoggedForm"
        method="POST"
        ref={inputForm}
      >
        <input type="hidden" name="fvv" value="1" />
        <input type="hidden" name="fbzx" value="6270306986263464340" />
        <input
          id="330067039"
          type="hidden"
          name="entry.330067039"
          value={picture}
        />
        <input
          id="260167600"
          type="hidden"
          name="entry.260167600"
          value={name}
        />
        <input
          id="1288336853"
          type="hidden"
          name="entry.1288336853"
          value={email}
        />
        <input
          id="1644059494"
          type="hidden"
          name="entry.1644059494"
          value={userID}
        />
        <input type="hidden" name="pageHistory" value="0" />
      </form> */}
    </>
  );
};

export default FacebookLoginButton;
