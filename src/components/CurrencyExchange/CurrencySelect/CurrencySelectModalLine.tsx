import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { OTHER_CURRENCY_PROP_NAME } from "../../../constants/constants";
import type {
  ExchangeRateFormValueTypes,
  ExchangeRateLineApi,
} from "../../../types/types";

const Line = styled.button<{ $isSelected?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px 1rem;
  width: 100%;
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#6e6e6e" : "transparent"};
  color: #f0f0f0;
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: #444444;
  }
`;

const Divider = styled.div`
  position: absolute;
  bottom: 0;
  left: 10%;
  height: 1px;
  background-color: #8f8f8f;
  width: 80%;
`;

const Code = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: #f0f0f0;
`;

const CountryAndName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 2px;
`;

type CurrencySelectModalLineProps = {
  exchangeRate: ExchangeRateLineApi;
  isLast: boolean;
  isSelected: boolean;
};

export const CurrencySelectModalLine = forwardRef<
  HTMLButtonElement,
  CurrencySelectModalLineProps
>(({ exchangeRate, isSelected, isLast }, selectedCurrencyRef) => {
  const { setValue } = useFormContext<ExchangeRateFormValueTypes>();

  return (
    <Line
      ref={selectedCurrencyRef}
      type="button"
      onClick={() =>
        setValue(OTHER_CURRENCY_PROP_NAME, exchangeRate.currencyCode)
      }
      $isSelected={isSelected}
      data-testid={`currency-select-modal-line-${exchangeRate.currencyCode}`}
    >
      <Code>{exchangeRate.currencyCode}</Code>
      <CountryAndName>
        {exchangeRate.countryName} - {exchangeRate.currencyName}
      </CountryAndName>
      {!isLast && <Divider />}
    </Line>
  );
});
