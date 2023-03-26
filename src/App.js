import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import ToDo from "./components/todo/todo";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { setUser } from "./reducers/userReducer";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [todoVisibility, setTodoVisibility] = useState(
    user != null ? true : false
  );
  const [signUpVisibility, setSignUpVisibility] = useState(false);
  const [loginVisibility, setLoginVisibility] = useState(false);

  const openLoginPanel = (state) => {
    setLoginVisibility(state);
  };

  const changeDialog = (dialogName) => {
    if (dialogName == "SignUp") {
      setSignUpVisibility(true);
      setLoginVisibility(false);
      setTodoVisibility(false);
    } else if (dialogName == "Login") {
      setSignUpVisibility(false);
      setLoginVisibility(true);
      setTodoVisibility(false);
    } else if (dialogName == "Todo") {
      setSignUpVisibility(false);
      setLoginVisibility(false);
      setTodoVisibility(true);
    }
  };
  
  const logout = () => {
    dispatch(setUser(null));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div class="App-header-right"></div>
        <div class="App-header-left">
          {user != null ? (
            <Button label="Logout" text onClick={logout} />
          ) : (
            <div>
              <Button
                label="Login"
                text
                onClick={openLoginPanel}
                visibility={loginVisibility}
              />
            </div>
          )}
        </div>
      </header>
      <div>
        <Login
          visibility={loginVisibility}
          setVisibility={setLoginVisibility}
          changeDialog={changeDialog}
        ></Login>
        <SignUp
          visibility={signUpVisibility}
          setVisibility={setSignUpVisibility}
          changeDialog={changeDialog}
        ></SignUp>
        <ToDo
          user={user}
          visibility={todoVisibility}
          setVisibility={setTodoVisibility}
          changeDialog={changeDialog}
        ></ToDo>
      </div>
    </div>
  );
}

export default App;
