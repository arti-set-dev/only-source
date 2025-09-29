import { useState } from 'react';
import { ITimeline } from '../data';
import { TimelinesSlider } from './ui/TimelinesSlider';
import { TimelineDates } from './ui/TimelineDates';
import { TimelineCircle } from './ui/TimelineCircle';
import { styled, useTheme } from 'styled-components';

interface TimelineProps {
  data: ITimeline[];
}

const StyledTimeline = styled.section`
  position: relative;
  background-image: url('./icons/bg-grid.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.variables.containerOffset};
  max-width: ${({ theme }) => theme.variables.containerWidth};
  padding: 104px 0;
  height: 100dvh;
  display: grid;
  grid-template-rows: repeat(3, 1fr);

  @media (max-width: 1220px) {
    padding: 70px 0;
  }

  @media (max-height: 950px) {
    max-height: 950px;
    min-height: 900px;
  }

  @media (min-height: 1080px) {
    max-height: 1080px;
  }

  @media (max-width: 768px) {
    padding: 59px 20px 15px;
    background-image: none;
    display: flex;
    flex-direction: column;
    height: auto;
    min-height: 100dvh;
  }
`;

const StyledTitle = styled.h1`
  font-weight: 700;
  font-size: 56px;
  line-height: 120%;
  color: ${props => props.theme.colors.primary};
  max-width: 460px;
  padding-left: 78px;
  position: relative;
  top: 66px;
  height: fit-content;

  @media (max-width: 1024px) {
    top: 0;
  }

  @media (max-width: 768px) {
    padding-left: 0;
    font-size: 40px;
    max-width: 300px;
  }

  @media (max-width: 425px) {
    font-size: 20px;
    max-width: 170px;
  }

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    width: 4px;
    height: 70%;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.iris100},
      ${({ theme }) => theme.colors.fuschia100}
    );

    @media (max-width: 1470px) {
      display: none;
    }
  }
`;

export const Timeline = ({ data }: TimelineProps) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const firstYear = data[activeSlide].events[0].year;
  const lastYear =
    data[activeSlide].events[data[activeSlide].events.length - 1].year;

  const theme = useTheme();
  const duration: number = theme.variables.duration;
  const handlePointClick = (index: number) => {
    if (swiperRef) {
      swiperRef.slideTo(index);
    }
  };

  return (
    <StyledTimeline>
      <StyledTitle>Исторические даты</StyledTitle>

      <TimelineDates
        firstYear={firstYear}
        lastYear={lastYear}
        duration={duration}
      />

      <TimelineCircle
        data={data}
        activeSlide={activeSlide}
        onPointClick={handlePointClick}
        duration={duration}
      />

      <TimelinesSlider
        data={data}
        onSlideChange={setActiveSlide}
        onSwiper={setSwiperRef}
        duration={duration}
      />
    </StyledTimeline>
  );
};
