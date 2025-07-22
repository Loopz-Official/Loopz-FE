import CustomInput from '@/components/features/mypage/edit/CustomInput';

interface EmailSectionProps {
    email: string;
}

export default function EmailSection({ email }: EmailSectionProps) {
    return (
        <div className="space-y-2">
            <div className="text-body-02">이메일 (변경 불가)</div>
            <CustomInput
                readOnly
                value={email ?? ''}
                placeholder="이메일을 입력해 주세요."
            />
        </div>
    );
}
