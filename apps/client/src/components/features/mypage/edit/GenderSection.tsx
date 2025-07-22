import Radio from '@/components/common/Button/Radio';
import { GENDERS } from '@/constants/user';
import { GenderType } from '@/schemas/user';

interface GenderSectionProps {
    gender: GenderType;
    onGenderChange: (gender: GenderType) => void;
}

export default function GenderSection({
    gender,
    onGenderChange,
}: GenderSectionProps) {
    return (
        <div className="space-y-2">
            <div className="text-body-02">성별</div>
            <div className="flex gap-6">
                {GENDERS.map((g) => (
                    <Radio
                        key={g.label}
                        className="text-body-03 flex cursor-pointer items-center gap-2 font-normal"
                        label={g.value}
                        name="gender"
                        checked={gender === g.label}
                        onChange={() => onGenderChange(g.label)}
                    />
                ))}
            </div>
        </div>
    );
}
