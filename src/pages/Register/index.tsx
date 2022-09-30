import React, { useContext, useEffect, useState } from "react";

import { Container, Form, BackGround, WaveComponent, Inputs } from "./style";
import BG from "../../public/bg.svg";
import Wave from "../../public/wave.png";

import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { AuthContext } from "../../components/contexts/auth";
import { addDoc, collection, getDocs, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../components/Firebase";
import { database } from "../../components/Firebase";




const Register: React.FC = () => {
  // Hooks
  const {
    setError,
    error,
    setErrorCode,
    CodeError,
    setName,
    name,
    setEmail,
    email,
    setPassword,
    password,
  } = useContext(AuthContext);
  const navigate = useNavigate();


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
        const dbUsers = collection(database, "users");

        addDoc(dbUsers, {
          name,
          email,
          password,
          uid: user.uid,
          admin: 0,
        });
        console.log(user);
      });
    
      navigate("/login");
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
  // console.log(dbUsers);
  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(dbUsers);
  //     data.docs.map((doc) => {
  //       console.log(doc.data());
  //     });
  //   };
  //   getUsers();
  // });

  // Criando Usuario

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
            {CodeError}
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
