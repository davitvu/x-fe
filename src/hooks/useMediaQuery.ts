import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
    const [mathches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);
        const listener = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [query]);

    return mathches;
}

export const useIsMobile = () => useMediaQuery('(max-width: 499px)');
export const useIsTablet = () => useMediaQuery('(min-width: 500px) and (max-width: 988px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
export const useIsLargeDesktop = () => useMediaQuery('(min-width: 1440px)');

export const useResponsive = () => {
    const isMobile = useIsMobile();
    const isTablet = useIsTablet();
    const isDesktop = useIsDesktop();
    const isLargeDesktop = useIsLargeDesktop();

    return {
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop,
        // Utility functions
        isMobileOrTablet: isMobile || isTablet,
        isDesktopOrLarger: isDesktop || isLargeDesktop,
        currentBreakpoint: isMobile ? 'mobile' : isTablet ? 'tablet' : isDesktop ? 'desktop' : 'large'
    };
};
