import React, { useContext, useEffect, useState } from "react";

import { Container, Form, BackGround, WaveComponent, Inputs } from "./style";
import BG from "../../public/bg.svg";
import Wave from "../../public/wave.png";
import { auth } from "../../components/Firebase";
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { json, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { database } from "../../components/Firebase";
import { addDoc, collection, getDocs, setDoc } from "firebase/firestore";
import { AuthContext } from "../../components/contexts/auth";

const Register: React.FC = () => {
  // Hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorCode, setErrorCode] = useState("");

  const dbUsers = collection(database, "users");
  console.log(dbUsers);
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(dbUsers);
      data.docs.map((doc) => {
        console.log(doc.data());
      });
    };
    getUsers();
  });

  // Criando Usuario

  const createUser = async (event: any) => {
    event.preventDefault();
    try {
      // Verifica se o email ou senha está vazio

      if (!email || !password) {
        setError(true);
        setErrorCode("Insira um E-mail e uma senha!");
        return;
      } else {
        setError(false);
        setErrorCode("");
      }

      const createUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then(async (userCredentials) => {
        let authCurrentUser = auth.currentUser;
        await updateProfile(authCurrentUser, {
          displayName: name,
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        const user = userCredentials.user;

        addDoc(dbUsers, {
          name,
          email,
          password,
          uid: user.uid,
          admin: 0,
        });
        console.log(user);
      });

      navigate("/home");
    } catch (error: any) {
      console.error(error);
      setError(true);

      // Verifica os error

      if (error.code === "auth/email-already-in-use") {
        setErrorCode("Esse e-mail já está sendo usado!");
        return;
      }
      if (error.code === "auth/weak-password") {
        setErrorCode("A senha deve conter no minimo 6 caracteres!");
        return;
      }
    }
  };
  return (
    <>
      <WaveComponent src={Wave} />
      <Container>
        <BackGround src={BG} />
        <Form onSubmit={createUser}>
          <Alert
            className={error ? "show" : "hide"}
            severity={error ? "error" : "success"}
          >
            {errorCode}
          </Alert>

          <h1>Crie sua conta</h1>
          <Inputs>
            <input
              type="text"
              placeholder="Nome"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
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
            <a href="/login">
              <span>Ja tem uma conta?</span>
            </a>
            <input type="submit" value="Registrar-se" />
          </Inputs>
        </Form>
      </Container>
    </>
  );
};

export default Register;
