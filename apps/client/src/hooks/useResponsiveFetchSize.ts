import { useCallback, useEffect, useState } from 'react';

import { GRID_BREAKPOINTS } from '@/constants/grid';

// rows: 한 번에 보여줄 row 수 (기본값 5)
export const useResponsiveFetchSize = (rows: number = 4) => {
    const getFetchSize = useCallback(() => {
        if (typeof window === 'undefined')
            return GRID_BREAKPOINTS[0]!.columns * rows;

        const width = window.innerWidth;
        const found = GRID_BREAKPOINTS.find((bp) => width <= bp.maxWidth);

        return found
            ? found.columns * found.rows
            : GRID_BREAKPOINTS[GRID_BREAKPOINTS.length - 1]!.columns * rows;
    }, [rows]);

    const [size, setSize] = useState(() => getFetchSize());

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        const handleResize = () => {
            if (timeout) clearTimeout(timeout);

            timeout = setTimeout(() => {
                setSize(() => getFetchSize());
            }, 300); // 300ms debounce
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            handleResize();
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }

            if (timeout) clearTimeout(timeout);
        };
    }, [getFetchSize, rows]);

    return size;
};
