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
        <label
            htmlFor={checkBoxInputId}
            className={clsx(
                'flex w-full cursor-pointer items-center gap-2 px-3',
                type === 'all' ? 'bg-gray-12 py-4.5 mb-3' : 'h-11'
            )}
        >
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

            <div className="text-body-03 flex items-center gap-1 text-black">
                {type === 'single' && (
                    <span>[{mandatory ? '필수' : '선택'}]</span>
                )}
                <span>{title}</span>
            </div>
        </label>
    );
};

export default AgreementUnit;
