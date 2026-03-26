import { describe, expect, it } from "vitest";
import { parseExchangeRates } from "../../../api/getExchangeRates";
import type { ExchangeRateLineApi } from "../../../types/types";

const sampleData = `25 Mar 2026 #59
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.687
EMU|euro|1|EUR|24.445
USA|dollar|1|USD|21.091`;

describe("parseExchangeRates", () => {
  it("parses sample CNB data correctly", () => {
    const result = parseExchangeRates(sampleData);

    expect(result.date).toEqual(new Date("25 Mar 2026"));

    const first: ExchangeRateLineApi = result.exchangeRates[0];
    const last: ExchangeRateLineApi =
      result.exchangeRates[result.exchangeRates.length - 1];

    expect(first.currencyCode).toBe("AUD");
    expect(first.countryName).toBe("Australia");
    expect(first.currencyName).toBe("dollar");
    expect(first.amount).toBe(1);
    expect(first.rate).toBe(14.687);

    expect(last.currencyCode).toBe("USD");
    expect(last.countryName).toBe("USA");
    expect(last.currencyName).toBe("dollar");
    expect(last.amount).toBe(1);
    expect(last.rate).toBe(21.091);

    expect(result.exchangeRates.length).toBe(3);
  });
});
