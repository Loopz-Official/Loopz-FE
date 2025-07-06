import * as z from 'zod/v4';

import { objectInfos } from './object';

export const objectDetailInfo = z.object({
    objectResponse: objectInfos,
    size: z.string(),
    descriptionUrl: z.nullable(z.url()),
    stock: z.int32().nonnegative(),
});

export type ObjectDetailInfo = z.infer<typeof objectDetailInfo>;
