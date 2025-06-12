import Header from '../components/common/Header';
import NavigationBar from '../components/common/NavigationBar';
import Banner from '../components/features/objectBoard/Banner';

export default function Page() {
    return (
        <div className="bg-gray-03">
            <Header type="title" title="텍스트" />
            <Banner />
            <div className="h-screen"></div>
            <div className="h-screen"></div>
            <div className="h-screen"></div>
            <NavigationBar />
        </div>
    );
}
