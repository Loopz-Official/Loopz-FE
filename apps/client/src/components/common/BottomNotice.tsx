import { HELPER_TEXT } from '@/constants/helperText';

type BottomNoticeType = 'cart' | 'address';

type BottomNoticeProps = {
    type: BottomNoticeType;
};

const BottomNotice = ({ type }: BottomNoticeProps) => {
    const helperText = HELPER_TEXT[type];

    return (
        <div className="bottom-18 fixed w-full max-w-2xl">
            <hr className="border-gray-light mt-6 border-4" />

            <div className="text-disabled text-caption-02 mb-3 mt-5 grid grid-cols-[auto_1fr] gap-0.5 px-5">
                <div className="w-4 text-center font-black">·</div>
                <div>{helperText}</div>
            </div>
        </div>
    );
};

export default BottomNotice;
