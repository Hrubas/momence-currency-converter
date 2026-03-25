import { useFormContext, useWatch } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import styled from "styled-components";
import {
  CZK_AMOUNT_PROP_NAME,
  OTHER_CURRENCY_AMOUNT_PROP_NAME,
  OTHER_CURRENCY_PROP_NAME,
} from "../../constants/constants";
import type {
  ExchangeRateFormValueTypes,
  ExchangeRateLine,
} from "../../types/types";
import { getDecimalSeparator } from "../../utils/locale";

type CurrencyAmountInputProps = {
  exchangeRates: ExchangeRateLine[];
  propName: keyof ExchangeRateFormValueTypes;
};

const StyledNumericFormat = styled(NumericFormat)`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 0.75rem;
  box-sizing: border-box;
  background-color: #393939;
`;

export const CurrencyAmountInput = ({
  propName,
  exchangeRates,
}: CurrencyAmountInputProps) => {
  const { control, setValue } = useFormContext<ExchangeRateFormValueTypes>();
  const [selectedCurrency, value] = useWatch({
    control,
    name: [OTHER_CURRENCY_PROP_NAME, propName],
  });
  const selectedExchangeRate = exchangeRates.find(
    (it) => it.currencyCode === selectedCurrency,
  );

  return (
    <StyledNumericFormat
      decimalSeparator={getDecimalSeparator()}
      inputMode="decimal"
      value={value || 0}
      onValueChange={(values, sourceInfo) => {
        if (sourceInfo.source === "event") {
          const newValue = values.floatValue || 0;
          setValue(propName, newValue);

          if (selectedExchangeRate) {
            const actualRate =
              selectedExchangeRate.rate / selectedExchangeRate.amount;

            if (propName === CZK_AMOUNT_PROP_NAME) {
              setValue(
                OTHER_CURRENCY_AMOUNT_PROP_NAME,
                Math.round((newValue / actualRate) * 100) / 100,
              );
            } else {
              setValue(
                CZK_AMOUNT_PROP_NAME,
                Math.round(newValue * actualRate * 100) / 100,
              );
            }
          }
        }
      }}
    />
  );
};
