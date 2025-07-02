import CheckBox from '@/components/common/CheckBox';
import VerticalDivider from '@/components/common/VerticalDivider';

const ObjectSelectBar = () => {
    return (
        <div className="text-caption-01 text-gray-dark border-gray-regular flex items-center gap-2 border-b border-solid px-5 py-4">
            <label className="flex cursor-pointer select-none items-center gap-2">
                {/* isChecked & onChange prop need to be passed */}
                <CheckBox />
                전체 선택 (1/2)
            </label>

            <VerticalDivider />

            <button>선택삭제</button>
        </div>
    );
};

export default ObjectSelectBar;
