type HeaderType = 'main' | 'sub' | 'title' | 'pop-up';

export default function Header({
    type,
    title,
}: {
    type: HeaderType;
    title?: string;
}) {
    return (
        <div className="sticky top-0 grid h-14 w-full grid-cols-[1fr_auto_1fr] bg-white px-5 py-[0.875rem]">
            <div>
                {type === 'main' ? (
                    <div className="ml-1">로고</div>
                ) : type === 'pop-up' ? (
                    <button>닫기</button>
                ) : (
                    <button>뒤로가기</button>
                )}
            </div>
            <div className="text-headline-04">{title}</div>
            <div className="flex gap-4 place-self-end">
                {(type === 'main' || type === 'sub') && (
                    <>
                        <button>검색</button>
                        <button>장바구니</button>
                    </>
                )}
            </div>
        </div>
    );
}
