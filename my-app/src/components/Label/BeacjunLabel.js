import styled from "styled-components";


const StyledBaecjunLabel = styled.h1`
font-family: "Noto Sans KR", "Nanum Gothic";
font-weight: bold;
font-size: 3.8rem;
line-height: 78px;
color: rgba(255,255,255);
margin:15%
`



const BaecjunLabel = () => {
    return <StyledBaecjunLabel>BAEKJUN OMAKASE</StyledBaecjunLabel>
}

export default BaecjunLabel;