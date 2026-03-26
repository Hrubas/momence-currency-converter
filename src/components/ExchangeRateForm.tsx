import { useEffect, type PropsWithChildren } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import styled from "styled-components";
import {
  CZK_AMOUNT_PROP_NAME,
  OTHER_CURRENCY_AMOUNT_PROP_NAME,
  OTHER_CURRENCY_PROP_NAME,
} from "../constants/constants";
import type {
  ExchangeRateFormValueTypes,
  ExchangeRateLineApi,
} from "../types/types";

const Form = styled.form`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  background-color: #242424;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  gap: 1rem;
  width: 100%;

  @media (min-width: 1024px) {
    width: 1000px;
  }
`;

type ExchangeRateFormProps = PropsWithChildren & {
  exchangeRates: ExchangeRateLineApi[];
};

export const ExchangeRateForm = ({
  children,
  exchangeRates,
}: ExchangeRateFormProps) => {
  const formMethods = useForm<ExchangeRateFormValueTypes>({
    defaultValues: {
      [OTHER_CURRENCY_PROP_NAME]: "EUR",
      [CZK_AMOUNT_PROP_NAME]: null,
      [OTHER_CURRENCY_AMOUNT_PROP_NAME]: null,
    },
  });
  const [czkAmount, selectedCurrency] = useWatch({
    control: formMethods.control,
    name: [CZK_AMOUNT_PROP_NAME, OTHER_CURRENCY_PROP_NAME],
  });

  useEffect(() => {
    const selectedExchangeRateLine = exchangeRates.find(
      (it) => it.currencyCode === selectedCurrency,
    );
    if (!selectedExchangeRateLine) {
      return;
    }

    formMethods.setValue(
      OTHER_CURRENCY_AMOUNT_PROP_NAME,
      czkAmount === null
        ? null
        : Math.round(
            (czkAmount || 0) *
              (selectedExchangeRateLine.amount /
                selectedExchangeRateLine.rate) *
              100,
          ) / 100,
    );
  }, [selectedCurrency]);

  return (
    <FormProvider {...formMethods}>
      <Form>{children}</Form>
    </FormProvider>
  );
};
