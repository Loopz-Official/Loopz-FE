import ReactQueryProvider from './QueryProvider';

export default function ReactQueryProviderWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
