import SuspenseWrapper from '@/components/common/Wrappers/SuspenseWrapper';

export default function Layout({ children }: { children: React.ReactNode }) {
    return <SuspenseWrapper>{children}</SuspenseWrapper>;
}
