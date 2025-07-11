import ButtonSection from '@/components/features/mypage/ButtonSection';
import HighlightCard from '@/components/features/mypage/HighlightCard';
import NavigationSection from '@/components/features/mypage/NavigationSection';
import Profile from '@/components/features/mypage/Profile';

export default function MyPage() {
    return (
        <>
            <Profile />
            <HighlightCard />
            <NavigationSection />
            <ButtonSection />
        </>
    );
}
