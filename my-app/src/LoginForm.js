import styled from "styled-components";


const StyledLoginForm = styled.form`
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

const LoginForm = () => {
    const LoginSubmit = (event) => {
        event.preventDefault();
        const { target: { ID: { value } } } = event

    }

    return (
        <StyledLoginForm onSubmit={LoginSubmit}>
            <label>백준 아이디를 입력해 주세요.</label>
            <div>
                <input name="ID"></input>
            </div>
        </StyledLoginForm>
    )
}



export default LoginForm;