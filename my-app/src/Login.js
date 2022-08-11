import styled from "styled-components";
import LoginForm from "./LoginForm.js"


const StyledLogin = styled.section`
    display:flex;
    justify-content:center;
    text-align:center;
    background-color:white;
    width:280px;
    height:280px;
    border-radius: 8px;
    margin:20% 8%;
`
const Login = () => {
    return (
        <StyledLogin>
            <LoginForm></LoginForm>
        </StyledLogin>
    )
}

export default Login;