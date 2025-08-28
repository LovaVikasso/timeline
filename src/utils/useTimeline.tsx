import { Segment } from "@/types";
import { useState } from "react";
/**
 * Hook for managing timeline segments
 * @param segments - array of segments with events
 * @returns Object with state and control methods:
 *   - activeSegment: currently active segment
 *   - activeSegmentId: ID of active segment (starts from 0)
 *   - totalSegments: total number of segments
 *   - setActiveSegmentId: set active segment by ID
 *   - next: switch to next segment
 *   - prev: switch to previous segment
 *
 * @example
 * const { activeSegment, activeSegmentId, totalSegments, next, prev } = useTimeline(segments);
 */
export const useTimeline = (segments: Segment[]) => {
    const [activeSegmentId, setActiveSegmentId] = useState(0);

    return {
        activeSegment: segments[activeSegmentId],
        activeSegmentId,
        totalSegments: segments.length,
        setActiveSegmentId,
        next: () => setActiveSegmentId(prev => Math.min(prev + 1, segments.length - 1)),
        prev: () => setActiveSegmentId(prev => Math.max(prev - 1, 0))
    };
};