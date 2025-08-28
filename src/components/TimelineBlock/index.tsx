import React from 'react';
import {Title} from "@/components/Title";
import {TimelinePagination} from "@/components/TimelinePagination";
import * as s from './TimelineBlock.module.scss'
import {DateRange} from "@/components/DateRange";
import {useTimeline} from "@/utils/useTimeline";
import {segments} from "@/data";
import {Carousel} from "@/components/Carousel";
import {useMediaQuery} from "@/utils/useMediaQuery";
import {Circle} from "@/components/Circle";

export const TimelineBlock = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const {activeSegment, activeSegmentId, totalSegments, next, prev} = useTimeline(segments);
    const {startYear, endYear} = activeSegment
    return (
        <div className={s.container}>
            <Title/>
            <Circle segments={segments} total={totalSegments}/>
            <div className={`${!isMobile && s.dateRangeAbsolute}`}>
                <DateRange start={startYear} end={endYear}/>
            </div>
            {isMobile && <hr/>}
            <div className={s.control}>
                <TimelinePagination total={totalSegments} activeIndex={activeSegment.index} next={next} prev={prev}/>
                <Carousel cards={activeSegment.events}/>
            </div>
        </div>
    );
};
