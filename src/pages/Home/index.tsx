import { signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/contexts/auth";
import { auth } from "../../components/Firebase";

// import { Container } from './styles';

const Home: React.FC = () => {
  
  const {userName, setSigned} = useContext(AuthContext)
  const navigate = useNavigate()
  const SignOut = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/register')
        setSigned(false);
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div>
      <h1>{userName === 'null' ? 'Recarregue a pagina' : userName}</h1>
      <button onClick={SignOut}>Deslogar</button>
    </div>
  );
};

export default Home;
