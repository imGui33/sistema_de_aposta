import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import { auth } from "../../components/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

type AuthContextProps = {
  children: ReactNode;
};
type UserContextType = {
  // Hooks Login
  name: string;
  setName: (name: string) => void;
  password: string;
  setPassword: (password: string) => void;
  email: string;
  setEmail: (email: string) => void;
  userName: string;
  setUserName: (userName: string) => void;
  signed: boolean;
  setSigned: (signed: boolean) => void;
  //   Error
  error: boolean;
  setError: (error: boolean) => void;
  CodeError: string;
  setErrorCode: (CodeError: string) => void;
  //   Functions
  SignOut: () => void;
};
const initialValue = {
  // Hooks Login
  name: "",
  setName: () => {},
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  userName: "",
  setUserName: () => {},
  signed: false,
  setSigned: () => {},
  //   Error
  error: false,
  setError: () => {},
  CodeError: "",
  setErrorCode: () => {},
  
  //   Functions
  SignOut: () => {},

};

export const AuthContext = createContext<UserContextType>(initialValue);

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [name, setName] = useState(initialValue.name);
  const [email, setEmail] = useState(initialValue.email);
  const [password, setPassword] = useState(initialValue.password);
  const [error, setError] = useState(false);
  const [CodeError, setErrorCode] = useState("");
  const [signed, setSigned] = useState(false);

  const user = auth.currentUser;
  const [userName, setUserName] = useState(``);
  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
     
      if (!user || user === null) {
      
        setSigned(false);
      } else {
        setSigned(true);
        setUserName(`${user.displayName}`);
      }
    });
  });

  //   Função para LogOut
  const SignOut = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setSigned(false);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <AuthContext.Provider
      value={{
        signed,
        setSigned,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        error,
        setError,
        CodeError,
        setErrorCode,
        setUserName,
        userName,
        SignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
