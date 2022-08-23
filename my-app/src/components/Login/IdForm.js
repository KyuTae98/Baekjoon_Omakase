import styled from "styled-components";
import { useState, useEffect } from "react";
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


const Register = (userId) => {
    if (userId === "")
        return;
    axios.post(`/test/${userId}`, {
        id: userId,
    }).then(response => {
        console.log(response);
    })
        .catch(error => {
            console.log(error);
        });
}


const LoginSubmit = (event) => {
    event.preventDefault();
    const { target: { ID: { value } } } = event
    const { target: { ID } } = event
    ID.value = ""
    return value;
}

const IdForm = () => {
    const [userId, setuserId] = useState("")
    useEffect(() => Register(userId), [userId])
    return (
        <StyledIdForm onSubmit={(event) => setuserId(LoginSubmit(event))}>
            <label>백준 아이디를 입력해 주세요.</label>
            <div>
                <input name="ID"></input>
            </div>
        </StyledIdForm>
    )
}



export default IdForm;