import { css } from "styled-components";

export const exchangeRateLineDivider = css`
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 5%;
    width: 90%;
    height: 1px;
    background-color: #8f8f8f;
  }
`;
