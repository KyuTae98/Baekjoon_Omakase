import styled from "styled-components";

const StyledLoder = styled.div`
font-family: "Noto Sans KR", "Nanum Gothic";
font-weight: bold;
font-size: 1.5rem;
color: rgba(255,255,255);

  border: 16px solid #dcdcdc;
  border-radius: 50%;
  border-top: 16px solid #FFEB46;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; 
  /* Safari */
  animation: spin 2s linear infinite;

  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
const Loader = () => {

  return (
    <StyledLoder className="loader">
      Loding...
    </StyledLoder>
  )
}

export default Loader;