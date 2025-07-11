'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import { LEFT_SIDE_OPTIONS, RIGHT_SIDE_OPTIONS } from '@/constants/header';

import CartCount from '../features/cart/CartCount';

export type HeaderType = 'main' | 'sub' | 'title' | 'pop-up';

type RedirectAction = { type: 'back' } | { type: 'url'; url: string };

type HeaderProps = {
    type: HeaderType;
    title?: string;
    redirectAction?: RedirectAction;
};

export default function Header({ type, title, redirectAction }: HeaderProps) {
    const router = useRouter();

    const currentOption = LEFT_SIDE_OPTIONS[type];
    const isOptionsAvailable = type === 'main' || type === 'sub';

    const handleLeftOptionClick = () => {
        if (type === 'main') {
            router.push('/main');
        } else if (type === 'pop-up') {
            if (redirectAction) {
                if (redirectAction.type === 'back') {
                    router.back();
                } else if (redirectAction.type === 'url') {
                    router.push(redirectAction.url);
                }
            } else {
                router.push('/');
            }
        } else {
            router.back();
        }
    };

    return (
        <div
            className={`sticky top-0 z-20 grid h-14 w-full grid-cols-[1fr_auto_1fr] bg-white px-5 py-[0.875rem]`}
        >
            <div>
                <button
                    onClick={handleLeftOptionClick}
                    className="flex items-center gap-1"
                    aria-label={currentOption.label}
                >
                    <currentOption.icon className={currentOption.className} />
                </button>
            </div>
            <div className="text-headline-04">{title}</div>
            <div className="flex gap-4 place-self-end">
                {isOptionsAvailable && (
                    <>
                        {RIGHT_SIDE_OPTIONS.map(
                            ({ label, icon: Icon, route }) => (
                                <button
                                    key={label}
                                    className={clsx(
                                        'flex items-center gap-1',
                                        label === '장바구니' && 'relative'
                                    )}
                                    aria-label={label}
                                    onClick={() => router.push(route)}
                                >
                                    <Icon className="h-7 w-7" />
                                    {label === '장바구니' && <CartCount />}
                                </button>
                            )
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
