'use client';

import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';

export default function BottomFixedButton({
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
                `${position} bottom-0 z-50 grid w-full max-w-2xl grid-cols-[auto_1fr] items-center bg-white shadow-[0px_-6px_20px_0px_rgba(0,0,0,0.04)]`,
                position === 'fixed'
                    ? 'h-18 left-1/2 -translate-x-1/2 px-5 py-3'
                    : 'h-14',
                isBottomSheetOpen
                    ? 'border-gray-regular border-t border-solid'
                    : isObjeDetailPage && 'gap-x-6'
            )}
        >
            <div className="flex h-full items-center gap-4">{children}</div>
            <button
                disabled={isDisabled}
                onClick={onClick}
                className={clsx(
                    'disabled:bg-button-disabled h-full w-full rounded-[0.25rem] bg-black font-semibold text-white',
                    position === 'fixed' ? 'text-body-03 py-3' : 'text-body-01'
                )}
            >
                {text}
            </button>
        </div>
    );
}
