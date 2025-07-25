import clsx from 'clsx';

import { ModalButtonType } from '@/types/modal';

export interface ButtonConfig {
    text: string;
    onClick: () => void;
    type: ModalButtonType;
}

const ModalButton = ({ text, onClick, type }: ButtonConfig) => {
    return (
        <button
            key={text}
            onClick={onClick}
            className={clsx(
                'text-body-03 w-full px-5 py-3 font-normal',
                type === 'primary'
                    ? 'border-gray-regular border-t bg-white'
                    : 'bg-black text-white'
            )}
        >
            {text}
        </button>
    );
};

export default ModalButton;
