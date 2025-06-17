import Link from 'next/link';

const agreementList = [
    {
        title: '개인정보 수집/이용 동의',
        href: '',
    },
    {
        title: '개인정보 제3자 제공 동의',
        href: '',
    },
];

export default function AgreementSection() {
    return (
        <>
            <label className="flex items-center gap-3">
                <input
                    type="checkbox"
                    className="border-gray-09 rounded-xs not-checked:bg-[url('/unchecked-check.svg')] relative h-4 w-4 appearance-none border bg-center bg-no-repeat checked:border-black checked:bg-black checked:bg-[url('/checked-check.svg')]"
                />
                <span className="text-caption-01 font-semibold">
                    주문 내용을 모두 확인했으며, 아래 내용에 모두 동의합니다.
                </span>
            </label>

            <hr className="border-gray-light mb-3 mt-4" />

            <div className="space-y-1.5">
                {agreementList.map(({ title, href }) => (
                    <label key={title} className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            className="border-gray-09 rounded-xs not-checked:bg-[url('/unchecked-check.svg')] relative h-4 w-4 appearance-none border bg-center bg-no-repeat checked:border-black checked:bg-black checked:bg-[url('/checked-check.svg')]"
                        />
                        <span className="text-caption-01 text-gray-regular">
                            (필수) {title}
                            <Link href={href} className="ml-1.5 underline">
                                보기
                            </Link>
                        </span>
                    </label>
                ))}
            </div>
        </>
    );
}
