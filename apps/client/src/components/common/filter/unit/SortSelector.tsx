import clsx from 'clsx';
import { useState } from 'react';

import { ChevronDownIcon } from '@/icons/Chevron';

const SortSelector = () => {
    const [isRotated, setIsRotated] = useState<boolean>(false);

    return (
        <>
            <button
                className="text-caption-01 text-gray-dark flex items-center"
                onClick={() => setIsRotated(!isRotated)}
            >
                최신순
                <ChevronDownIcon
                    className={clsx(
                        'h-4 w-4 text-black transition-transform duration-200',
                        isRotated ? 'rotate-180' : ''
                    )}
                />
            </button>
        </>
    );
};

export default SortSelector;
