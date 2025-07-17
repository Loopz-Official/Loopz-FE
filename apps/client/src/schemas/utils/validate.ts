import { prettifyError, ZodType } from 'zod/v4';

// 통합된 검증 함수
export const validate = <T>(
    schema: ZodType<T>,
    data: unknown,
    context: string = 'Data'
): T => {
    const result = schema.safeParse(data);

    if (!result.success) {
        console.error(
            `${context} Validation Failed: \n`,
            prettifyError(result.error)
        );
        throw new Error(`${context} validation failed`);
    }

    return result.data;
};
