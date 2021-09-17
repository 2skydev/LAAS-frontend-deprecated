import styled from "styled-components";

export const SectionStyled = styled.div`
  flex: 1;
  background-color: ${(props) => props.theme.contentBG};

  .header {
    padding: 1.5rem 2rem;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    font-weight: bold;
    font-size: 1rem;
  }
`;
