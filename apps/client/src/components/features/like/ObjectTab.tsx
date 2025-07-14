import { useInView } from 'react-intersection-observer';

import FilterBar from '@/components/common/filter/FilterBar';
import ProductList from '@/components/common/ProductList';
import { useLikedObjectListQuery } from '@/hooks/queries/useObjectQuery';
import { useResponsiveFetchSize } from '@/hooks/useResponsiveFetchSize';

export default function ObjectTab() {
    const { ref, inView } = useInView({
        threshold: 0.8,
    });
    const fetchSize = useResponsiveFetchSize();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        error,
    } = useLikedObjectListQuery(fetchSize);

    // 모든 페이지의 object 리스트를 하나로 합침
    const allObjects = data?.pages?.flatMap((page) => page.objects) ?? [];

    // inView(바닥 감지) 시 다음 페이지 요청
    if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
    }

    // 에러 처리 (📌 추후 Suspense ErrorBoundary로 변경)
    if (status === 'error') {
        return <div>오류가 발생했습니다: {String(error)}</div>;
    }

    return (
        <>
            <FilterBar />
            <ProductList products={allObjects} isLikePage />
            {hasNextPage && allObjects.length > 0 && <div ref={ref}></div>}
        </>
    );
}
