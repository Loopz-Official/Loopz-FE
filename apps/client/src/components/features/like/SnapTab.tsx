import * as I from '@/icons/Alert';

export default function SnapTab() {
    return (
        <div className="fixed h-full w-full max-w-2xl">
            <div className="-translate-y-4/3 absolute top-1/2 flex w-full flex-col items-center justify-center gap-5 text-center">
                <I.AlertIcon />
                <div className="text-headline-04 w-full font-normal">
                    Loopz의 새로운 기능을 준비하고 있어요.
                    <br />곧 더 좋은 서비스로 찾아뵙겠습니다.
                </div>
            </div>
        </div>
    );
}
