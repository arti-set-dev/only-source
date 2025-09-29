import { RefObject } from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import { styled } from 'styled-components';
import theme from '../../theme';

interface TimelineDatesProps {
  firstYear: number;
  lastYear: number;
  duration?: number;
}

interface StyledDateProps {
  ref: RefObject<HTMLSpanElement | null>;
  color: string;
}

const StyledTimelineDates = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 80px;

  @media (max-width: 1220px) {
    padding-top: 30px;
  }

  @media (max-width: 1024px) {
    padding-top: 54px;
  }

  @media (max-width: 768px) {
    gap: 30px;
    padding: 56px 0 58px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.line};
    margin-bottom: 20px;
  }
`;

const StyledDate = styled.span<StyledDateProps>`
  font-weight: 700;
  font-size: 200px;
  line-height: 80%;
  color: ${props => props.color};

  @media (max-width: 1220px) {
    font-size: 150px;
  }

  @media (max-width: 1024px) {
    font-size: 100px;
  }

  @media (max-width: 768px) {
    font-size: 56px;
  }
`;

export const TimelineDates = ({
  firstYear,
  lastYear,
  duration = 0.8,
}: TimelineDatesProps) => {
  const firstYearCountUp = useCountUp({
    to: firstYear,
    duration,
  });

  const lastYearCountUp = useCountUp({
    to: lastYear,
    duration,
  });

  const firstYearColor = theme.colors.iris100;
  const lastYearColor = theme.colors.fuschia100;

  return (
    <StyledTimelineDates>
      <StyledDate color={firstYearColor} ref={firstYearCountUp} />
      <StyledDate color={lastYearColor} ref={lastYearCountUp} />
    </StyledTimelineDates>
  );
};
