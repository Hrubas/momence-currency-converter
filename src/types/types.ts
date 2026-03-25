import type {
  CZK_AMOUNT_PROP_NAME,
  OTHER_CURRENCY_AMOUNT_PROP_NAME,
  OTHER_CURRENCY_PROP_NAME,
} from "../constants/constants";

export type ExchangeRates = { date: Date; exchangeRates: ExchangeRateLine[] };
export type ExchangeRateLine = {
  countryName: string;
  currencyCode: string;
  currencyName: string;
  rate: number;
  amount: number;
};
export type ExchangeRateFormValueTypes = {
  [OTHER_CURRENCY_PROP_NAME]: string;
  [CZK_AMOUNT_PROP_NAME]: number | null;
  [OTHER_CURRENCY_AMOUNT_PROP_NAME]: number | null;
};
