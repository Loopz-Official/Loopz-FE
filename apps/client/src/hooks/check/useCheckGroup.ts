import { useEffect, useState } from 'react';

export function useCheckGroup<T>(items: T[], defaultCheckedAll = true) {
    const [checked, setChecked] = useState<T[]>(
        defaultCheckedAll ? [...items] : []
    );

    useEffect(() => {
        const nextChecked = defaultCheckedAll ? [...items] : [];
        // checked가 이미 동일하다면 setChecked 하지 않음
        if (
            checked.length !== nextChecked.length ||
            !checked.every((v, i) => v === nextChecked[i])
        ) {
            setChecked(nextChecked);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, defaultCheckedAll]);

    const isChecked = (item: T) => checked.includes(item);
    const isAllChecked = items.length > 0 && checked.length === items.length;

    const toggle = (item: T) => {
        setChecked((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item]
        );
    };

    const toggleAll = () => {
        setChecked(isAllChecked ? [] : [...items]);
    };

    return {
        checked,
        isChecked,
        isAllChecked,
        toggle,
        toggleAll,
        setChecked,
    };
}
