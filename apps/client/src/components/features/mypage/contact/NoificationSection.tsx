import { CONTACT_NOTIFICATIONS } from '@/constants/mypage';

export default function NotificationSection() {
    return (
        <ul className="text-body-02 text-gray-dark list-none font-normal">
            {CONTACT_NOTIFICATIONS.map(({ label, value }) => (
                <li key={label}>
                    {label}: {value}
                </li>
            ))}
        </ul>
    );
}
