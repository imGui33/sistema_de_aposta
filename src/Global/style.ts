import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * 
    {
        font-family: 'Poppins', sans-serif;
        margin:0;
        padding:0;
        box-sizing: border-box;
    }
    *,input,button{
        border:none;
        outline:none;
    }

    :root{
        --green: #2cc891;
        --white-escuro: #f5f9f8;
    }
`;
