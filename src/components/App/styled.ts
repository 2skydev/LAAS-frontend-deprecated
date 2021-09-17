import styled from "styled-components";

export const AppStyled = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  color: ${(props) => props.theme.textColor1};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${(props) => props.theme.textColor1};
  }
`;
