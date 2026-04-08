import styled from "styled-components";
import { useExchangeRateQuery } from "../hooks/useExchangeRateQuery.hook";
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
  const { data, isLoading, error } = useExchangeRateQuery();

  if (error) return <PageWrapper>Error loading exchange rates.</PageWrapper>;
  if (isLoading || !data) return <PageWrapper>Loading...</PageWrapper>;

  return (
    <PageWrapper>
      <ExchangeRateForm>
        <Columns>
          <MainHeader date={new Date(data.date)} />
          <CurrencyExchange exchangeRates={data.exchangeRates} />
        </Columns>
        <ExchangeRateList exchangeRates={data.exchangeRates} />
      </ExchangeRateForm>
    </PageWrapper>
  );
};
