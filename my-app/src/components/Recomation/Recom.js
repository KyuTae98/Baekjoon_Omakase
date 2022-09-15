import styled from "styled-components";

const StyledRecom = styled.div`
    width:100px
    height:100px
    border-radius: 16px;
`
const Recom = (props) => {
    const { number, title, tier, url } = props
    return (
        <StyledRecom>
            {number}
            {title}
            {tier}
            {url}
        </StyledRecom>
    )
}



export default Recom