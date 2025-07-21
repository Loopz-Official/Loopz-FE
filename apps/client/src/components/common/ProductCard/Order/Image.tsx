import Image from 'next/image';

export interface ProductCardImageProps {
    imageUrl: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
}

const ProductCardImage = ({
    imageUrl,
    alt,
    width = 96,
    height = 96,
    className = '',
}: ProductCardImageProps) => (
    <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        priority
        className={className}
    />
);

export default ProductCardImage;
