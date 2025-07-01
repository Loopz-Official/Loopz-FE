import ContactSection from '@/components/features/about/ContactSection';
import IntroSection from '@/components/features/about/IntroSection';
import PointSection from '@/components/features/about/PointSection';
import ProjectSection from '@/components/features/about/ProjectSection';
import RectangleSection from '@/components/features/about/RectangleSection';

export default function Page() {
    return (
        <div className="mt-16 flex w-full flex-col items-center break-keep">
            <IntroSection />
            <PointSection />
            <RectangleSection />
            <ProjectSection />
            <ContactSection />
        </div>
    );
}
