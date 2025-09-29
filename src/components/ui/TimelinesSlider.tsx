import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { SwiperClass } from 'swiper/react';
import { ITimeline } from '../../data';
import { EventsSlider } from './EventsSlider';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { styled } from 'styled-components';

interface TimelinesSliderProps {
  data: ITimeline[];
  onSlideChange?: (index: number) => void;
  onSwiper?: (swiper: SwiperClass) => void;
  duration: number;
}

const StyledTimelinesSlider = styled(Swiper)`
  width: 100%;
  padding: 0 80px;
  margin-top: auto;

  @media (max-width: 768px) {
    padding: 0;
    display: flex;
    flex-direction: column-reverse;
    gap: 20px;
    flex-grow: 1;
  }

  .swiper-wrapper {
    @media (max-width: 768px) {
      margin-bottom: auto;
    }
  }

  .swiper-pagination {
    position: absolute;
    top: 0;
    bottom: auto;
    left: 80px;
    text-align: left;
    font-weight: 400;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.primary};

    .swiper-pagination-current {
      &::before {
        content: '0';
        display: inline-block;
      }
    }

    .swiper-pagination-total {
      &::before {
        content: '0';
        display: inline-block;
      }
    }

    .swiper-pagination-bullet {
      background-color: ${({ theme }) => theme.colors.primary};
    }

    @media (max-width: 768px) {
      left: 0;
      top: auto;
      bottom: 20px;
      text-align: center;
    }
  }
`;

const StyledSwiperNavigation = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 56px;
  margin-top: 38px;

  @media (max-width: 768px) {
    margin: 0;
    gap: 8px;
  }

  .swiper-button {
    position: static;
    width: 50px;
    height: 50px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 0;
    background-size: 10px;
    background-repeat: no-repeat;
    background-position: center center;

    @media (max-width: 768px) {
      width: 25px;
      height: 25px;
      background-size: 5px;
    }

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.white};
    }

    .swiper-navigation-icon {
      display: none;
    }

    &.swiper-button-prev {
      background-image: url('./icons/slider-arrow.svg');
    }

    &.swiper-button-next {
      background-image: url('./icons/slider-arrow.svg');
      transform: rotate(180deg);
    }
  }
`;

export const TimelinesSlider = ({
  data,
  onSlideChange,
  onSwiper,
  duration,
}: TimelinesSliderProps) => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  return (
    <StyledTimelinesSlider
      modules={[Navigation, EffectFade, Pagination, A11y]}
      onSlideChangeTransitionStart={(swiper: SwiperClass) => {
        swiper.allowSlideNext = false;
        swiper.allowSlidePrev = false;
      }}
      onSlideChangeTransitionEnd={(swiper: SwiperClass) => {
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;
      }}
      navigation={{
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      }}
      spaceBetween={50}
      effect={'fade'}
      fadeEffect={{ crossFade: true }}
      speed={duration * 1000}
      nested={true}
      pagination
      breakpoints={{
        769: {
          pagination: {
            type: 'fraction',
          },
        },
      }}
      onSlideChange={(swiper: SwiperClass) =>
        onSlideChange?.(swiper.activeIndex)
      }
      onSwiper={onSwiper}
    >
      <StyledSwiperNavigation slot="container-start">
        <button
          className="swiper-button swiper-button-prev"
          ref={navigationPrevRef}
        ></button>
        <button
          className="swiper-button swiper-button-next"
          ref={navigationNextRef}
        ></button>
      </StyledSwiperNavigation>
      {data.map(timeline => (
        <SwiperSlide key={timeline.id}>
          <EventsSlider events={timeline.events} />
        </SwiperSlide>
      ))}
    </StyledTimelinesSlider>
  );
};
