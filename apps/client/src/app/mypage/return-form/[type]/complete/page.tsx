import Header from '@/components/layouts/Header';

export default async function Page({
    params,
}: {
    params: Promise<{ type: 'cancel' | 'return' }>;
}) {
    const { type } = await params;
    const isCancel = type === 'cancel';

    // const item = {
    //     totalPrice: 21000,
    //     quantity: 1,
    //     objectId: '1',
    //     objectName: '이름',
    //     imageUrl: '/banner/01.png',
    //     objectPrice: 21000,
    // };

    return (
        <div className="grid h-dvh grid-rows-[auto_1fr_auto]">
            <Header
                type="pop-up"
                title={isCancel ? '취소 요청' : '반품/환불 요청'}
            />

            <div className="flex h-full flex-col items-center justify-center">
                <div className="mb-8 h-16 w-16 bg-[url('/complete.svg')] bg-center bg-no-repeat" />

                <div className="text-body-01 mb-1 font-semibold">
                    {isCancel ? '주문취소가' : '환불요청이'} 완료되었어요!
                </div>
                <div className="text-gray-regular text-caption-01 text-center">
                    빠르게 요청을 확인하여
                    <br /> 환불 처리를 도와드리겠습니다.
                </div>
            </div>

            <div className="w-full px-5">
                <div className="w-full space-y-4 border-t pb-10 pt-3">
                    <div className="text-body-01 font-semibold">
                        {isCancel ? '취소' : '환불'} 요청 상품
                    </div>
                    {/* <OrderItem item={item} variant="form" /> */}
                    <button className="border-button-gray-regular text-body-03 w-full rounded-md border py-2">
                        취소 상세
                    </button>
                </div>
            </div>
        </div>
    );
}
