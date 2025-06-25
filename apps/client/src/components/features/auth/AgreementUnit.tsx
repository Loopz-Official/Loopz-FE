'use client';

import clsx from 'clsx';

import { CheckCircle } from '@/icons/Auth';

type AgreementUnitProps = {
    type: 'all' | 'single';
    index?: number;
    mandatory?: boolean;
    title: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
};

const AgreementUnit = ({
    type,
    index,
    mandatory,
    title,
    checked,
    onChange,
}: AgreementUnitProps) => {
    const checkBoxInputId =
        type === 'single' ? `agreement-checkbox-${index}` : 'agreement-all';

    return (
        <div
            className={clsx(
                'flex w-full items-center gap-2 px-3',
                type === 'all' ? 'bg-gray-12 py-4.5' : 'h-11'
            )}
        >
            <label htmlFor={checkBoxInputId} className="cursor-pointer">
                <input
                    type="checkbox"
                    id={checkBoxInputId}
                    className="hidden"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <CheckCircle
                    style={
                        {
                            '--circle-fill': checked ? '#151515' : '#CCCCCC',
                        } as React.CSSProperties
                    }
                />
            </label>

            <div className="text-body-03 flex items-center gap-1 text-black">
                {type === 'single' && (
                    <span>[{mandatory ? '필수' : '선택'}]</span>
                )}
                <span>{title}</span>
            </div>
        </div>
    );
};

export default AgreementUnit;
