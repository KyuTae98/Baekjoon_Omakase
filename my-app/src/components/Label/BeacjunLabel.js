import styled from "styled-components";
import { inputaction } from '../../store/input'
import { useDispatch } from 'react-redux'

const StyledBaecjunLabel = styled.h1`
font-family: "Noto Sans KR", "Nanum Gothic";
font-weight: bold;
font-size: 3.8rem;
line-height: 78px;
color: rgba(255,255,255);
margin:0;
`



const BaecjunLabel = () => {
    const dispatch = useDispatch();
    const userDataHandler = () => {
        dispatch(inputaction.removeData())
    }
    return <StyledBaecjunLabel onClick={userDataHandler}>BAEKJUN OMAKASE</StyledBaecjunLabel>
}

export default BaecjunLabel;