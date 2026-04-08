import { useWatch } from "react-hook-form";
import { NumericFormat, type OnValueChange } from "react-number-format";
import styled from "styled-components";
import type {
  ExchangeRateFormValueTypes,
  ExchangeRateLineApi,
} from "../../../types/types";
import { CZK_AMOUNT_PROP_NAME } from "../../constants/constants";
import { useExchangeRateFormContext } from "../../hooks/useExchangeRateFormContext.hook";
import { getDecimalSeparator } from "../../utils/locale";

type CurrencyAmountInputProps = {
  exchangeRates: ExchangeRateLineApi[];
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
  const { control, setCzkCurrencyAmount, setOtherCurrencyAmount } =
    useExchangeRateFormContext({ exchangeRates });
  const [value] = useWatch({
    control,
    name: [propName],
  });

  const handleValueChange: OnValueChange = (values, sourceInfo) => {
    if (sourceInfo.source === "event") {
      const newValue = values.floatValue || null;

      if (propName === CZK_AMOUNT_PROP_NAME) {
        setCzkCurrencyAmount(newValue);
      } else {
        setOtherCurrencyAmount(newValue);
      }
    }
  };

  return (
    <StyledNumericFormat
      decimalSeparator={getDecimalSeparator()}
      inputMode="decimal"
      value={value ?? ""}
      data-testid={propName}
      placeholder="Enter the amount"
      onValueChange={handleValueChange}
    />
  );
};
