import { useQuery } from "@tanstack/react-query";
import { getExchangeRates } from "../queries/getExchangeRates";

export const useExchangeRateQuery = () => {
  return useQuery({
    queryKey: ["exchangeRates"],
    queryFn: getExchangeRates,
  });
};
