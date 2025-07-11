import { useCallback, useEffect, useState } from 'react';

import { gridBreakpoints } from '@/constants/grid';

// rows: 한 번에 보여줄 row 수 (기본값 5)
export const useResponsiveFetchSize = (rows: number = 4) => {
    const getFetchSize = useCallback(() => {
        if (typeof window === 'undefined') return gridBreakpoints[0]!.columns;

        const width = window.innerWidth;
        const found = gridBreakpoints.find((bp) => width <= bp.maxWidth);

        return found
            ? found.columns * found.rows
            : gridBreakpoints[gridBreakpoints.length - 1]!.columns * rows;
    }, [rows]);

    const [size, setSize] = useState(() => getFetchSize());

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        const handleResize = () => {
            if (timeout) clearTimeout(timeout);

            timeout = setTimeout(() => {
                setSize(() => getFetchSize());
            }, 300); // 100ms debounce
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
