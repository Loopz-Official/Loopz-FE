export default function RectangleSection() {
    return (
        <section className="text-body-01 min-[480]:mt-40 relative mt-20 w-full text-center font-semibold text-white">
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
        </section>
    );
}
