// 필터 로직과 관련된 타입 (constants 관련 X)
export type SelectedChipsMap = {
    [key: string]: Set<string>;
};

export type SelectedFilterItem = {
    title: string;
    chip: string;
};

export type PriceFilter = {
    min: number;
    max: number;
};
