'use client';

import Header from '@/components/layouts/Header';
import ChipList from '@/components/features/filter/ChipList';
import PriceRange from '@/components/features/filter/PriceRange';
import { filterList } from '@/constants/filterList';

export default function Page() {
    return (
        <div>
            <Header type="title" title="필터" />
            <div className="space-y-8 px-5 py-6">
                {filterList.map(({ title, chips }) => (
                    <div key={title}>
                        <h3 className="text-body-03 font-semibold">{title}</h3>
                        {chips ? (
                            <ChipList key={title} chips={chips} />
                        ) : (
                            <PriceRange />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
