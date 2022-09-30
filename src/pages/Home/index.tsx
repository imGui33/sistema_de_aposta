import React, { useEffect, useState } from "react";
import { auth } from "../../components/Firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

// import { Container } from './styles';

const Home: React.FC = () => {
  const user = auth.currentUser;
  const [userName, setUserName] = useState(``);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        console.log(user)
        if(!user){
            navigate('/login');
        } else {
            setUserName(`${user.displayName}`)
        }

    })
  });
  return <h1>{userName}</h1>;
};

export default Home;
