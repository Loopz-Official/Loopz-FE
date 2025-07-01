import Image from 'next/image';

export default function IntroSection() {
    return (
        <section className="flex w-full flex-col items-center overflow-hidden">
            <div className="text-gray-regular text-caption-01 mb-1 tracking-normal">
                Recommerce Platform
            </div>
            <Image
                priority
                src={'/about/logo.svg'}
                width={130}
                height={56}
                alt="Loopz"
            />

            <div className="mb-2.5 mt-[2.375rem] h-16 w-[1px] bg-[var(--border-color-disabled)]" />

            <div className="text-body-03 text-center font-normal">
                Loop: 고리나 반복,
                <br />
                새로운 이야기를 만들어 내는 연결
            </div>

            <Image
                priority
                src={'/about/loop.svg'}
                alt=""
                width={104}
                height={55}
                className="w-26 mb-[2.375rem] mt-[2.125rem] h-[55px]"
            />

            <div className="text-body-03 relative pb-[clamp(130px,30vw,180px)] font-normal">
                우리는 한 번만 쓰이던 이야기에 다음 장을 엽니다.
                <div className="absolute -top-[clamp(15%,15vw,50%)] left-1/2 -z-10 aspect-[3.1/1] h-auto w-[clamp(452px,120vw,806px)] -translate-x-1/2 rounded-b-[100%] bg-[linear-gradient(0deg,#F5F5F5_0%,#FFF_100%)] max-[480px]:-top-[10vw]" />
            </div>
        </section>
    );
}
