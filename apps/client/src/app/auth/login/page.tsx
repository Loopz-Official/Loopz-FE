import { OAUTH_SERVICES } from '@/constants/auth';
import { LoopzLogo } from '@/icons/Auth';

export default function LoginPage() {
    return (
        <div className="pt-70 flex h-screen w-full flex-col items-center justify-between pb-16">
            <section className="flex w-full flex-col items-center gap-5">
                <LoopzLogo />
                <span className="text-body-02 text-gray-regular">
                    한시적 연출물, 지속가능한 공간으로 이어지다
                </span>
            </section>

            <ul className="flex h-fit w-full max-w-[375px] flex-col gap-2">
                {OAUTH_SERVICES.map((service) => (
                    <li key={service.name}>
                        <a
                            href={service.url}
                            className={`text-body-01 flex h-[54px] w-full items-center justify-center gap-3 rounded-md font-normal ${service.name === '네이버' ? 'text-white' : ''} ${service.name === 'Google' ? `border-[${service.borderColor}] border border-solid` : ''}`}
                            style={{ backgroundColor: service.bgColor }}
                        >
                            <service.icon />
                            {service.name}로 시작하기
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
