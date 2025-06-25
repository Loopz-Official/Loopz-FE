'use client';

import { clsx } from 'clsx';

export default function BottomButton({
    text,
    isDisabled,
    onClick,
    children,
    position = 'fixed',
}: {
    text: string;
    isDisabled: boolean;
    onClick: () => void;
    children?: React.ReactNode;
    position?: 'fixed' | 'static';
}) {
    return (
        <div
            className={clsx(
                `${position} bottom-0 grid w-full max-w-2xl grid-cols-[auto_1fr] bg-white shadow-[0px_-6px_20px_0px_rgba(0,0,0,0.04)]`,
                position === 'fixed' && 'px-5 py-3'
            )}
        >
            <div>{children}</div>
            <button
                disabled={isDisabled}
                onClick={onClick}
                className={clsx(
                    'disabled:bg-button-disabled w-full rounded-[0.25rem] bg-black font-semibold text-white',
                    position === 'fixed'
                        ? 'text-body-03 py-3'
                        : 'text-headline-04 h-14'
                )}
            >
                {text}
            </button>
        </div>
    );
}
