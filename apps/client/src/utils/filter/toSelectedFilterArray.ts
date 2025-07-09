import type { SelectedChipsMap, SelectedFilterItem } from '@/types/filter';

// selectedChips 객체를 SelectedFilter[]로 변환
export const toSelectedFilterArray = (
    selectedChips: SelectedChipsMap,
    title: string
): SelectedFilterItem[] => {
    return Array.from(selectedChips[title] ?? []).map((chip) => ({
        title,
        chip,
    }));
};
