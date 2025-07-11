import { MYPAGE_LINKS } from '@/constants/mypage';

import CustomLink from './CustomLink';

export default function Navigations() {
    return (
        <div className="mb-10">
            {MYPAGE_LINKS.map(({ label, href }) => (
                <CustomLink key={label} href={href}>
                    {label}
                </CustomLink>
            ))}
        </div>
    );
}
