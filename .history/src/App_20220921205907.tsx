import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FacebookLoginButton from "./features/login/FacebookLoginButton";
import SearchUser from "./features/search/SearchUser";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FacebookLoginButton />
        <SearchUser />
      </header>
    </div>
  );
};

export default App;
