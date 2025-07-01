import Image from 'next/image';

export default function Page() {
    return (
        <div className="mt-16 flex w-full flex-col items-center break-keep">
            <div className="flex w-full flex-col items-center overflow-hidden">
                <div className="text-gray-regular text-caption-01 mb-1 tracking-normal">
                    Recommerce Platform
                </div>
                <Image
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
            </div>

            <div className="h-128 text-body-01 pt-19 h-fix relative w-full space-y-8 overflow-hidden pl-8 font-normal">
                <div className="space-y-1.5">
                    <div className="text-caption-01 text-point font-medium">
                        Point 1.
                    </div>
                    <div>
                        팝업스토어 한 곳당{' '}
                        <span className="font-semibold">평균 3t,</span>
                        <br />
                        <span className="font-semibold">
                            최대 30t의 폐기물
                        </span>{' '}
                        발생
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="text-caption-01 text-point font-medium">
                        Point 2.
                    </div>
                    <div>
                        연간 소규모 작품
                        <br />
                        1t 트럭{' '}
                        <span className="font-semibold">1000대 규모</span>
                        <br />
                        <span className="font-semibold">폐기물</span> 발생
                    </div>
                </div>

                <Image
                    src={'/about/point.svg'}
                    alt="물품 더미 이미지"
                    width={450}
                    height={516}
                    className="h-129 absolute -right-20 top-0 w-[28.125rem] object-contain"
                />
            </div>

            <div className="text-body-01 min-[480]:mt-40 relative mt-20 w-full text-center font-semibold text-white">
                <div className="bg-point flex aspect-[13/5] h-auto w-full items-center justify-center rounded-t-[clamp(30px,8vw,50px)] bg-[url('/about/loopz-rectangle.png')] bg-cover bg-no-repeat bg-blend-multiply">
                    Loopz는 순환 유통을 기반으로
                    <br />
                    새로운 가치를 창출합니다
                </div>
                <div className="text-caption-02 text-point -translate-1/2 absolute left-1/2 top-1/2 z-10">
                    Project Loopz
                </div>
                <div className="relative flex aspect-[2/1] h-auto w-full">
                    <div className="flex flex-1 items-center justify-center rounded-bl-[clamp(30px,8vw,50px)] bg-[url('/about/flow-rectangle.png')] bg-cover bg-no-repeat">
                        FLOW
                    </div>
                    <div className="-translate-1/2 absolute left-1/2 top-1/2">
                        +
                    </div>
                    <div className="flex flex-1 items-center justify-center rounded-br-[clamp(30px,8vw,50px)] bg-[url('/about/replace-rectangle.png')] bg-cover bg-no-repeat">
                        Re:Place
                    </div>
                </div>
            </div>

            <div className="text-body-03 mt-25 text-gray-dark font-normal">
                <div className="px-8">
                    <div className="text-caption-01 text-point mb-0.5 font-medium">
                        Project 1
                    </div>
                    <div className="text-headline-02 mb-5 text-black">
                        Project FLOW
                    </div>

                    <div className="mb-4 font-medium">
                        한 번의 전시로 사라지는
                        <br />
                        대형 구축물과 가구에 주목합니다.
                    </div>
                </div>

                <div className="relative mb-6 aspect-[9/5] h-auto">
                    <Image
                        src={'/about/project-01.svg'}
                        alt="목업 이미지 1"
                        fill
                        className="h-full w-full"
                    />
                </div>

                <div className="space-y-4 px-8">
                    <div>
                        팝업, 문화 행사, 공연 등에 사용된 구조믈과 자산이 보관
                        부담과 폐기 비용 속에서 잊혀지지 않도록, 다른 사업장의
                        새로운 프로젝트로 이어질 수 있는 흐름을 만듭니다.
                    </div>
                    <div>
                        공간을 구성하던 대형 오브제들은 사업장 간 유통망을 통해
                        다시 살아나고, 비용을 줄임과 동시에 지속 가능한 선택으로
                        이어집니다.
                    </div>
                </div>
            </div>

            <div className="text-body-03 text-gray-dark mt-24 font-normal">
                <div className="px-8">
                    <div className="text-caption-01 text-point mb-0.5 font-medium">
                        Project 2
                    </div>
                    <div className="text-headline-02 mb-5 text-black">
                        Project Re:Place
                    </div>

                    <div className="mb-4 font-medium">
                        일반 소비자가 활용할 수 있는
                        <br />
                        소품과 오브제를 수집합니다.
                    </div>
                </div>

                <div className="relative mb-6 aspect-[9/5] h-auto">
                    <Image
                        src={'/about/project-02.svg'}
                        alt="목업 이미지 2"
                        fill
                        className="h-full w-full"
                    />
                </div>

                <div className="space-y-4 px-8">
                    <div>
                        한 번 쓰이고 버려질 뻔한 전시 소품, 팝업과 공연에 사용된
                        구조물 등 감각적이고 심미적인 가치가 있는 오브제들을
                        선별해, 누구나 자신의 공간에서 인테리어 소품으로
                        재해석할 수 있도록 제안합니다.
                    </div>
                    <div>
                        낯설지만 특별했던 공간의 요소들이 당신의 일상으로
                        이어져, 새로운 이야기를 만들어갑니다.
                    </div>
                </div>
            </div>

            <div className="mt-25 w-full bg-black bg-[url('/about/contact.png')] bg-cover bg-no-repeat px-8 pb-11 pt-10 text-white">
                <div className="text-headline-04 mb-2">협력 문의하기</div>

                <div className="text-body-03 mb-10 font-normal opacity-80">
                    제품 업로드는 Loopz가 전담합니다.
                    <br />
                    업로드 예정 물품의 신속한 등록을 위해 24시간 전담인력이
                    상주하고 있습니다. 언제든 편하게 연락 부탁드립니다.
                </div>

                <button className="text-gray-dark text-caption-01 rounded-full bg-white px-3 py-2 font-medium tracking-normal">
                    Contact us
                </button>
            </div>
        </div>
    );
}
