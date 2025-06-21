import clsx from 'clsx';
import { useState } from 'react';

export default function ChipList({ chips: chipsData }: { chips: string[] }) {
    const [chips, setChips] = useState(
        chipsData.map((chip) => ({ chip, isActive: false }))
    );

    const handleChipClick = (chip: string) => {
        setChips(
            chips.map((prevChip) =>
                prevChip.chip === chip
                    ? {
                          ...prevChip,
                          isActive: !prevChip.isActive,
                      }
                    : { ...prevChip }
            )
        );
    };

    return (
        <div className="mt-2 flex flex-wrap gap-x-1.5 gap-y-2">
            {chips.map(({ chip, isActive }) => (
                <button
                    onClick={() => {
                        handleChipClick(chip);
                    }}
                    key={chip}
                    className={clsx(
                        'text-body-03 rounded-full border px-[0.875rem] py-1 tracking-normal',
                        isActive
                            ? 'border-black bg-black text-white'
                            : 'border-gray-regular text-gray-dark bg-white'
                    )}
                >
                    {chip}
                </button>
            ))}
        </div>
    );
}
