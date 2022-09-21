import styled from "styled-components";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { inputaction } from "../../store/input";
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


const IdForm = (props) => {
    const dispatch = useDispatch();

    const Register = (userId) => {
        if (userId === "")
            return;
        axios.post(`/baekjoon/${userId}`, {
            id: userId,
        }).then(res => {
            const { data } = res;
            dispatch(inputaction.addUserData(data))
        }).catch(error => {
            dispatch(inputaction.makeLogin())
            alert("아이디가 틀렸습니다!")
        });
    }

    const LoginSubmit = (event) => {
        event.preventDefault();
        const { target: { ID: { value } } } = event
        const { target: { ID } } = event
        ID.value = ""
        dispatch(inputaction.makeLoding())
        Register(value)
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