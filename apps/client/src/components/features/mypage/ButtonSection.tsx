import { MYPAGE_BUTTONS } from '@/constants/mypage';

import AccountActionButton from './AccountActionButton';

export default function ButtonSection() {
    return (
        <div className="mb-8 space-x-2">
            {MYPAGE_BUTTONS.map((btn) => (
                <AccountActionButton key={btn} type={btn} />
            ))}
        </div>
    );
}
