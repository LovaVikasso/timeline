import React, { useRef } from 'react';
import gsap from 'gsap';
import { Title } from '@/components/Title';
import { TimelinePagination } from '@/components/TimelinePagination';
import { DateRange } from '@/components/DateRange';
import { useTimeline } from '@/utils/useTimeline';
import { segments } from '@/data';
import { Carousel } from '@/components/Carousel';
import { useMediaQuery } from '@/utils/useMediaQuery';
import { Circle } from '@/components/Circle';
import { CategoryTitle } from '@/components/CategoryTitle';
import * as s from './TimelineBlock.module.scss';

export const TimelineBlock = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { activeSegment, activeIndex, totalSegments, next, prev, goTo } =
    useTimeline(segments);
  const { startYear, endYear } = activeSegment;

  const carouselRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);

  const animateChange = (callback: () => void) => {
    callback();

    if (isMobile && controlRef.current) {
      const tl = gsap.timeline();
      tl.set(controlRef.current, { opacity: 0, y: 20 });
      tl.to(controlRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }

    if (!isMobile && carouselRef.current) {
      const tl = gsap.timeline();
      tl.to(carouselRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'sine.inOut',
      });
      tl.to({}, { duration: 0.3 });
      tl.to(carouselRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'sine.inOut',
      });
    }
  };

  const handleNext = () => animateChange(next);
  const handlePrev = () => animateChange(prev);
  const handleGoTo = (index: number) => animateChange(() => goTo(index));

  return (
    <div className={s.container}>
      <Title />
      {!isMobile && (
        <div className={s.circleAbsolute}>
          <Circle
            segments={segments}
            total={totalSegments}
            activeIndex={activeIndex}
            setIndex={handleGoTo}
          />
        </div>
      )}

      <div className={!isMobile ? s.dateRangeAbsolute : undefined}>
        <DateRange start={startYear} end={endYear} />
      </div>

      {isMobile && (
        <div className={s.mobileInfo}>
          {activeSegment.title && <CategoryTitle title={activeSegment.title} />}
          <hr className={s.divider} />
        </div>
      )}

      <div className={s.control}>
        <div className={s.paginationWrapper}>
          <TimelinePagination
            total={totalSegments}
            activeIndex={activeSegment.index}
            next={handleNext}
            prev={handlePrev}
          />
        </div>
        <div ref={controlRef}>
          <div ref={carouselRef}>
            <Carousel cards={activeSegment.events} />
          </div>
        </div>
      </div>
    </div>
  );
};
