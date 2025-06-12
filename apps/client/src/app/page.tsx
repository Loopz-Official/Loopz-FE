import Header from '../components/common/Header';
import NavigationBar from '../components/common/NavigationBar';
import Banner from '../components/features/main/Banner';
import ObjectBoard from '../components/features/main/ObjectBoard';

export default function Page() {
    return (
        <div>
            <Header type="title" title="텍스트" />
            <main className="flex flex-col gap-20">
                <Banner />
                <ObjectBoard />
            </main>
            <NavigationBar />
        </div>
    );
}
