import ProductCard from '@/components/common/ProductCard/Order';
import { OrderedObjectDetailInfo } from '@/schemas/order';

const OrderedProductCard = ({
    object,
}: {
    object: OrderedObjectDetailInfo;
}) => {
    return (
        <ProductCard.Root>
            <ProductCard.Image
                imageUrl={object.imageUrl}
                alt={object.objectName}
            />
            <ProductCard.Info
                name={object.objectName}
                intro={object.intro}
                price={object.purchasePrice}
            />
        </ProductCard.Root>
    );
};

export default OrderedProductCard;
