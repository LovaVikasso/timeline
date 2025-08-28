import { Segment } from "@/types";
import { useState } from "react";

/**
 * Hook for managing timeline segments by index
 * @param segments - array of segments with events
 * @returns Object with state and control methods:
 *   - activeSegment: currently active segment
 *   - activeIndex: index of active segment
 *   - totalSegments: total number of segments
 *   - goTo: select segment by index
 *   - next: switch to next segment
 *   - prev: switch to previous segment
 *
 * @example
 * const { activeSegment, activeIndex, totalSegments, next, prev, goTo } = useTimeline(segments);
 */
export const useTimeline = (segments: Segment[]) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const goTo = (index: number) => {
        if (index >= 0 && index < segments.length) {
            setActiveIndex(index);
        }
    };

    return {
        activeSegment: segments[activeIndex],
        activeIndex,
        totalSegments: segments.length,
        goTo,
        next: () => setActiveIndex((prev) => Math.min(prev + 1, segments.length - 1)),
        prev: () => setActiveIndex((prev) => Math.max(prev - 1, 0)),
    };
};
