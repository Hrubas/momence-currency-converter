import styled from "styled-components";
import {
  CZK_AMOUNT_PROP_NAME,
  OTHER_CURRENCY_AMOUNT_PROP_NAME,
} from "../../constants/constants";
import type { ExchangeRateLineApi } from "../../types/types";
import { CurrencyAmountInput } from "./CurrencyAmountInput";
import { CurrencySelect } from "./CurrencySelect/CurrencySelect";

type CurrencyAmountInputProps = {
  exchangeRates: ExchangeRateLineApi[];
};

const ExchangeContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  background-color: #393939;
`;

const Divider = styled.div`
  width: 1px;
  background-color: #8f8f8f;
  height: 60%;
`;

const InputCurrencyWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #8f8f8f;
  border-radius: 6px;
  overflow: hidden;
  height: 40px;

  &:hover {
    border: 1px solid #ffffff;
    ${Divider} {
      background-color: #ffffff;
    }
  }
`;

const ValueInputWrapper = styled.div`
  flex: 1;
  height: 100%;
`;

const CurrencyLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  width: 100px;
  height: 100%;
  cursor: default;
`;

export const CurrencyExchange = ({
  exchangeRates,
}: CurrencyAmountInputProps) => {
  return (
    <ExchangeContainer>
      <InputCurrencyWrapper>
        <ValueInputWrapper>
          <CurrencyAmountInput
            propName={CZK_AMOUNT_PROP_NAME}
            exchangeRates={exchangeRates}
          />
        </ValueInputWrapper>
        <Divider />
        <CurrencyLabel>CZK</CurrencyLabel>
      </InputCurrencyWrapper>

      <InputCurrencyWrapper>
        <ValueInputWrapper>
          <CurrencyAmountInput
            propName={OTHER_CURRENCY_AMOUNT_PROP_NAME}
            exchangeRates={exchangeRates}
          />
        </ValueInputWrapper>
        <Divider />
        <CurrencySelect exchangeRates={exchangeRates} />
      </InputCurrencyWrapper>
    </ExchangeContainer>
  );
};
