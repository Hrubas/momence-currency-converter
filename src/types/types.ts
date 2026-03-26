import type {
  CZK_AMOUNT_PROP_NAME,
  OTHER_CURRENCY_AMOUNT_PROP_NAME,
  OTHER_CURRENCY_PROP_NAME,
} from "../constants/constants";

export type ExchangeRatesApi = {
  date: Date;
  exchangeRates: ExchangeRateLineApi[];
};
export type ExchangeRateLineApi = {
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
