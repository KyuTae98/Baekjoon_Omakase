import Login from './Login.js'
import Label from './BeacjunLabel.js'
import styled from "styled-components";

const StyledLoginpage = styled.div`

display: flex;
justify-content: end;
height: 100%;
background-image: linear-gradient(
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.5)
  ),url("img/mountain.jpg");
background-repeat: no-repeat;

`


const Loginpage = () => {
    return (
        <StyledLoginpage>
            <Label />
            <Login />
        </StyledLoginpage>
    )
}

export default Loginpage;