import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { ExchangeRateLineApi } from "../../types/types";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse,
) {
  try {
    const cnbResponse = await fetch(
      "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt",
    );

    if (!cnbResponse.ok) {
      throw new Error(
        `Failed to fetch CNB data, status: ${cnbResponse.status}`,
      );
    }

    const responseText = await cnbResponse.text();

    const result = parseExchangeRates(responseText);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

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
