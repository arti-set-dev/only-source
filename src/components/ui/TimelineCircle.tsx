import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ITimeline } from '../../data';
import { styled, useTheme } from 'styled-components';

interface TimelinePoint {
  count: number;
  cx: number;
  cy: number;
}

interface TimelineCircleProps {
  data: ITimeline[];
  activeSlide: number;
  onPointClick: (index: number) => void;
  duration: number;
}

const getPointCoordinates = (count: number): { cx: number; cy: number } => {
  const coordinates: Record<number, { cx: number; cy: number }> = {
    1: { cx: 400, cy: 34 },
    2: { cx: 533, cy: 265 },
    3: { cx: 402, cy: 492 },
    4: { cx: 126, cy: 489 },
    5: { cx: 3, cy: 265 },
    6: { cx: 138, cy: 34 },
  };
  return coordinates[count] || { cx: 268, cy: 265 };
};

const StyledTimelineCircle = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;

  @media (max-width: 1220px) {
    transform: translate(-50%, -50%) scale(0.8);
  }

  @media (max-width: 768px) {
    display: none;
  }

  svg {
    overflow: initial;
  }
`;

const StyledTimelineCircleText = styled.text`
  pointer-events: none;
  font-weight: 400;
  font-size: 20px;
  line-height: 150%;
  text-anchor: middle;
  fill: ${props => props.theme.colors.secondary};
  font-size: 0;
  transition: font-size 0.3s ease-in-out;

  &.active {
    font-size: 20px;
  }
`;

const StyledTimelineCircleLabel = styled.text`
  font-weight: 700;
  pointer-events: none;
  font-size: 20px;
  line-height: 150%;
  fill: ${props => props.theme.colors.primary};
  opacity: 0;
  transition: opacity 0.2s ease 0.2s;

  &.active {
    opacity: 1;
  }
`;

export const TimelineCircle = ({
  data,
  activeSlide,
  onPointClick,
  duration,
}: TimelineCircleProps) => {
  const theme = useTheme();
  const pointsRef = useRef<(SVGCircleElement | null)[]>([]);
  const circleRef = useRef<SVGSVGElement | null>(null);
  const textElementsRef = useRef<(SVGTextElement | null)[]>([]);
  const labelElementsRef = useRef<(SVGTextElement | null)[]>([]);

  const handlePointHover = (index: number, isHovering: boolean = false) => {
    const point = pointsRef.current[index];
    const textElement = textElementsRef.current[index];
    if (!point) return;

    if (isHovering && index !== activeSlide) {
      textElement?.classList.add('active');
      gsap.to(point, {
        r: 28,
        fill: theme.colors.background,
        duration: duration,
        ease: 'power2.out',
        stroke: theme.colors.secondary,
        strokeOpacity: 0.5,
      });
    } else if (!isHovering && index !== activeSlide) {
      textElement?.classList.remove('active');
      gsap.to(point, {
        r: 3,
        fill: theme.colors.secondary,
        duration: duration,
        ease: 'power2.out',
      });
    }
  };

  const updateActivePoint = useCallback(
    (slideIndex: number) => {
      // Анимация предыдущей точки обратно в обычное состояние
      const textElement = textElementsRef.current[slideIndex];

      pointsRef.current.forEach((point, index) => {
        if (point && index !== slideIndex) {
          textElement?.classList.remove('active');
          gsap.to(point, {
            r: 3,
            fill: theme.colors.secondary,
            duration: duration,
            ease: 'power2.out',
          });
        }
      });

      // Анимация активной точки
      const activePoint = pointsRef.current[slideIndex];
      if (activePoint) {
        textElement?.classList.add('active');
        gsap.to(activePoint, {
          r: 28,
          fill: theme.colors.background,
          duration: duration,
          ease: 'power2.out',
        });
      }
    },
    [duration, theme.colors.background, theme.colors.secondary]
  );

  const points: TimelinePoint[] = data.map(item => ({
    count: item.count,
    ...getPointCoordinates(item.count),
  }));

  const updateTimelineCircle = useCallback(
    (slideIndex: number) => {
      if (!circleRef.current) return;

      const rotation = -60 * slideIndex; // -60 градусов против часовой стрелки для каждого слайда
      // Поворачиваем весь SVG
      gsap.to(circleRef.current, {
        rotation: rotation,
        transformOrigin: 'center',
        duration: duration,
        ease: 'power1.inOut',
      });

      // Применяем rotate для каждого текстового элемента
      textElementsRef.current.forEach((textElement, index) => {
        if (textElement && points[index]) {
          const { cx, cy } = points[index];
          gsap.to(textElement, {
            attr: { transform: `rotate(${-rotation} ${cx} ${cy})` },
            duration: duration,
            ease: 'power1.inOut',
          });
        }
      });

      labelElementsRef.current.forEach((labelElement, index) => {
        if (labelElement && points[index]) {
          const { cx, cy } = points[index];
          gsap.to(labelElement, {
            attr: { transform: `rotate(${-rotation} ${cx} ${cy})` },
            duration: duration,
            ease: 'power1.inOut',
          });
        }
      });
    },
    [duration, points]
  );

  useEffect(() => {
    updateActivePoint(activeSlide);
    updateTimelineCircle(activeSlide);
  }, [activeSlide, updateActivePoint, updateTimelineCircle]);

  return (
    <StyledTimelineCircle>
      <svg
        width="530"
        height="530"
        viewBox="0 0 536 530"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={circleRef}
      >
        <circle
          opacity="0.2"
          cx="268"
          cy="265"
          r="264.5"
          stroke={theme.colors.secondary}
        />

        {points.map((point, index) => (
          <g key={point.count}>
            <circle
              ref={el => {
                pointsRef.current[index] = el;
              }}
              cx={point.cx}
              cy={point.cy}
              r={index === activeSlide ? 20 : 3}
              stroke={index === activeSlide ? theme.colors.secondary : 'none'}
              strokeOpacity={index === activeSlide ? 0.5 : 0}
              style={{ pointerEvents: 'none' }}
            />
            <circle
              cx={point.cx}
              cy={point.cy}
              r={20}
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onClick={() => onPointClick(index)}
              onMouseEnter={() => handlePointHover(index, true)}
              onMouseLeave={() => handlePointHover(index, false)}
              className="trigger"
            />
            <StyledTimelineCircleText
              ref={(el: SVGTextElement | null) => {
                textElementsRef.current[index] = el;
              }}
              x={point.cx}
              y={point.cy + 7}
              className={index === activeSlide ? 'active' : ''}
            >
              {point.count}
            </StyledTimelineCircleText>
            <StyledTimelineCircleLabel
              ref={(el: SVGTextElement | null) => {
                labelElementsRef.current[index] = el;
              }}
              x={point.cx + 50}
              y={point.cy + 7}
              className={index === activeSlide ? 'active' : ''}
            >
              {data[index]?.title}
            </StyledTimelineCircleLabel>
          </g>
        ))}
      </svg>
    </StyledTimelineCircle>
  );
};
