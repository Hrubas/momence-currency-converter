import type { ExchangeRatesApi } from "../../types/types";

export const getExchangeRates = async () => {
  let responseJson: ExchangeRatesApi;

  try {
    const cnbResponse = await fetch("/api/cnb/daily-rates");
    responseJson = await cnbResponse.json();
  } catch (e) {
    console.error("Failed to fetch valid data", e);
    throw e;
  }

  return responseJson;
};
