'use client';

import { useEffect, useState } from 'react';

import { ObjectBoardResponse } from '@/schemas/object';
import { getObjectBoardList } from '@/services/api/object';

import ProductList from './ProductList';
import ProductListToolbar from './ProductListToolbar';

export default function ObjectBoard() {
    const [objectBoardData, setObjectBoardData] =
        useState<ObjectBoardResponse>();

    useEffect(() => {
        const fetchObjectBoardData = async () => {
            const objectBoardData = await getObjectBoardList();
            console.log(objectBoardData);

            if (objectBoardData) {
                setObjectBoardData(objectBoardData);
            }
        };

        fetchObjectBoardData();
    }, []);

    return (
        <div>
            <div className="px-5">
                <h2 className="text-headline-03">Object Board</h2>
                <ProductListToolbar
                    productCount={objectBoardData?.objectCount ?? 0}
                />
            </div>
            <ProductList products={objectBoardData?.objects ?? []} />
        </div>
    );
}
