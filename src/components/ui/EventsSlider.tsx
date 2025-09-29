import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation } from 'swiper/modules';
import { IEvent } from '../../data';

import 'swiper/css';
import 'swiper/css/navigation';
import { styled } from 'styled-components';

interface EventsSliderProps {
  events: IEvent[];
}

const StyledEventYear = styled.div`
  font-family: 'Bebas Neue', sans-serif;
  font-weight: 400;
  font-size: 25px;
  line-height: 120%;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.blue};

  @media (max-width: 425px) {
    font-size: 16px;
  }
`;

const StyledEventText = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: 15px;

  @media (max-width: 425px) {
    font-size: 14px;
  }
`;

const StyledEventsSliderWrapper = styled.div`
  position: relative;
  overflow: initial;

  .swiper-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: ${({ theme }) => theme.colors.white};
    margin: 0;
    box-shadow: 0 0 15px 0 rgba(56, 119, 238, 0.1);
    background-size: auto;
    background-repeat: no-repeat;
    background-position: center center;

    @media (max-width: 768px) {
      display: none;
    }

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.white};
    }

    .swiper-navigation-icon {
      display: none;
    }

    &.swiper-button-prev {
      left: -58px;
      background-image: url('./icons/slider-arrow-blue.svg');
    }

    &.swiper-button-next {
      right: -58px;
      background-image: url('./icons/slider-arrow-blue.svg');
      transform: rotate(180deg) translateY(50%);
    }

    &.swiper-button-disabled {
      display: none;
    }
  }

  .swiper-slide-next {
    @media (max-width: 768px) {
      opacity: 0.4;
    }
  }
`;

const StyledEventsSlider = styled(Swiper)`
  .swiper-slide {
    width: 330px;

    @media (max-width: 425px) {
      width: 166px;
    }
  }
`;

export const EventsSlider = ({ events }: EventsSliderProps) => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  return (
    <StyledEventsSliderWrapper>
      <StyledEventsSlider
        modules={[Navigation, A11y]}
        spaceBetween={80}
        nested={true}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        slideToClickedSlide={true}
        slidesPerView={'auto'}
        grabCursor={true}
        breakpoints={{
          0: {
            spaceBetween: 25,
          },
        }}
      >
        {events.map(event => (
          <SwiperSlide key={event.id}>
            <StyledEventYear>{event.year}</StyledEventYear>
            <StyledEventText>{event.text}</StyledEventText>
          </SwiperSlide>
        ))}
      </StyledEventsSlider>

      <button
        className="swiper-button swiper-button-prev"
        ref={navigationPrevRef}
      ></button>
      <button
        className="swiper-button swiper-button-next"
        ref={navigationNextRef}
      ></button>
    </StyledEventsSliderWrapper>
  );
};
