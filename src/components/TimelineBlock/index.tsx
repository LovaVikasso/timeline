import React, { useRef } from 'react';
import gsap from "gsap";
import { Title } from "@/components/Title";
import { TimelinePagination } from "@/components/TimelinePagination";
import * as s from './TimelineBlock.module.scss';
import { DateRange } from "@/components/DateRange";
import { useTimeline } from "@/utils/useTimeline";
import { segments } from "@/data";
import { Carousel } from "@/components/Carousel";
import { useMediaQuery } from "@/utils/useMediaQuery";
import { Circle } from "@/components/Circle";

export const TimelineBlock = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const { activeSegment, activeIndex, totalSegments, next, prev, goTo } = useTimeline(segments);
    const { startYear, endYear } = activeSegment;

    const carouselRef = useRef<HTMLDivElement>(null);

    const animateChange = (callback: () => void) => {
        if (!carouselRef.current) {
            callback();
            return;
        }
        callback();

        const tl = gsap.timeline();
        tl.to(carouselRef.current, { opacity: 0, duration: 0.4, ease: "sine.inOut" });
        tl.to({}, { duration: 0.3 });

        tl.to(carouselRef.current, { opacity: 1, duration: 0.4, ease: "sine.inOut" });
    };

    const handleNext = () => animateChange(next);
    const handlePrev = () => animateChange(prev);
    const handleGoTo = (index: number) => animateChange(() => goTo(index));

    return (
        <div className={s.container}>
            <Title />
            {!isMobile && (
                <Circle
                    segments={segments}
                    total={totalSegments}
                    activeIndex={activeIndex}
                    setIndex={handleGoTo}
                />
            )}
            <div className={`${!isMobile && s.dateRangeAbsolute}`}>
                <DateRange start={startYear} end={endYear} />
            </div>
            {isMobile && <hr />}
            <div className={s.control}>
                <TimelinePagination
                    total={totalSegments}
                    activeIndex={activeSegment.index}
                    next={handleNext}
                    prev={handlePrev}
                />
                <div ref={carouselRef}>
                    <Carousel cards={activeSegment.events} />
                </div>
            </div>
        </div>
    );
};
