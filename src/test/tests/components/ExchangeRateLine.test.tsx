import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CurrencySelect } from "../../../components/CurrencyExchange/CurrencySelect/CurrencySelect";
import { ExchangeRateLine } from "../../../components/ExchangeRateList/ExchangeRateLine";
import type { ExchangeRateLineApi } from "../../../types/types";
import { renderWithForm } from "../../utils/renderWithForm";

const mockRates: ExchangeRateLineApi[] = [
  {
    amount: 1,
    countryName: "EMU",
    currencyCode: "EUR",
    currencyName: "euro",
    rate: 25,
  },
  {
    amount: 1,
    countryName: "USA",
    currencyCode: "USD",
    currencyName: "dollar",
    rate: 23,
  },
];

describe("ExchangeRateLine", () => {
  it("changes currency when clicked the line", async () => {
    renderWithForm(
      <>
        <ExchangeRateLine exchangeRateLine={mockRates[1]} />
        <CurrencySelect exchangeRates={mockRates} />
      </>,
    );

    expect(screen.getByTestId("selected-currency")).toHaveTextContent("EUR");

    await userEvent.click(screen.getByTestId("exchange-rate-line-USD"));

    expect(screen.getByTestId("selected-currency")).toHaveTextContent("USD");
  });
});
