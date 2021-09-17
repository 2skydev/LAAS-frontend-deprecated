import styled from "styled-components";

export const SectionStyled = styled.div`
  & + .section {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid ${(props) => props.theme.borderColor};
  }

  .section-left {
    h3 {
      font-size: 1.3rem;
    }

    p {
      color: ${(props) => props.theme.textColor2};
    }
  }

  .inputs {
    width: 400px;

    .ant-space-item {
      width: 100%;
    }
  }
`;
