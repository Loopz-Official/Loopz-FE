'use client';

import { useEffect } from 'react';

import usePreventBodyScroll from '@/hooks/usePreventBodyScroll';

import ModalButton, { ButtonConfig } from './Button';

interface ModalProps {
    isOpen: boolean;
    text: string;
    buttons: ButtonConfig[];
    onClose: () => void;
}

export default function ModalWrapper({
    isOpen,
    text,
    buttons,
    onClose,
}: ModalProps) {
    usePreventBodyScroll(isOpen);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
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
            <div className="w-75 h-fit overflow-hidden rounded-sm bg-white">
                <p className="text-body-02 h-30 flex w-full items-center justify-center whitespace-pre-line px-5 text-center">
                    {text}
                </p>
                <section className="flex">
                    {buttons.map(({ text, onClick, type }) => (
                        <ModalButton
                            key={text}
                            text={text}
                            onClick={onClick}
                            type={type}
                        />
                    ))}
                </section>
            </div>
        </div>
    ) : null;
}
