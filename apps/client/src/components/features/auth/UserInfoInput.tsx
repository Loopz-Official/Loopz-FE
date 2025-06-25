import clsx from 'clsx';

type UserInfoInputProps = {
    label: 'email' | 'nickname';
    userInfo: string;
    setNickname?: (nickname: string) => void;
};

const UserInfoInput = ({
    label,
    userInfo,
    setNickname,
}: UserInfoInputProps) => {
    return (
        <div className="text-body-02 h-fit w-full">
            <label htmlFor={label} className="mb-2 flex">
                {label === 'email' ? '이메일' : '닉네임'}
            </label>
            <input
                type="text"
                className={clsx(
                    'w-full rounded-sm px-3 py-4 font-normal',
                    label === 'email'
                        ? 'bg-gray-12 rounder-sm text-disabled'
                        : 'border-gray-regular border border-solid text-black'
                )}
                value={userInfo}
                onChange={(e) => setNickname && setNickname(e.target.value)}
                readOnly={label === 'email'}
                id={label}
                autoComplete="on"
            />
            {label === 'nickname' && (
                <span className="text-caption-01 text-gray-regular mt-2">
                    다른 유저와 겹치지 않도록 입력해주세요. (2~20자)
                </span>
            )}
        </div>
    );
};

export default UserInfoInput;
