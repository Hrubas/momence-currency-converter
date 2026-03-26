import type { ExchangeRateLineApi, ExchangeRatesApi } from "../types/types";

export const getExchangeRates = async () => {
  let response: ExchangeRatesApi;

  try {
    const cnbResponse = await fetch("/api/cnb/daily-rates");
    const responseText = await cnbResponse.text();

    response = parseExchangeRates(responseText);
  } catch (e) {
    console.error("Failed to fetch valid data", e);
    throw e;
  }

  return response;
};

export const parseExchangeRates = (exchangeRates: string) => {
  const rateLines = exchangeRates.trim().split(`\n`);

  const dateString = rateLines.splice(0, 1);
  const date = new Date(dateString[0].split("#")[0]);

  rateLines.splice(0, 1);

  return {
    date,
    exchangeRates: rateLines
      .map(parseExchangeRateLine)
      .sort((a, b) => a.currencyCode.localeCompare(b.currencyCode)),
  };
};

const parseExchangeRateLine = (rateLine: string): ExchangeRateLineApi => {
  const splitLine = rateLine.split("|");

  return {
    countryName: splitLine[0],
    currencyCode: splitLine[3],
    currencyName: splitLine[1],
    rate: Number(splitLine[4]),
    amount: Number(splitLine[2]),
  };
};
