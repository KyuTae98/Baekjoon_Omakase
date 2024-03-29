import styled from "styled-components";

const StyledRecom = styled.div`
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
            <p><h4>{number}</h4></p>
            <h4>{tier}</h4>
        </StyledRecom>
    )
}



export default Recom