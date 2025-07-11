import SuspenseWrapper from '@/components/common/SuspenseWrapper';

export default function Layout({ children }: { children: React.ReactNode }) {
    return <SuspenseWrapper>{children}</SuspenseWrapper>;
}
