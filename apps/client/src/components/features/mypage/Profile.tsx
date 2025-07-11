'use client';

import clsx from 'clsx';
import Image from 'next/image';

import { SOCIAL_LOGIN_TYPE_LABEL } from '@/constants/user';
import { useUserInfoQuery } from '@/hooks/queries/useUserQuery';

export default function Profile() {
    const { data: userInfo, isLoading, error } = useUserInfoQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!userInfo) {
        return <div>유저 정보를 불러올 수 없습니다.</div>;
    }

    const { nickName, imageUrl, socialLoginType } = userInfo;

    const hasImage = Boolean(imageUrl);
    const profileSrc = imageUrl ?? '/profile/default.svg';
    const profileSize = hasImage ? 80 : 56;
    const borderClass = hasImage ? 'border' : 'border-2';

    return (
        <div className="mb-5 mt-8 flex flex-col items-center gap-2.5">
            <div
                className={clsx(
                    'border-gray-09 flex aspect-square h-auto w-20 items-center justify-center overflow-hidden rounded-full',
                    borderClass
                )}
            >
                <Image
                    src={profileSrc}
                    alt="profile-image"
                    width={profileSize}
                    height={profileSize}
                    priority
                    className="select-none"
                    draggable={false}
                />
            </div>
            <div className="text-center">
                <div className="text-headline-04">{nickName}</div>
                <div className="text-gray-regular text-caption-02">
                    {SOCIAL_LOGIN_TYPE_LABEL[socialLoginType]} 회원
                </div>
            </div>
        </div>
    );
}
