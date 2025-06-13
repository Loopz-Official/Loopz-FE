import Link from 'next/link';

import ProductList from './ProductList';

export default function ObjectBoard() {
    return (
        <div>
            <div className="px-5">
                <h2 className="text-headline-03">Object Board</h2>
                <div className="text-caption-01 text-gray-dark flex justify-between py-3">
                    <span>총 65개</span>
                    <div className="flex gap-4">
                        <button className="flex items-center">
                            최신순
                            <div className="h-4 w-4 bg-black" />
                        </button>
                        <Link
                            href={'/filter'}
                            className="flex items-center gap-0.5"
                        >
                            필터
                            <div className="h-4 w-4 bg-black" />
                        </Link>
                    </div>
                </div>
            </div>
            <ProductList />
        </div>
    );
}
