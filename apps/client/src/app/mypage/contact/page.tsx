import ChannelSection from '@/components/features/mypage/contact/ChannelSection';
import NotificationSection from '@/components/features/mypage/contact/NoificationSection';
import Header from '@/components/layouts/Header';

export default function Page() {
    return (
        <>
            <Header type="title" title="1:1 문의" />

            <div className="mx-5 mt-8 space-y-4">
                <div className="text-headline-04">1:1 문의</div>

                <NotificationSection />
                <ChannelSection />
            </div>
        </>
    );
}
