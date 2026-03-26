import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CurrencySelect } from "../../../components/CurrencyExchange/CurrencySelect/CurrencySelect";
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

describe("CurrencySelect", () => {
  it("changes currency when clicked in modal", async () => {
    renderWithForm(<CurrencySelect exchangeRates={mockRates} />);

    expect(screen.getByTestId("selected-currency")).toHaveTextContent("EUR");

    await userEvent.click(screen.getByTestId("currency-select-button"));
    await userEvent.click(screen.getByTestId("currency-select-modal-line-USD"));

    expect(screen.getByTestId("selected-currency")).toHaveTextContent("USD");
  });
});
