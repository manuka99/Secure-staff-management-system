import React, {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import axios from "axios";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import FileUpload from "./components/pages/FileUpload";
import Landing from "./components/pages/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import UserContext from "./context/userContext";
import "./App.css";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post(
        "http://localhost:5000/user/tokenIsValid",
        null,
        {headers: {"x-auth-token": token}}
      );
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:5000/user/login", {
          headers: {"x-auth-token": token},
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{userData, setUserData}}>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/upload" component={FileUpload} />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
