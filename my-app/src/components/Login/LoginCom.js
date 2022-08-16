import LoginForm from './LoginForm.js'
import BeacjunLabel from '../Label/BeacjunLabel.js'
import styled from "styled-components";

const StyledLoginCom = styled.div`
display: flex;
justify-content: end;
height: 100%;
background-image: linear-gradient(
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.5)
  ),url("img/mountain.jpg");
background-repeat: no-repeat;

`

const LoginCom = () => {
    return (
        <StyledLoginCom>
            <BeacjunLabel />
            <LoginForm />
        </StyledLoginCom>
    )
}

export default LoginCom;