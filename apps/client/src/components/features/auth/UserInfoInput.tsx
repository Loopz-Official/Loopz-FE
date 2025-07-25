import clsx from 'clsx';

type UserInfoInputProps = {
    label: 'email' | 'nickname';
    userInfo: string;
    nickname?: string;
    setNickname?: (nickname: string) => void;
    isChecking?: boolean;
    isNicknameValid?: boolean | null;
    labelClassName?: string;
    inputClassName?: string;
};

const UserInfoInput = ({
    label,
    userInfo,
    nickname,
    setNickname,
    isChecking,
    isNicknameValid = null,
    labelClassName,
    inputClassName,
}: UserInfoInputProps) => {
    const nicknameValidationText = (): {
        text: string;
        colorClass?: string;
    } => {
        if (nickname) {
            if (isChecking)
                return {
                    text: '중복 검사 중...',
                };
            if (isNicknameValid === null) {
                return { text: '' };
            }
            return isNicknameValid
                ? {
                      text: '사용 가능한 닉네임입니다.',
                      colorClass: 'text-status-blue',
                  }
                : {
                      text: '이미 사용 중인 닉네임입니다.',
                      colorClass: 'text-status-red',
                  };
        } else {
            return {
                text: '다른 유저와 겹치지 않도록 입력해주세요. (2~20자)',
            };
        }
    };

    return (
        <div className="h-fit w-full">
            <label
                htmlFor={label}
                className={clsx('mb-2 flex', labelClassName)}
            >
                {label === 'email' ? '이메일' : '닉네임'}
            </label>
            <input
                type="text"
                className={clsx(
                    'w-full rounded-sm px-3 py-4 font-normal',
                    {
                        'bg-gray-12 rounder-sm text-disabled':
                            label === 'email',
                        'border-gray-regular text-body-02 border border-solid':
                            label === 'nickname',
                    },
                    inputClassName
                )}
                value={userInfo}
                onChange={(e) => setNickname && setNickname(e.target.value)}
                id={label}
                autoComplete="on"
                readOnly={label === 'email'}
                {...(label === 'nickname' && {
                    minLength: 2,
                    maxLength: 20,
                    placeholder: '닉네임을 입력해주세요.',
                })}
            />
            {label === 'nickname' && nicknameValidationText().text && (
                <span
                    className={clsx(
                        'text-caption-01 text-gray-regular mt-2 block px-1',
                        nicknameValidationText().colorClass
                    )}
                >
                    {nicknameValidationText().text}
                </span>
            )}
        </div>
    );
};

export default UserInfoInput;
