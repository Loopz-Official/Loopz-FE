import Banner from '@/components/features/main/Banner';
import ObjectBoard from '@/components/features/main/ObjectBoard';
import Header from '@/components/layouts/Header';
import NavigationBar from '@/components/layouts/NavigationBar';

export default function Page() {
    return (
        <div className="pb-14">
            <Header type="main" />
            <main className="flex flex-col gap-20">
                <Banner />
                <ObjectBoard />
            </main>
            <NavigationBar />
        </div>
    );
}
