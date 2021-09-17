import styled from "styled-components";

export const ContentStyled = styled.div`
  flex: 1;
  background-color: ${(props) => props.theme.contentBG};
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;

  .header {
    padding: 1.5rem 2rem;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    font-weight: bold;
    font-size: 1rem;
    display: flex;
    align-items: center;

    i {
      font-size: 1.3rem;
      margin-right: 0.5rem;
      color: ${(props) => props.theme.textColor2};
    }

    span {
      margin-bottom: -1px;
    }
  }

  .content {
    padding: 3rem 2rem;
  }
`;
