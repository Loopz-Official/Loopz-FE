import { useCallback, useState } from 'react';

export const useSingleSelect = (initialValue?: string) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(
        initialValue
    );

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(e.target.value);
    }, []);

    return { selectedValue, onChange, setSelectedValue };
};
