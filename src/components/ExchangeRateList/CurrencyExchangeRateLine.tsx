import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { OTHER_CURRENCY_PROP_NAME } from "../../constants/constants";
import type {
  ExchangeRateFormValueTypes,
  ExchangeRateLine,
} from "../../types/types";
import { exchangeRateLineDivider } from "./ExchangeRateLineDivider";

const Line = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 10px 12px;
  gap: 1rem;

  background-color: #393939;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #444444;
  }

  ${exchangeRateLineDivider}

  @media (min-width: 480px) {
    flex-direction: row;
  }
`;

const CurrencyCode = styled.span`
  font-weight: 600;
  width: 2.5rem;
`;

const ExchangeRate = styled.span`
  text-align: center;
  font-variant-numeric: tabular-nums;

  @media (min-width: 480px) {
    text-align: right;
  }
`;

const FirstPartWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  gap: 12px;
  text-align: left;

  @media (min-width: 480px) {
    justify-content: left;
  }
`;

type CurrencyAmountInputProps = {
  exchangeRateLine: ExchangeRateLine;
};
export function CurrencyExchangeRateLine({
  exchangeRateLine,
}: CurrencyAmountInputProps) {
  const { setValue } = useFormContext<ExchangeRateFormValueTypes>();

  const handleOnClick = () => {
    setValue(OTHER_CURRENCY_PROP_NAME, exchangeRateLine.currencyCode);
  };

  return (
    <Line type="button" onClick={handleOnClick}>
      <FirstPartWrapper>
        <CurrencyCode>{exchangeRateLine.currencyCode}</CurrencyCode>
        <span>
          {exchangeRateLine.countryName} - {exchangeRateLine.currencyName}
        </span>
      </FirstPartWrapper>
      <ExchangeRate>
        {exchangeRateLine.amount} {exchangeRateLine.currencyCode} ={" "}
        {exchangeRateLine.rate} CZK
      </ExchangeRate>
    </Line>
  );
}
