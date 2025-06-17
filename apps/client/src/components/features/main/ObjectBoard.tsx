import ProductList from './ProductList';
import ProductListToolbar from './ProductListToolbar';

export default function ObjectBoard() {
    return (
        <div>
            <div className="px-5">
                <h2 className="text-headline-03">Object Board</h2>
                <ProductListToolbar />
            </div>
            <ProductList />
        </div>
    );
}
