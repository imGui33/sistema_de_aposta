import { useState } from "react";
import { Rotas } from "./components/Routes";
import { GlobalStyle } from "./Global/style";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <GlobalStyle />
    </>
  );
}

export default App;
