'use client';

import clsx from 'clsx';
import { useEffect } from 'react';

export default function Modal({
    text,
    buttons,
}: {
    text: string;
    buttons: { text: string; onClick: () => void }[];
}) {
    useEffect(() => {
        const defaultOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = defaultOverflow;
        };
    }, []);

    // const handleBackgroundClick = (e: React.MouseEvent) => {
    //     if (e.target === e.currentTarget) {
    //         onClose();
    //     }
    // };

    return (
        <div
            // onClick={handleBackgroundClick}
            className="z-100 fixed left-0 top-0 flex h-dvh w-dvw items-center justify-center bg-black/60"
        >
            <div className="w-78 h-41 text-body-03 grid grid-rows-[1fr_auto] rounded-sm bg-white">
                <div className="flex items-center justify-center font-normal">
                    {text}
                </div>
                <div className="flex">
                    {buttons.map((button, i) => (
                        <button
                            key={button.text}
                            onClick={button.onClick}
                            className={clsx(
                                'flex-1 border-t py-3 text-center',
                                {
                                    'rounded-b-sm border-black bg-black text-white':
                                        buttons.length === 1,
                                    'border-gray-light':
                                        buttons.length > 1 && i === 0,
                                    'rounded-br-sm border-black bg-black text-white':
                                        buttons.length > 1 && i === 1,
                                }
                            )}
                        >
                            {button.text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
