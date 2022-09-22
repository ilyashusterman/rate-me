import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FacebookLoginButton from "./features/login/FacebookLoginButton";
import SearchUser from "./features/search/SearchUser";
import { useAppSelector } from "./app/hooks";
import { selectIsLoggedIn, selectUser } from "./features/login/userSlice";
import { RatingUser } from "./features/rate/RatingUser";
import { GreetingUser } from "./features/login/GeetingUser";

const RatingApp = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <GreetingUser user={user} />
      <SearchUser />
      <RatingUser />
    </>
  );
};

const LoginApps = () => {
  return (
    <>
      <FacebookLoginButton />
    </>
  );
};

const App = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isLoggedIn ? <RatingApp /> : <LoginApps />}
      </header>
    </div>
  );
};

export default App;
