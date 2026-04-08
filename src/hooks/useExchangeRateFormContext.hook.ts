import { useFormContext, useWatch } from "react-hook-form";
import type {
  ExchangeRateFormValueTypes,
  ExchangeRateLineApi,
} from "../../types/types";
import {
  CZK_AMOUNT_PROP_NAME,
  OTHER_CURRENCY_AMOUNT_PROP_NAME,
  OTHER_CURRENCY_PROP_NAME,
} from "../constants/constants";

type UseExchangeRateFormContextProps = {
  exchangeRates: ExchangeRateLineApi[];
};

export const useExchangeRateFormContext = ({
  exchangeRates,
}: UseExchangeRateFormContextProps) => {
  const formContext = useFormContext<ExchangeRateFormValueTypes>();
  const [selectedCurrency, czkAmount] = useWatch({
    control: formContext.control,
    name: [OTHER_CURRENCY_PROP_NAME, CZK_AMOUNT_PROP_NAME],
  });
  const selectedExchangeRate = exchangeRates.find(
    (it) => it.currencyCode === selectedCurrency,
  );

  const setOtherCurrencyAmount = (newValue: number | null) => {
    formContext.setValue(OTHER_CURRENCY_AMOUNT_PROP_NAME, newValue);

    if (selectedExchangeRate) {
      const actualRate =
        selectedExchangeRate.rate / selectedExchangeRate.amount;

      formContext.setValue(
        CZK_AMOUNT_PROP_NAME,
        newValue === null
          ? null
          : Math.round((newValue || 0) * actualRate * 100) / 100,
      );
    }
  };

  const setCzkCurrencyAmount = (newValue: number | null) => {
    formContext.setValue(CZK_AMOUNT_PROP_NAME, newValue);

    if (selectedExchangeRate) {
      const actualRate =
        selectedExchangeRate.rate / selectedExchangeRate.amount;

      formContext.setValue(
        OTHER_CURRENCY_AMOUNT_PROP_NAME,
        newValue === null
          ? null
          : Math.round(((newValue || 0) / actualRate) * 100) / 100,
      );
    }
  };

  const setOtherCurrency = (currencyCode: string) => {
    const newExchangeRateLine = exchangeRates.find(
      (it) => it.currencyCode === currencyCode,
    );

    formContext.setValue(OTHER_CURRENCY_PROP_NAME, currencyCode);
    formContext.setValue(
      OTHER_CURRENCY_AMOUNT_PROP_NAME,
      czkAmount === null || !newExchangeRateLine
        ? null
        : Math.round(
            (czkAmount || 0) *
              (newExchangeRateLine.amount / newExchangeRateLine.rate) *
              100,
          ) / 100,
    );
  };

  return {
    setCzkCurrencyAmount,
    setOtherCurrency,
    setOtherCurrencyAmount,
    ...formContext,
  };
};
