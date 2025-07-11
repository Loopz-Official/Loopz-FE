'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import SuspenseWrapper from '@/components/common/SuspenseWrapper';
import { useObjectBoardQuery } from '@/hooks/queries/useObjectBoardQuery';
import { useResponsiveFetchSize } from '@/hooks/useResponsiveFetchSize';
import { FilterRecord, filterTypeEnum } from '@/schemas/object';
import { validate } from '@/schemas/utils/validate';

import ProductList from './ProductList';
import ProductListToolbar from './ProductListToolbar';

export default function ObjectBoard() {
    // 무한 스크롤을 위한 ref
    const { ref, inView } = useInView({
        threshold: 0.8,
    });
    const searchParams = useSearchParams();
    const fetchSize = useResponsiveFetchSize();

    // searchParams를 객체로 변환
    const filterParams = useMemo(() => {
        const params: Partial<FilterRecord> = {};

        // excludeSoldOut을 먼저 처리해 조건문 연산 최소화
        const excludeSoldOutValue = searchParams.get('excludeSoldOut');
        if (excludeSoldOutValue !== null) {
            params.excludeSoldOut = excludeSoldOutValue === 'true';
        }

        searchParams.forEach((value, key) => {
            if (key === 'excludeSoldOut') return;
            const validatedKey = validate(filterTypeEnum, key, 'Filter Type');

            params[validatedKey] = value.includes(',')
                ? value.split(',')
                : value;
        });

        // console.log('Filter Params:', params);
        return params;
    }, [searchParams]);

    // React Query 무한 쿼리 훅 사용
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        error,
    } = useObjectBoardQuery(filterParams, fetchSize);

    // 모든 페이지의 object 리스트를 하나로 합침
    const allObjects = data?.pages?.flatMap((page) => page.objects) ?? [];
    const objectCount = data?.pages[0]?.objectCount ?? 0;

    // inView(바닥 감지) 시 다음 페이지 요청
    if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
    }

    // 에러 처리 (📌 추후 Suspense ErrorBoundary로 변경)
    if (status === 'error') {
        return <div>오류가 발생했습니다: {String(error)}</div>;
    }

    return (
        <SuspenseWrapper fallback={<div>Loading Object Board...</div>}>
            <div>
                <div className="px-5">
                    <h2 className="text-headline-03">Object Board</h2>
                    <ProductListToolbar productCount={objectCount} />
                </div>
                <ProductList products={allObjects} />
                {/* 무한 스크롤 트리거 */}
                {hasNextPage && allObjects.length > 0 && <div ref={ref}></div>}
            </div>
        </SuspenseWrapper>
    );
}
