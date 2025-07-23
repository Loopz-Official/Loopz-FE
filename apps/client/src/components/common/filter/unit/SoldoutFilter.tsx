import CheckBox from '@/components/common/CheckBox';

type SoldoutFilterProps = {
    value: boolean;
    onChange: (checked: boolean) => void;
};

const SoldoutFilter = ({ value, onChange }: SoldoutFilterProps) => {
    return (
        <label
            role="button"
            tabIndex={0}
            className="flex w-fit cursor-pointer items-center gap-2"
        >
            <CheckBox
                checked={value}
                onChange={() => onChange(!value)}
                size="sm"
            />
            <span className="text-caption-01 text-gray-dark select-none">
                품절제외
            </span>
        </label>
    );
};

export default SoldoutFilter;
