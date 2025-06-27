import { OBJE_METADATA } from '@/constants/objeDetail';

type ObjectMetadataUnitProps = {
    label: 'size' | 'deliveryFee' | 'deliveryInfo' | 'stock';
    metadata: string;
};

const ObjectMetadataUnit = ({ label, metadata }: ObjectMetadataUnitProps) => {
    return (
        <div className="flex items-center gap-4">
            <span className="text-gray-regular text-caption-01 min-w-18">
                {OBJE_METADATA[label]}
            </span>
            <span
                className={
                    label === 'size'
                        ? 'text-caption-01'
                        : 'text-caption-02 font-semibold'
                }
            >
                {metadata}
            </span>
        </div>
    );
};

export default ObjectMetadataUnit;
