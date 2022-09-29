import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

export const Rotas: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />


      </Routes>
    </BrowserRouter>
  );
};
