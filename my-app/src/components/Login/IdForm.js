import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const StyledIdForm = styled.form`
display: flex;
flex-direction:column;
text-align:center;
justify-content:center;
font-family: "Noto Sans KR", "Nanum Gothic";
div{
    background-color: #f2f2f2;
    padding: 0.75rem 1rem;
    margin:1.5rem;
    border-radius: 8px;
    width:150px;
}
input{
    font-family: "Noto Sans KR", "Nanum Gothic";
    background: transparent;
    width: 150px;
    border: none;
    outline: none;
    font-size: 1rem;
}
`;

const IdForm = () => {
    const [userId, setuserId] = useState("")
    const LoginSubmit = (event) => {
        event.preventDefault();
        const { target: { ID: { value } } } = event
        const { target: { ID } } = event
        ID.value = ""
        setuserId(value)
        Register()
    }
    const Register = () => {
        axios.post('http://localhost:3000/login', {
            userID: userId,
        }).then(response => {
            // Handle success.
            console.log('Well done!');
            console.log('User profile', response.data.user);
            console.log('User token', response.data.jwt);
        })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });

    }
    return (
        <StyledIdForm onSubmit={LoginSubmit}>
            <label>백준 아이디를 입력해 주세요.</label>
            <div>
                <input name="ID"></input>
            </div>
        </StyledIdForm>
    )
}



export default IdForm;