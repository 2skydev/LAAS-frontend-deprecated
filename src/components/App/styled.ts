import styled, { createGlobalStyle } from "styled-components";
import hexToRgba from "hex-to-rgba";
import { darken, lighten } from "polished";

export const AppStyled = styled.div`
  width: 100%;
  height: 100vh;
  color: ${(props) => props.theme.textColor1};

  .titleBar {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 25px;
    -webkit-app-region: drag;

    > div {
      width: 35px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: ${(props) => props.theme.textColor2};
      transition: 200ms color, 200ms background-color;
      -webkit-app-region: no-drag;

      &:hover {
        background-color: ${(props) => lighten(0.05, props.theme.sidebarBG)};

        &.close {
          background-color: ${(props) => props.theme.error};
          color: ${(props) => props.theme.textColor1};
        }
      }

      &.close {
        font-size: 1.2rem;
      }

      &:first-child {
        font-size: 1.2rem;
        i {
          margin-top: 1px;
        }
      }
    }
  }

  .main {
    width: 100%;
    height: calc(100% - 25px);
    display: flex;
  }
`;

export const GlobalStyled = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.sidebarBG};
    user-select: none;
  }

  *::-webkit-scrollbar {
    width: 8px;
    height: 10px;
  }

  *::-webkit-scrollbar-track {
    background: ${(props) => props.theme.scrollTrackBG};
    border-radius: 8px;
  }

  *::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.scrollThumbBG};
    border-radius: 8px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }
  

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${(props) => props.theme.textColor1};
  }

  .ant-table {
    background: none;

    .ant-empty-image {
      display: none;
    }

    .ant-empty-description {
      color: ${(props) => props.theme.textColor2};
    }
  }
  
  .ant-table-tbody > tr.ant-table-placeholder:hover > td {
    background-color: ${(props) => props.theme.contentBG};
  }

  .ant-table-thead > tr > th {
    background-color: ${(props) => props.theme.sidebarBG};
    color: ${(props) => props.theme.textColor2};
  }

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    border-color: ${(props) => props.theme.borderColor};
  }

  .ant-table-tbody > tr.ant-table-row:hover > td {
    background-color: ${(props) => props.theme.contentBG};
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background-color: ${(props) => props.theme.contentBG};
    border-color: ${(props) => props.theme.borderColor};
  }

  .ant-select-show-search.ant-select:not(.ant-select-customize-input)
    .ant-select-selector
    input {
    color: ${(props) => props.theme.textColor1};
  }

  .ant-select-selection-placeholder {
    color: ${(props) => props.theme.textColor1};
    opacity: 0.3;
  }

  .ant-select-item {
    color: ${(props) => props.theme.textColor1};
  }

  .ant-select-dropdown {
    background-color: ${(props) => props.theme.sidebarBG};
  }

  .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
    background-color: ${(props) => props.theme.contentBG};
  }

  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background-color: ${(props) => props.theme.selectedBG};
    color: ${(props) => props.theme.textColor1};
  }

  .ant-input-number {
    border-color: ${(props) => props.theme.borderColor};
    background-color: ${(props) => props.theme.contentBG};

    input {
      color: ${(props) => props.theme.textColor1};

      &::placeholder {
        color: ${(props) => props.theme.textColor1};
        opacity: 0.3;
      }
    }
  }

  .ant-input-number-handler-wrap {
    background-color: ${(props) => props.theme.contentBG};
  }

  .ant-input-number-handler {
    border-color: ${(props) => props.theme.borderColor};

    &:active {
      background-color: ${(props) => props.theme.sidebarBG};
    }
  }

  .ant-input-number-handler-up-inner, .ant-input-number-handler-down-inner {
    color: ${(props) => props.theme.textColor1};
  }

  .ant-input-number-handler:hover .ant-input-number-handler-up-inner, .ant-input-number-handler:hover .ant-input-number-handler-down-inner {
    color: ${(props) => props.theme.primary};
  }

  .ant-input {
    background-color: ${(props) => props.theme.contentBG};
    border-color: ${(props) => props.theme.borderColor};
    color: ${(props) => props.theme.textColor1};

    &::placeholder {
      color: ${(props) => props.theme.textColor1};
      opacity: 0.3;
    }
  }

  .ant-input:hover, .ant-select:hover .ant-select-selector, .ant-input-number:hover {
    border-color: ${(props) => props.theme.primary} !important;
  }

  .ant-input:focus, .ant-input-focused,
  .ant-select:focus .ant-select-selector, .ant-select-focused .ant-select-selector,
  .ant-input-number:focus, .ant-input-number-focused {
    border-color: ${(props) => props.theme.primary} !important;
    box-shadow: 0 0 0 2px ${(props) =>
      hexToRgba(props.theme.primary, 0.2)} !important;
  }

  .ant-btn {
    background-color: ${(props) => props.theme.contentBG};
    border-color: ${(props) => props.theme.borderColor};
    color: ${(props) => props.theme.textColor1};
  }

  .ant-btn:hover, .ant-btn:focus {
    background-color: ${(props) => lighten(0.1, props.theme.contentBG)};
    border-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.primary};
  }

  .ant-btn-dangerous.ant-btn-primary[disabled], .ant-btn-dangerous.ant-btn-primary[disabled]:hover, .ant-btn-dangerous.ant-btn-primary[disabled]:focus, .ant-btn-dangerous.ant-btn-primary[disabled]:active {
    border-color: ${(props) => props.theme.borderColor};
    background-color: ${(props) => props.theme.contentBG};
    color: ${(props) => props.theme.textColor2};
    opacity: .4;
  }

  .ant-input.noBorder, .ant-select.noBorder .ant-select-selector, .ant-input-number.noBorder {
    border-color: transparent;
  }

  .ant-table-cell-fix-left, .ant-table-cell-fix-right {
    background-color: ${(props) => props.theme.contentBG};
  }

  .ant-table-tbody > tr > td {
    color: ${(props) => props.theme.textColor1};
  }

  .ant-pagination-item {
    border-color: ${(props) => props.theme.borderColor};
    background-color: ${(props) => props.theme.sidebarBG};
    
    a {
      color: ${(props) => props.theme.textColor1};
    }
  }

  .ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link {
    background-color: ${(props) => props.theme.sidebarBG};
    border-color: ${(props) => props.theme.borderColor};
    color: ${(props) => props.theme.textColor1};
  }

  .ant-pagination-prev:focus-visible .ant-pagination-item-link, .ant-pagination-next:focus-visible .ant-pagination-item-link, .ant-pagination-prev:hover .ant-pagination-item-link, .ant-pagination-next:hover .ant-pagination-item-link {
    border-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.primary};
  }

  .ant-pagination-disabled .ant-pagination-item-link, .ant-pagination-disabled:hover .ant-pagination-item-link, .ant-pagination-disabled:focus-visible .ant-pagination-item-link {
    color: ${(props) => props.theme.textColor2};
    border-color: ${(props) => props.theme.borderColor};
  }

  .ant-pagination-item-active:focus-visible, .ant-pagination-item-active:hover,
  .ant-pagination-item:focus-visible, .ant-pagination-item:hover {
    border-color: ${(props) => props.theme.primary};
  }

  .ant-pagination-item-active:focus-visible a, .ant-pagination-item-active:hover a,
  .ant-pagination-item:focus-visible a, .ant-pagination-item:hover a {
    color: ${(props) => props.theme.primary};
  }

  .ant-pagination-item-active {
    border-color: ${(props) => props.theme.primary};
  }

  .ant-pagination-item-active a {
    color: ${(props) => props.theme.primary};
  }

  .ant-notification {
    top: 3rem !important;
  }

  .ant-notification-notice {
    border-radius: 5px;
    padding: 1.5rem 2rem;
    width: 25rem;
    background-color: ${(props) => lighten(0.1, props.theme.contentBG)};
    color: ${(props) => darken(0.15, props.theme.textColor1)};

    .ant-notification-notice-message {
      color: ${(props) => props.theme.textColor1};
    }

    .ant-notification-notice-close {
      color: ${(props) => props.theme.textColor1};
    }
  }
`;
