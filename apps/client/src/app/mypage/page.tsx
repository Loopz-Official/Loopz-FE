import Banner from '@/components/features/mypage/Banner';
import ButtonSection from '@/components/features/mypage/ButtonSection';
import NavigationSection from '@/components/features/mypage/NavigationSection';
import Profile from '@/components/features/mypage/Profile';

export default function MyPage() {
    return (
        <>
            <Profile />
            <Banner />
            <NavigationSection />
            <ButtonSection />
        </>
    );
}
