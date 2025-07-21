import React from 'react';

export interface ProductCardRootProps {
    children: React.ReactNode;
    className?: string;
}

const ProductCardRoot = ({
    children,
    className = '',
}: ProductCardRootProps) => (
    <div className={`flex w-full gap-3 ${className}`}>{children}</div>
);

export default ProductCardRoot;
