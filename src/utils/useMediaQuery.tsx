import { useState, useEffect } from 'react';
/**
 * Custom hook to track media query changes
 * @param query - CSS media query string to monitor
 * @returns Boolean indicating if the media query currently matches
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 */
export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        setMatches(media.matches);

        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };
        media.addEventListener('change', handleChange);

        return () => {
            media.removeEventListener('change', handleChange);
        };
    }, [query]);

    return matches;
};