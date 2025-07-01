import ContactButton from './ContactButton';

export default function ContactSection() {
    return (
        <div className="mt-25 w-full bg-black bg-[url('/about/contact.png')] bg-cover bg-no-repeat px-8 pb-11 pt-10 text-white">
            <div className="text-headline-04 mb-2">협력 문의하기</div>

            <div className="text-body-03 mb-10 font-normal opacity-80">
                제품 업로드는 Loopz가 전담합니다.
                <br />
                업로드 예정 물품의 신속한 등록을 위해 24시간 전담인력이 상주하고
                있습니다. 언제든 편하게 연락 부탁드립니다.
            </div>

            <ContactButton />
        </div>
    );
}
