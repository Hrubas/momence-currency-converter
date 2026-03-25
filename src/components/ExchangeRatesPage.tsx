import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getExchangeRates } from "../api/getExchangeRates";
import { CurrencyExchange } from "./CurrencyExchange/CurrencyExchange";
import { ExchangeRateForm } from "./ExchangeRateForm";
import { ExchangeRateList } from "./ExchangeRateList/ExchangeRateList";
import { MainHeader } from "./MainHeader";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const Columns = styled.div`
  display: flex;
  flex: 1;
  gap: 1rem;
  width: 100%;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const ExchangeRatesPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["exchangeRates"],
    queryFn: getExchangeRates,
  });

  if (error) return <PageWrapper>Error loading exchange rates.</PageWrapper>;
  if (isLoading || !data) return <PageWrapper>Loading...</PageWrapper>;

  return (
    <PageWrapper>
      <ExchangeRateForm exchangeRates={data.exchangeRates}>
        <Columns>
          <MainHeader date={data.date} />
          <CurrencyExchange exchangeRates={data.exchangeRates} />
        </Columns>
        <ExchangeRateList exchangeRates={data.exchangeRates} />
      </ExchangeRateForm>
    </PageWrapper>
  );
};
