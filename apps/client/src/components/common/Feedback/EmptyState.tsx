import { InfoIcon } from '@/icons/Feedback';

type EmptyStateProps = {
    message: string;
    headerHeight: number;
};

const EmptyState = ({ message, headerHeight }: EmptyStateProps) => {
    return (
        <div
            className="flex w-full items-center justify-center"
            style={{ height: `calc(90vh - ${headerHeight}px)` }}
        >
            <section className="flex flex-col items-center justify-center gap-4">
                <InfoIcon />
                <span className="text-headline-04 font-normal">{message}</span>
            </section>
        </div>
    );
};

export default EmptyState;
