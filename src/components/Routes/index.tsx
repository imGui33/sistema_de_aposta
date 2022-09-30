import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import { AuthContext } from "../contexts/auth";

export const Rotas: React.FC = () => {
  // const {user} = useContext(AuthContext)
  const {signed} = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={signed ? <Home /> : <Register />} />
        <Route path="/" element={signed ? <Home /> : <Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={signed ? <Home /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
};
