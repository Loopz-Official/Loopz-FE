import ProductListToolbar from '../main/ProductListToolbar';

export default function ObjectTab() {
    return (
        <div className="py-1">
            <ProductListToolbar hasFilter={false} hasOrder={false} />
        </div>
    );
}
