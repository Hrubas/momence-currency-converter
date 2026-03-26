import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CurrencyExchange } from "../../../components/CurrencyExchange/CurrencyExchange";
import {
  CZK_AMOUNT_PROP_NAME,
  OTHER_CURRENCY_AMOUNT_PROP_NAME,
} from "../../../constants/constants";
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
];

describe("CurrencyExchange", () => {
  it("converts CZK to EUR when user types", async () => {
    renderWithForm(<CurrencyExchange exchangeRates={mockRates} />);

    const czkInput = screen.getByTestId(CZK_AMOUNT_PROP_NAME);
    const eurInput = screen.getByTestId(OTHER_CURRENCY_AMOUNT_PROP_NAME);

    await userEvent.clear(czkInput);
    await userEvent.type(czkInput, "100");

    expect(eurInput).toHaveValue("4");
  });

  it("converts EUR to CZK when user types", async () => {
    renderWithForm(<CurrencyExchange exchangeRates={mockRates} />);

    const czkInput = screen.getByTestId(CZK_AMOUNT_PROP_NAME);
    const eurInput = screen.getByTestId(OTHER_CURRENCY_AMOUNT_PROP_NAME);

    await userEvent.clear(eurInput);
    await userEvent.type(eurInput, "4");

    expect(czkInput).toHaveValue("100");
  });
});
