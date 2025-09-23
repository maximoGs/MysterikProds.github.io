// Fix: Replace UMD-style destructuring with a proper module import.
import { useState, useEffect } from 'react';
import React from 'react';

interface ObserverOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
    triggerOnce?: boolean;
}

// Fix: Export the hook to be used in other modules.
export const useIntersectionObserver = (
    elementRef: React.RefObject<Element>,
    {
        threshold = 0.1,
        root = null,
        rootMargin = '0px',
        triggerOnce = true,
    }: ObserverOptions = {}
): boolean => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element || typeof IntersectionObserver === 'undefined') {
             setIsIntersecting(true);
             return;
        }

        const observer = new IntersectionObserver(
            ([entry], obs) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    if (triggerOnce) {
                        obs.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsIntersecting(false);
                }
            },
            { threshold, root, rootMargin }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [elementRef, threshold, root, rootMargin, triggerOnce]);

    return isIntersecting;
};