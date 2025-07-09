'use client';

export default function Button({ type }: { type: '로그아웃' | '탈퇴하기' }) {
    const handleButtonClick = () => {
        if (type === '로그아웃') {
            // 로그아웃
        } else {
            // 탈퇴하기기
        }
    };

    return (
        <button
            onClick={handleButtonClick}
            className="text-body-02 border-gray-regular rounded-xs border px-2.5 py-1 font-normal"
        >
            {type}
        </button>
    );
}
