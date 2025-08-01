import ProductCard from '@/components/common/ProductCard';
import { OrderedObjectDetailInfo } from '@/schemas/order';

const OrderedProductCard = ({
    object,
}: {
    object: OrderedObjectDetailInfo;
}) => {
    return (
        <ProductCard.Order.Root>
            <ProductCard.Order.Image
                imageUrl={object.imageUrl}
                alt={object.objectName}
            />
            <ProductCard.Order.Info
                name={object.objectName}
                intro={object.intro}
                price={object.purchasePrice}
            />
        </ProductCard.Order.Root>
    );
};

export default OrderedProductCard;
