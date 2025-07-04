import clsx from 'clsx';

import { SelectedFilter } from '@/app/filter/page';

interface Chip {
    label: string;
    value: string;
}

export default function ChipList({
    chips,
    selectedChips,
    onClick,
}: {
    chips: Chip[];
    selectedChips: SelectedFilter[];
    onClick: (chip: string) => void;
}) {
    const isActive = (chip: Chip) => {
        return selectedChips.some((item) => item.chip === chip.value);
    };

    return (
        <div className="mt-2 flex flex-wrap gap-x-1.5 gap-y-2">
            {chips.map((chip) => (
                <button
                    onClick={() => {
                        onClick(chip.value);
                    }}
                    key={chip.label}
                    className={clsx(
                        'text-body-03 rounded-full border px-[0.875rem] py-1 tracking-normal',
                        isActive(chip)
                            ? 'border-black bg-black text-white'
                            : 'border-gray-regular text-gray-dark bg-white'
                    )}
                >
                    {chip.label}
                </button>
            ))}
        </div>
    );
}
