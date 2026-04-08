import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const renderWithForm = (ui: ReactNode) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm({
      defaultValues: {
        czkAmount: null,
        otherCurrencyAmount: null,
        otherCurrency: "EUR",
      },
    });

    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return render(ui, { wrapper: Wrapper });
};
