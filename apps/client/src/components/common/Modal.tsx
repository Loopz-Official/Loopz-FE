'use client';

import clsx from 'clsx';
import { useEffect } from 'react';

export default function Modal({
    isOpen,
    text,
    buttons,
    onClose,
}: {
    isOpen: boolean;
    text: string;
    buttons: { text: string; onClick: () => void }[];
    onClose: () => void;
}) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        const defaultOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = defaultOverflow;
        };
    }, [isOpen, onClose]);

    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return isOpen ? (
        <div
            onClick={handleBackgroundClick}
            className="z-100 fixed left-0 top-0 flex h-dvh w-dvw items-center justify-center bg-black/60"
        >
            <div className="w-78 h-41 text-body-03 grid grid-rows-[1fr_auto] rounded-sm bg-white">
                <div className="flex items-center justify-center whitespace-pre-line px-5 text-center font-normal">
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
    ) : null;
}
