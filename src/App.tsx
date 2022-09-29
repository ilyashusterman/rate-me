import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SearchUser from "./features/search/SearchUser";
import { RatingUser } from "./features/rate/RatingUser";
import { GreetingUser } from "./features/login/GeetingUser";
import { AuthRoutes } from "./features/login/auth/AuthApp";
import { SignUp } from "./features/login/auth/SignUp";
import FacebookLoginButton from "./features/login/FacebookLoginButton";

const RatingApp = () => {
  return (
    <>
      <GreetingUser />
      <SearchUser />
      <RatingUser />
    </>
  );
};

const LoginApps = () => {
  return (
    <>
      <FacebookLoginButton />
      {/* <Login /> */}
    </>
  );
};

const App = () => {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <AuthRoutes
        LoginAuthPage={LoginApps}
        AppPage={RatingApp}
        AppPublicPage={LoginApps}
        AppSignUp={SignUp}
      />
    </div>
  );
};

export default App;
