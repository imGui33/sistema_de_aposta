import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/contexts/auth";

// import { Container } from './styles';

const Home: React.FC = () => {
  
  const {userName, SignOut} = useContext(AuthContext)
  
  return (
    <div>
      <h1>{userName === 'null' ? 'Recarregue a pagina' : userName}</h1>
      <button onClick={SignOut}>Deslogar</button>
    </div>
  );
};

export default Home;
