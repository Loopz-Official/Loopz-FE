export default function Page() {
    return (
        <div className="mt-16 flex flex-col items-center">
            <div className="text-gray-regular text-caption-01 tracking-normal">
                Recommerce Platform
            </div>
            <div>로고 이미지</div>

            <div className="h-16 w-[1px] bg-[var(--border-color-disabled)]" />

            <div className="text-body-03 text-center font-normal">
                Loop: 고리나 반복,
                <br />
                새로운 이야기를 만들어 내는 연결
            </div>

            <div>로고 이미지</div>
            <div className="text-body-03 font-normal">
                우리는 한 번만 쓰이던 이야기에 다음 장을 엽니다.
            </div>
            <div>타원형 도형</div>

            <div className="text-body-01 font-normal">
                <div className="text-caption-01 text-point font-medium">
                    Point 1.
                </div>
                <div>
                    팝업스토어 한 곳당{' '}
                    <span className="font-semibold">평균 3t,</span>
                </div>
                <div>
                    <span className="font-semibold">최대 30t의 폐기물</span>{' '}
                    발생
                </div>

                <div className="text-caption-01 text-point font-medium">
                    Point 2.
                </div>
                <div>연간 소규모 작품</div>
                <div>
                    1t 트럭 <span className="font-semibold">1000대 규모</span>
                </div>
                <div>
                    <span className="font-semibold">폐기물</span> 발생
                </div>

                <div>이미지</div>
            </div>

            <div className="text-body-01 w-full text-center font-semibold text-white">
                <div className="bg-[url('/banner-01.png')]">
                    Loopz는 순환 유통을 기반으로
                    <br />
                    새로운 가치를 창출합니다
                </div>
                <div className="relative flex w-full">
                    <div className="flex-1 bg-[url('/banner-01.png')]">
                        FLOW
                    </div>
                    <div className="-translate-1/2 absolute left-1/2 top-1/2">
                        +
                    </div>
                    <div className="flex-1 bg-[url('/banner-01.png')]">
                        Re:Place
                    </div>
                </div>
            </div>

            <div className="text-body-03 font-normal">
                <div className="text-caption-01 text-point font-medium">
                    Project 1.
                </div>
                <div className="text-headline-02">Project FLOW</div>

                <div className="font-medium">
                    한 번의 전시로 사라지는
                    <br />
                    대형 구축물과 가구에 주목합니다.
                </div>

                <div>이미지</div>

                <div>
                    팝업, 문화 행사, 공연 등에 사용된 구조믈과 자산이 보관
                    부담과 폐기 비용 속에서 잊혀지지 않도록, 다른 사업장의
                    새로운 프로젝트로 이어질 수 있는 흐름을 만듭니다.
                </div>
                <div>
                    공간을 구성하던 대형 오브제들은 사업장 간 유통망을 통해 다시
                    살아나고, 비용을 줄임과 동시에 지속 가능한 선택으로
                    이어집니다.
                </div>
            </div>

            <div className="text-body-03 font-normal">
                <div className="text-caption-01 text-point font-medium">
                    Project 2.
                </div>
                <div className="text-headline-02">Project Re:Place</div>

                <div className="font-medium">
                    일반 소비자가 활용할 수 있는
                    <br />
                    소품과 오브제를 수집합니다.
                </div>

                <div>이미지</div>

                <div>
                    한 번 쓰이고 버려질 뻔한 전시 소품, 팝업과 공연에 사용된
                    구조물 등 감각적이고 심미적인 가치가 있는 오브제들을 선별해,
                    누구나 자신의 공간에서 인테리어 소품으로 재해석할 수 있도록
                    제안합니다.
                </div>
                <div>
                    낯설지만 특별했던 공간의 요소들이 당신의 일상으로 이어져,
                    새로운 이야기를 만들어갑니다.
                </div>
            </div>

            <div className="text-white">
                <div className="text-headline-04">협력 문의하기</div>

                <div className="text-body-03 font-normal">
                    제품 업로드는 Loopz가 전담합니다.
                    <br />
                    업로드 예정 물품의 신속한 등록을 위해 24시간 전담인력이
                    상주하고 있습니다. 언제든 편하게 연락 부탁드립니다.
                </div>

                <button className="text-gray-dark text-caption-01 rounded-full bg-white font-medium tracking-normal">
                    Contact us
                </button>
            </div>
        </div>
    );
}
