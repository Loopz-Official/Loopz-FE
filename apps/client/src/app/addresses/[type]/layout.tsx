import Script from 'next/script';

// 다음 주소 검색 API 타입 정의
declare global {
    interface Window {
        daum: {
            Postcode: new (config: {
                oncomplete: (data: {
                    address: string;
                    addressType: string;
                    bname: string;
                    buildingName: string;
                    apartment: string;
                    zonecode: string;
                }) => void;
            }) => {
                open: () => void;
            };
        };
    }
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Script
                src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
                async
            />
            {children}
        </>
    );
}
