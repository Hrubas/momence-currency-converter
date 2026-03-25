import styled from "styled-components";
import type { ExchangeRateLine } from "../../types/types";
import { CurrencyExchangeRateLine } from "./CurrencyExchangeRateLine";
import { exchangeRateLineDivider } from "./ExchangeRateLineDivider";

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;

  background-color: #393939;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 1023px) {
    &:first-child {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:nth-child(2) {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
    ${exchangeRateLineDivider}
  }
`;

const Columns = styled.div`
  display: flex;
  gap: 0;
  width: 100%;
  flex-direction: column;

  @media (min-width: 1024px) {
    gap: 1rem;
    flex-direction: row;
  }
`;

type ExchangeRateListProps = {
  exchangeRates: ExchangeRateLine[];
};

export const ExchangeRateList = ({ exchangeRates }: ExchangeRateListProps) => {
  const middleRate = Math.ceil(exchangeRates.length / 2);
  const leftColumnRates = exchangeRates.slice(0, middleRate);
  const rightColumnRates = exchangeRates.slice(middleRate);

  return (
    <Columns>
      <ListWrapper>
        {leftColumnRates.map((it) => (
          <CurrencyExchangeRateLine
            key={it.currencyCode}
            exchangeRateLine={it}
          />
        ))}
      </ListWrapper>

      <ListWrapper>
        {rightColumnRates.map((it) => (
          <CurrencyExchangeRateLine
            key={it.currencyCode}
            exchangeRateLine={it}
          />
        ))}
      </ListWrapper>
    </Columns>
  );
};
