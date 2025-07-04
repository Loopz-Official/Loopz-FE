'use client';

import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';

export default function BottomButton({
    text,
    isDisabled,
    onClick,
    children,
    position = 'fixed',
    isBottomSheetOpen,
}: {
    text: string;
    isDisabled: boolean;
    onClick: () => void;
    children?: React.ReactNode;
    position?: 'fixed' | 'static';
    isBottomSheetOpen?: boolean;
}) {
    const pathname = usePathname();
    const isObjeDetailPage = pathname.startsWith('/obje');

    return (
        <div
            className={clsx(
                `${position} h-18 bottom-0 z-50 grid w-full max-w-2xl grid-cols-[auto_1fr] items-center bg-white shadow-[0px_-6px_20px_0px_rgba(0,0,0,0.04)]`,
                position === 'fixed' && 'px-5 py-3',
                isBottomSheetOpen
                    ? 'border-gray-regular border-t border-solid'
                    : isObjeDetailPage
                      ? 'gap-x-6'
                      : ''
            )}
        >
            <div className="flex items-center gap-4">{children}</div>
            <button
                disabled={isDisabled}
                onClick={onClick}
                className={clsx(
                    'disabled:bg-button-disabled h-full w-full rounded-[0.25rem] bg-black font-semibold text-white',
                    position === 'fixed'
                        ? 'text-body-03 py-3'
                        : 'text-headline-04'
                )}
            >
                {text}
            </button>
        </div>
    );
}
