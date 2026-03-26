import styled from "styled-components";
import { getLocale } from "../utils/locale";

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  background-color: #393939;
  border-radius: 8px;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #f0f0f0;
  margin: 0 0 0.5rem 0;
`;

const Subtitle = styled.span`
  font-size: 0.875rem;
  color: #b0b0b0;
  line-height: 1.4;
`;

const NoWrap = styled(Subtitle)`
  white-space: nowrap;
`;

type MainHeaderProps = {
  date: Date;
};

export const MainHeader = ({ date }: MainHeaderProps) => {
  return (
    <Wrapper>
      <Title>Currency converter</Title>
      <Subtitle>
        Working with exchange rates from cnb.cz issued on{" "}
        <NoWrap>{date.toLocaleDateString(getLocale())}</NoWrap>
      </Subtitle>
    </Wrapper>
  );
};
