import { useEffect, useRef, useState } from "react";
import { useWatch } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import styled from "styled-components";
import type { ExchangeRateLineApi } from "../../../../types/types";
import { OTHER_CURRENCY_PROP_NAME } from "../../../constants/constants";
import { useExchangeRateFormContext } from "../../../hooks/useExchangeRateFormContext.hook";
import { CurrencySelectModalLine } from "./CurrencySelectModalLine";

const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #585858;
  }
`;

const SelectedCurrency = styled.span`
  padding: 0 8px 0 24px;
`;

const Overlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;

  justify-content: right;
  align-items: top;
  @media (min-width: 1024px) {
    justify-content: center;
  }
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #4f4f4f;
  border-radius: 8px;
  width: 200px;
  height: 80%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #3a3a3a;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #6a6a6a;
    border-radius: 8px;
    border: 2px solid #4f4f4f;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #888888;
  }
  scrollbar-width: thin;
  scrollbar-color: #6a6a6a #3a3a3a;

  margin: 1rem 1rem 0 0;
  @media (min-width: 768px) {
    margin: 1rem 3rem 0 0;
  }
  @media (min-width: 1024px) {
    margin: 1rem 0 0 800px;
  }
`;

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
`;

type CurrencySelectProps = {
  exchangeRates: ExchangeRateLineApi[];
};

export const CurrencySelect = ({ exchangeRates }: CurrencySelectProps) => {
  const { control } = useExchangeRateFormContext({ exchangeRates });
  const selectedCurrency = useWatch({
    control,
    name: OTHER_CURRENCY_PROP_NAME,
  });
  const [isOpen, setIsOpen] = useState(false);
  const selectedRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen && selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
    }
  }, [isOpen]);

  const handleOpenButtonClick = () => {
    setIsOpen(true);
  };
  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <SelectButton
        type="button"
        onClick={handleOpenButtonClick}
        data-testid="currency-select-button"
      >
        <SelectedCurrency data-testid="selected-currency">
          {selectedCurrency}
        </SelectedCurrency>
        <IoIosArrowDown />
      </SelectButton>

      {isOpen && (
        <Overlay onClick={handleOverlayClick}>
          <ModalContainer>
            <ModalBody>
              {exchangeRates?.map((it, index) => (
                <CurrencySelectModalLine
                  exchangeRate={it}
                  exchangeRates={exchangeRates}
                  isLast={index === exchangeRates.length - 1}
                  isSelected={it.currencyCode === selectedCurrency}
                  key={it.currencyCode}
                  ref={
                    it.currencyCode === selectedCurrency ? selectedRef : null
                  }
                />
              ))}
            </ModalBody>
          </ModalContainer>
        </Overlay>
      )}
    </>
  );
};
