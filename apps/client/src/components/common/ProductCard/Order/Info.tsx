import { formatPrice } from '@/utils/formatPrice';

export interface ProductCardInfoProps {
    name: string;
    intro: string;
    price: number;
    className?: string;
}

const ProductCardInfo = ({
    name,
    intro,
    price,
    className = '',
}: ProductCardInfoProps) => (
    <section className={`flex flex-col justify-between ${className}`}>
        <div className="text-caption-01 flex flex-col gap-0.5">
            <span className="font-semibold">{name}</span>
            <span className="text-gray-04 inline-block w-full">{intro}</span>
        </div>
        <span className="text-body-03 font-semibold">
            {formatPrice(price)}원
        </span>
    </section>
);

export default ProductCardInfo;
