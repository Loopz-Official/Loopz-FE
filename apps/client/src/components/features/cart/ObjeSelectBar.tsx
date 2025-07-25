import CheckBox from '@/components/common/CheckBox';
import VerticalDivider from '@/components/common/Divider/Vertical';

type ObjectSelectBarProps = {
    objectCount: number;
    selectedCount: number;
    isAllChecked: boolean;
    toggleAll: () => void;
    onDeleteSelected: () => void;
};

const ObjectSelectBar = ({
    objectCount,
    selectedCount,
    isAllChecked,
    toggleAll,
    onDeleteSelected,
}: ObjectSelectBarProps) => {
    return (
        <div className="text-caption-01 text-gray-dark border-gray-regular flex items-center gap-2 border-b border-solid px-5 py-4">
            <label className="flex cursor-pointer select-none items-center gap-2">
                <CheckBox
                    checked={isAllChecked}
                    onChange={toggleAll}
                    variant="product-card"
                    size="md"
                />
                전체 선택 ({selectedCount}/{objectCount})
            </label>

            <VerticalDivider />

            <button onClick={onDeleteSelected}>선택삭제</button>
        </div>
    );
};

export default ObjectSelectBar;
