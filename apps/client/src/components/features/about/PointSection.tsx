import Image from 'next/image';

export default function PointSection() {
    return (
        <section className="h-128 text-body-01 pt-19 h-fix relative w-full space-y-8 overflow-hidden pl-8 font-normal">
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
                    1t 트럭 <span className="font-semibold">1000대 규모</span>
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
        </section>
    );
}
