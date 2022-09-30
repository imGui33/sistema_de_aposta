import React, { useContext, useState } from "react";

import { Container, Form, BackGround, WaveComponent, Inputs } from "./style";
import BG from "../../public/bg.svg";
import Wave from "../../public/wave.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../components/Firebase";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import {
  AuthContext,
  AuthContextProvider,
} from "../../components/contexts/auth";

const Login: React.FC = () => {
  // const [email, setEmail] = useState("");
  const { email, setEmail, password, setPassword, setSigned } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorCode, setErrorCode] = useState("");

  const navigate = useNavigate();
  const loginUser = async (event: any) => {
    event.preventDefault();
    try {
      const loginUserFunc = await signInWithEmailAndPassword(
        auth,
        email,
        password
      ).then((userCredentials) => {
        const user = userCredentials.user;
      });
      setSigned(true)

      navigate("/home");
    } catch (error: any) {
      setError(true);
      console.log(error.code);
      if (error.code === "auth/invalid-email") {
        setErrorCode("E-mail invalido!");
      }
      if (error.code === "auth/user-not-found") {
        setErrorCode("Este usuario não existe!");
      }
      if (error.code === "auth/internal-error") {
        setErrorCode(
          "Sua senha está incorreta ou nossos servidores está com problemas!"
        );
      }
    }
  };

  return (
    <>
      <WaveComponent src={Wave} />
      <Container>
        <BackGround src={BG} />

        <Form onSubmit={loginUser}>
          <h1>Login</h1>
          <Alert
            className={error ? "show" : "hide"}
            severity={error ? "error" : "success"}
          >
            {errorCode}
          </Alert>

          <Inputs>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Senha"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <a href="/register">
              <span>Não tem uma conta? Clique aqui para se registrar</span>
            </a>
            <input type="submit" value="Login" />
          </Inputs>
        </Form>
      </Container>
    </>
  );
};

export default Login;
