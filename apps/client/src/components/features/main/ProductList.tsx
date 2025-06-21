import Link from 'next/link';

export default function ProductList() {
    return (
        <div className="grid w-full grid-cols-2 pb-3 min-[481px]:grid-cols-3">
            {new Array(10).fill(null).map((item, i) => (
                <Link
                    href="/"
                    key={i}
                    className="hover:bg-gray-12 active:bg-gray-12 flex w-full flex-col gap-4 pb-6 transition-colors"
                >
                    <div className="aspect-square h-auto w-full bg-black"></div>
                    <div className="px-3">
                        <h3 className="text-caption-01 font-semibold">
                            도브 세라믹 화병
                        </h3>
                        <p className="text-caption-01 text-gray-regular break-keep">
                            은은한 광택과 부드러운 곡선이 돋보이는 도브 세라믹
                            화병
                        </p>
                        <p className="text-body-03 mt-2 font-semibold tracking-normal">
                            15,000원
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
