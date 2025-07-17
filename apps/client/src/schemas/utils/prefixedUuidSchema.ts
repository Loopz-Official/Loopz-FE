import { z } from 'zod/v4';

export const prefixedUuidSchema = (key: string, prefix: string) =>
    z.string().refine(
        (val) => {
            if (!val.startsWith(prefix)) return false;
            const uuid = val.replace(prefix, '');
            try {
                z.uuid().parse(uuid);
                return true;
            } catch {
                return false;
            }
        },
        {
            message: `${key}는 ${prefix}로 시작하고, 뒤에 UUID가 따라와야 합니다.`,
        }
    );
