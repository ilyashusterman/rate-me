import React, { useState, useRef, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
const toDataURL = (url: string): any => {
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
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");
  const inputForm: any = useRef();

  const responseFacebook = async (response: any) => {
    const url = response?.picture?.data.url;
    const data: string = await toDataURL(url);
    setName(response.name);
    setEmail(response.email);
    setUserID(response.userID);
    setPicture(data);

    setTimeout(async () => {
      console.log(inputForm);
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
    }, 100);
  };
  useEffect(() => {});
  return (
    <>
      <FacebookLogin
        appId="802173514313355"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
      />
      <img src={picture} />
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
