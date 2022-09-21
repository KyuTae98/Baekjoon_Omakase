import styled from "styled-components";

const StyledRecom = styled.div`
display:flex;
justify-content:center;
text-align:center;
background-color:white;
width:280px;
height:280px;
border-radius: 8px;
margin:200px;
`
const Recom = (props) => {
    const { number, title, tier, url } = props
    return (
        <StyledRecom onClick={() => window.open(`${url}`, "_blank")}>
            <header>
                <h3>{title}</h3>
            </header>
            <h4>{number}</h4>
            <h4>{tier}</h4>
        </StyledRecom>
    )
}



export default Recom