import styled from "styled-components";
import type { ExchangeRateLineApi } from "../../../types/types";
import { useExchangeRateFormContext } from "../../hooks/useExchangeRateFormContext.hook";
import { getLocale } from "../../utils/locale";
import { exchangeRateLineDivider } from "./exchangeRateLineDivider";

const Line = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 10px 1rem;
  gap: 12px;

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

type ExchangeRateLineProps = {
  exchangeRateLine: ExchangeRateLineApi;
  exchangeRates: ExchangeRateLineApi[];
};
export function ExchangeRateLine({
  exchangeRateLine,
  exchangeRates,
}: ExchangeRateLineProps) {
  const { setOtherCurrency } = useExchangeRateFormContext({ exchangeRates });
  const selectCurrency = () => {
    setOtherCurrency(exchangeRateLine.currencyCode);
  };

  return (
    <Line
      type="button"
      onClick={selectCurrency}
      data-testid={`exchange-rate-line-${exchangeRateLine.currencyCode}`}
    >
      <FirstPartWrapper>
        <CurrencyCode>{exchangeRateLine.currencyCode}</CurrencyCode>
        <span>
          {exchangeRateLine.countryName} - {exchangeRateLine.currencyName}
        </span>
      </FirstPartWrapper>
      <ExchangeRate>
        {exchangeRateLine.amount} {exchangeRateLine.currencyCode} ={" "}
        {exchangeRateLine.rate.toLocaleString(getLocale())} CZK
      </ExchangeRate>
    </Line>
  );
}
