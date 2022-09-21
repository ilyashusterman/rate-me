import React, { useState, useRef, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { useAppDispatch } from "../../app/hooks";
import { UserDatabase } from "../user/UserDatabase";
import { UserSession } from "../user/UserSession";
import { getUsersAsync } from "./loginSlice";
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
  const [users, setUsers] = useState([]);
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");
  const [isFaceBookButtonDisabled, setIsFaceBookButtonDisabled] =
    useState(false);
  const userSession = new UserSession();
  const userDatabase = new UserDatabase(
    "1eK7WHr7gI8-gYEyD86_zbLIJwNGJIiZWKTzmGhSTsJw",
    "857018344"
  );
  const inputForm: any = useRef();
  const submitNewUser = async (inputForm: any) => {
    setTimeout(async () => {
      const formDataParams: any = new FormData(inputForm.current);
      const formData = new URLSearchParams();
      for (const pair of formDataParams) {
        formData.append(pair[0], pair[1]);
      }
      await fetch(inputForm.current.action, {
        method: inputForm.current.method,
        body: formData,
        cache: "no-cache",
        mode: "no-cors",
      });
    }, 50);
  };
  const responseFacebook = async (response: any) => {
    const url = response?.picture?.data.url;
    const data: string = await imageToDataURL(url);
    await setName(response.name);
    await setEmail(response.email);
    await setUserID(response.userID);
    await setPicture(data);
    if (!userDatabase.isUserExist(response.userID, users)) {
      await submitNewUser(inputForm);
    }
    userSession.saveUser({
      name: response.name,
      email: response.email,
      userID: response.userID,
      picture: data,
      response: response,
    });
    setIsFaceBookButtonDisabled(true);
  };
  useEffect(() => {
    userDatabase.getUsers().then((users) => {
      setUsers(users);
    });
    dispatch(getUsersAsync());
    const loadedUser = userSession.loadUser();
    if (loadedUser) {
      setPicture(loadedUser.picture);
      setName(loadedUser.name);
      setEmail(loadedUser.email);
      setUserID(loadedUser.userID);
      setIsFaceBookButtonDisabled(true);
    }
  }, []);
  const getFaceBookButtonOrHello = () => {
    if (isFaceBookButtonDisabled) {
      return (
        <>
          <p>hello {name}</p>
          <img src={picture} />
        </>
      );
    }
    return (
      <FacebookLogin
        appId="802173514313355"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
        isDisabled={isFaceBookButtonDisabled}
      />
    );
  };
  return (
    <>
      {getFaceBookButtonOrHello()}
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
