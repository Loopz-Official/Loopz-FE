import { REFUND_POLICY } from '@/constants/order';

export default function Page() {
    return (
        <div className="space-y-3">
            <h1 className="text-body-01">[LOOPZ 환불 규정 및 교환 규정]</h1>

            <ul className="text-body-03 text-gray-regular ml-3 list-decimal space-y-3">
                {REFUND_POLICY.map((policy) => (
                    <li key={policy.section} className="space-y-1">
                        <h2>{policy.section}</h2>
                        <ul className="-ml-1 list-none space-y-0.5 font-normal">
                            {policy.subsection.map((subsection) => (
                                <li
                                    className="relative before:absolute before:-left-2 before:top-0 before:font-bold before:content-['·']"
                                    key={subsection.title}
                                >
                                    <p>{subsection.title}</p>
                                    <ul className="list-none">
                                        {subsection.description &&
                                            subsection.description.map(
                                                (description) => (
                                                    <li
                                                        key={description}
                                                        className="relative pl-2.5 before:absolute before:left-0 before:top-0 before:content-['*']"
                                                    >
                                                        <p>{description}</p>
                                                    </li>
                                                )
                                            )}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            <p className="text-body-03 text-gray-regular">
                규정에 명시된 조건 외의 사유로 인한 환불 요청은 원칙적으로
                처리되지 않음을 알려드립니다.
            </p>
        </div>
    );
}
