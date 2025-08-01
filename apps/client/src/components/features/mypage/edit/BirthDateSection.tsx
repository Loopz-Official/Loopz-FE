import CustomInput from '@/components/features/mypage/edit/CustomInput';

interface BirthDateSectionProps {
    birthDate: string;
    birthDateError: string;
    onBirthDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BirthDateSection({
    birthDate,
    birthDateError,
    onBirthDateChange,
}: BirthDateSectionProps) {
    return (
        <div className="space-y-2">
            <div className="text-body-02">생년월일</div>
            <CustomInput
                value={birthDate}
                onChange={onBirthDateChange}
                placeholder="YYYY-MM-DD"
            />
            {birthDateError && (
                <p className="text-body-03 text-status-red">{birthDateError}</p>
            )}
        </div>
    );
}
