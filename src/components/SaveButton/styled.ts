import { darken } from "polished";
import styled, { createGlobalStyle } from "styled-components";

export const SaveButtonStyled = styled.div`
  padding: 0.8rem 1rem;
  background-color: ${(props) => props.theme.sidebarBG};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  border-radius: 8px;

  > span {
    font-size: 1rem;
  }

  .ant-btn {
    background-color: ${(props) => props.theme.success};
    padding: 6px 15px;
    height: auto;
  }

  .ant-btn:hover,
  .ant-btn:focus {
    background-color: ${(props) => darken(0.1, props.theme.success)};
    color: ${(props) => props.theme.textColor1};
    border-color: ${(props) => props.theme.contentBG};
  }
`;

export const GlobalStyled = createGlobalStyle`
  .SaveButtonMotion {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: calc(100% - 300px - 4rem);
  }
`;
