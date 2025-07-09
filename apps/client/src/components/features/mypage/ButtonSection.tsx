import { MYPAGE_BUTTONS } from '@/constants/mypage';

import Button from './Button';

export default function ButtonSection() {
    return (
        <div className="mb-8 space-x-2">
            {MYPAGE_BUTTONS.map((btn) => (
                <Button key={btn} type={btn} />
            ))}
        </div>
    );
}
