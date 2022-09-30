import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export default function AuthContextProvider(props: any) {
  const [user, setUser] = useState();
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
