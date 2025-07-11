import ChannelSection from '@/components/features/mypage/contact/ChannelSection';
import NotificationSection from '@/components/features/mypage/contact/NoificationSection';
import Header from '@/components/layouts/Header';

export default function Page() {
    return (
        <>
            <Header type="title" title="1:1 문의" />

            <div className="space-y-4 px-5 pt-8">
                <div className="text-headline-04">1:1 문의</div>

                <NotificationSection />
                <ChannelSection />
            </div>
        </>
    );
}
