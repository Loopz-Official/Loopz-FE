import ProductListToolbar from '@/components/features/main/ProductListToolbar';
import Header from '@/components/layouts/Header';

export default function Page() {
    return (
        <div className="pb-14">
            <Header type="main" />
            <ProductListToolbar hasFilter={false} hasOrder={false} />
        </div>
    );
}
