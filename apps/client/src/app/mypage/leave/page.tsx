import Header from '@/components/layouts/Header';

export default function Page() {
    return (
        <>
            <Header type="title" title="탈퇴하기" />

            <div className="px-5 pt-8">
                <div className="">(필수) 탈퇴 사유를 선택해 주세요.</div>
            </div>
        </>
    );
}
