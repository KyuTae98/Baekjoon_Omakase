import styled from "styled-components";
import IdForm from "./IdForm.js"


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

const LoginForm = () => {
    return (
        <StyledLogin>
            <IdForm></IdForm>
        </StyledLogin>
    )
}

export default LoginForm;