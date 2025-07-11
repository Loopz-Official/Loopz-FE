import Banner from '@/components/features/main/Banner';
import ObjectBoard from '@/components/features/main/ObjectBoard';
import Header from '@/components/layouts/Header';

export default function Page() {
    return (
        <div className="pb-14">
            <Header type="main" />
            <main className="flex flex-col gap-12">
                <Banner />
                <ObjectBoard />
            </main>
        </div>
    );
}
