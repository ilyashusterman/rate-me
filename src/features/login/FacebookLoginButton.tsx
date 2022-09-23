import React, { useState, useRef, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FormUpload } from "../database/FormUpload";
import { UserSession } from "../user/UserSession";
import {
  getUsers,
  getUsersAsync,
  isUserExist,
  saveUser,
  selectUser,
  selectUsers,
} from "./userSlice";

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
  const [name, setName] = useState("");
  const users = useAppSelector(selectUsers);
  const loadedUser = useAppSelector(selectUser);
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");
  const [isFaceBookButtonDisabled, setIsFaceBookButtonDisabled] =
    useState(false);
  const inputForm: any = useRef();
  const submitNewUser = async (inputForm: any) => {
    setTimeout(async () => {
      const uploadForm = new FormUpload(inputForm);
      await uploadForm.submit();
    }, 50);
  };
  const responseFacebook = async (response: any) => {
    const newUsers = await getUsers();
    const url = response?.picture?.data.url;
    const data: string = await imageToDataURL(url);
    const responseUserId = response.id || response.userID;
    await setName(response.name);
    await setEmail(UserSession.encryptString(response.email));
    await setUserID(responseUserId);
    await setPicture(data);
    if (
      !isUserExist(responseUserId, users) &&
      !isUserExist(responseUserId, newUsers)
    ) {
      await submitNewUser(inputForm);
    }
    dispatch(saveUser({ response: response, picture: data }));
    setIsFaceBookButtonDisabled(true);
  };
  useEffect(() => {
    dispatch(getUsersAsync());
    if (loadedUser) {
      setPicture(loadedUser.picture);
      setName(loadedUser.name);
      setEmail(loadedUser.email);
      setUserID(loadedUser.user_id);
      setIsFaceBookButtonDisabled(true);
    }
  }, []);
  return (
    <>
      <FacebookLogin
        appId="802173514313355"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
        isDisabled={isFaceBookButtonDisabled}
      />
      <form
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
      </form>
    </>
  );
};

export default FacebookLoginButton;
