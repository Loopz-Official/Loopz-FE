import { ActionButtonInfo } from '@/types/myOrder';

import ActionButtonItem from './ActionButtonItem';

interface ActionButtonList {
    buttons: ActionButtonInfo[];
    maxPerRow?: number; // 한 줄에 최대 버튼 수 (기본값 2)
}

const ActionButtonList = ({ buttons, maxPerRow = 4 }: ActionButtonList) => {
    if (!buttons.length) return null;

    // 버튼을 행 단위로 나누기
    const rows = [];
    for (let i = 0; i < buttons.length; i += maxPerRow) {
        rows.push(buttons.slice(i, i + maxPerRow));
    }

    return (
        <section className="mt-4.5 w-full">
            <div className="flex w-full flex-col gap-2">
                {rows.reverse().map((row, rowIdx) => (
                    <div key={rowIdx} className="flex w-full gap-1.5">
                        {row.map(({ label, onClick }) => {
                            return (
                                <ActionButtonItem
                                    key={label}
                                    label={label}
                                    onClick={onClick}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ActionButtonList;
