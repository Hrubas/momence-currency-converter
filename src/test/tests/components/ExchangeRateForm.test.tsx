import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFormContext } from "react-hook-form";
import { describe, expect, it } from "vitest";
import { ExchangeRateForm } from "../../../components/ExchangeRateForm";
import {
  CZK_AMOUNT_PROP_NAME,
  OTHER_CURRENCY_AMOUNT_PROP_NAME,
  OTHER_CURRENCY_PROP_NAME,
} from "../../../constants/constants";
import type { ExchangeRateFormValueTypes } from "../../../types/types";

const TestInputs = () => {
  const { watch, setValue } = useFormContext<ExchangeRateFormValueTypes>();
  const czk = watch(CZK_AMOUNT_PROP_NAME);
  const otherCurrency = watch(OTHER_CURRENCY_PROP_NAME);
  const otherAmount = watch(OTHER_CURRENCY_AMOUNT_PROP_NAME);

  return (
    <div>
      <input
        data-testid="czkAmount"
        value={czk ?? ""}
        onChange={(e) => setValue(CZK_AMOUNT_PROP_NAME, Number(e.target.value))}
      />
      <input
        data-testid="otherCurrency"
        value={otherCurrency}
        onChange={(e) => setValue(OTHER_CURRENCY_PROP_NAME, e.target.value)}
      />
      <div data-testid="otherAmount">{otherAmount ?? ""}</div>
    </div>
  );
};

describe("ExchangeRateForm", () => {
  const mockRates = [
    {
      currencyCode: "EUR",
      amount: 1,
      rate: 25,
      countryName: "EMU",
      currencyName: "euro",
    },
    {
      currencyCode: "USD",
      amount: 1,
      rate: 20,
      countryName: "USA",
      currencyName: "dollar",
    },
  ];

  it("recalculates other currency amount when selected currency changes", async () => {
    render(
      <ExchangeRateForm exchangeRates={mockRates}>
        <TestInputs />
      </ExchangeRateForm>,
    );

    const czkInput = screen.getByTestId("czkAmount");
    const currencyInput = screen.getByTestId("otherCurrency");
    const otherAmountDisplay = screen.getByTestId("otherAmount");

    await userEvent.clear(czkInput);
    await userEvent.type(czkInput, "100");

    await userEvent.clear(currencyInput);
    await userEvent.type(currencyInput, "USD");

    expect(otherAmountDisplay.textContent).toBe("5");
  });
});
