import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    overflow-y: hidden;
    a{
        color: var(--green)
    }
    .hide{
        display: none;
    }
    .show{
        display:flex;
    }
`;      

export const Form = styled.form`
    /* background-color:red; */
    display:flex;
    align-items:center;
    flex-direction: column;
    justify-content:space-evenly;
    width:400px;
    height: 500px;

    h1 
    {
        color: #2cc891;
        font-size: 50px;
    }
`
export const BackGround = styled.img`
    
  
    width: 750px;
    top: 50px;
    left: 150px;
    @media (max-width: 768px) {
        display: none;
    }
`
export const WaveComponent = styled.img`
    position:absolute;
    width: 40%;
    height: 100vh;
    @media (max-width: 768px) {
        display: none;
    }
`
export const Inputs = styled.div`
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    input{
        width: 100%;
        height: 50px;
        margin:10px;
        padding:8px;
        background-color: var(--white-escuro);
        border-radius: 8px;
    }
    input[type='submit']{
        background-color: var(--green);
        color: var(--white-escuro);
        font-size: 16px;
    }
    input[type='submit']:hover{
        cursor: pointer;
    }
`