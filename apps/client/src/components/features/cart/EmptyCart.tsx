import { useRouter } from 'next/navigation';

const EmptyCart = () => {
    const router = useRouter();

    return (
        <div className="pt-45 flex h-full flex-col items-center gap-8">
            <h3 className="text-headline-03">
                장바구니에 담은 상품이 없습니다.
            </h3>
            <button
                onClick={() => router.push('/main')}
                className="text-body-01 rounded-xs border border-solid border-black px-12 py-3 font-semibold"
            >
                상품 보러가기
            </button>
        </div>
    );
};
export default EmptyCart;
