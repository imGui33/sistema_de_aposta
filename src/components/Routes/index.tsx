import { useContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import { AuthContext } from "../contexts/auth";

export const Rotas: React.FC = () => {
  // const {user} = useContext(AuthContext)
  const {signed} = useContext(AuthContext);

  // console.log(signed)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={signed ? <Home /> : <Register />} />
        <Route path="/" element={signed ? <Home /> : <Register />} />
        <Route path="/login" element={signed ? <Home /> : <Login />} />
        <Route path="/home" element={signed ? <Home /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
};
