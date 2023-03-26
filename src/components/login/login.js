import React, { useState, useRef } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/userReducer";
import CheckLogo from "../../assests/group.svg";
import "./login.scss"
function Login(props) {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const login = () => {
    const tmpUser = {
      email: email,
      password: password,
    };
    fetch("http://localhost:8888/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tmpUser),
    })
      .then((response) => response.json())
      .then((data) => {
        const res = JSON.parse(data);
        if (res) {
          showSuccess();
          dispatch(setUser(res));
          props.changeDialog("Todo");
        } else {
          showError();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const dialogHeader = (
    <img src={CheckLogo} />
  );
  const footer = (
    <div className="flex flex-wrap ">
      <Button label="Login" icon="pi pi-check" onClick={login} className="w-full"/>
    </div>
  );
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "You can now use app",
      life: 3000,
    });
  };
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Wrong credentials",
      life: 3000,
    });
  };

  const changeDialog = () => {
    props.changeDialog("SignUp");
  };

  return (
    <Dialog
      header={dialogHeader}
      visible={props.visibility}
      onHide={() => props.setVisibility(false)}
      dismissableMask={true}
      className="login"
    >
      <Toast ref={toast} />
      <div className="card flex justify-content-center">
        <Card
          title="Welcome back!"
          subTitle="Log in to continue."
          footer={footer}
          className="md:w-20rem"
        >
          <span className="justify-content-center p-float-label">
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
            <label htmlFor="email">Email</label>
          </span>
          <span className="justify-content-center p-float-label mt-5">
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              style={{display:'block'}}
              feedback={false}
            />
            <label htmlFor="password">Password</label>
          </span>
          <span className="justify-content-center p-float-label mt-5">
            <Button
              label="Don’t have an account? Sign up."
              link
              onClick={changeDialog}
              size="small"
              className="p-0"
            />
          </span>
        </Card>
      </div>
    </Dialog>
  );
}

export default Login;
