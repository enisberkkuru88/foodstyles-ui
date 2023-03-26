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
import "./signup.scss"
function SignUp(props) {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const dialogHeader = <img src={CheckLogo} />;
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
      detail: "User already exists",
      life: 3000,
    });
  };
  //user save method
  //validation can be done for now skip that part
  const saveUser = () => {
    const tmpUser = {
      name: name,
      email: email,
      password: password,
    };
    fetch("http://localhost:8888/signUp", {
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

  const footer = (
    <div className="flex flex-wrap justify-content-start gap-2">
      <Button label="Sign Up" icon="pi pi-check" onClick={saveUser} className="w-full"/>
    </div>
  );
  const changeDialog = () => {
    props.changeDialog("Login");
  };
  return (
    <Dialog
      header={dialogHeader}
      visible={props.visibility}
      onHide={() => props.setVisibility(false)}
      dismissableMask={true}
      className="signup"
    >
      <Toast ref={toast} />
      <div className="card flex justify-content-center">
        <Card
          title="Welcome!"
          subTitle="Sign up to start using Simpledo today."
          footer={footer}
          className="md:w-20rem"
        >
          <span className="justify-content-center p-float-label">
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
            <label htmlFor="name">Full Name</label>
          </span>
          <span className="justify-content-center p-float-label mt-5">
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
            />
            <label htmlFor="password">Password</label>
          </span>
          <span className="justify-content-center p-float-label mt-5">
            <Button
              label="Do have an account? Sign in."
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

export default SignUp;
