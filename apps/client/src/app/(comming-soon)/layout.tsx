import Header from '@/components/layouts/Header';
import NavigationBar from '@/components/layouts/NavigationBar';

export default function Layout() {
    return (
        <div>
            <Header type="title" />
            <div className="flex h-[calc(100vh-112px)] flex-col items-center justify-center">
                <span>Loopz의 새로운 기능을 준비하고 있어요.</span>
                <span>곧 더 좋은 서비스로 찾아뵙겠습니다.</span>
            </div>
            <NavigationBar />
        </div>
    );
}
