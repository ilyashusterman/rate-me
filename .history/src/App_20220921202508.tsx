import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import FacebookLoginButton from "./features/login/FacebookLoginButton";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FacebookLoginButton />
      </header>
    </div>
  );
};

export default App;
