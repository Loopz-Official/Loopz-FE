import Button from '@/components/features/mypage/Button';
import CustomLink from '@/components/features/mypage/CustomLink';

const MYPAGE_LINKS = [
    {
        label: '주문 내역',
        href: '',
    },
    {
        label: '취소/반품 내역',
        href: '',
    },
    {
        label: '회원 정보 수정',
        href: '',
    },
    {
        label: '1:1 문의하기',
        href: '',
    },
];

const MYPAGE_BUTTONS = ['로그아웃', '탈퇴하기'] as const;

export default function MyPage() {
    return (
        <div>
            <div className="mb-10">
                {MYPAGE_LINKS.map(({ label, href }) => (
                    <CustomLink key={label} href={href}>
                        {label}
                    </CustomLink>
                ))}
            </div>

            <div className="mb-8 space-x-2">
                {MYPAGE_BUTTONS.map((btn) => (
                    <Button key={btn} type={btn} />
                ))}
            </div>
        </div>
    );
}
