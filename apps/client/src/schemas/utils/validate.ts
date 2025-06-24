import { ZodType } from 'zod/v4';

export const validate = async <T>(
    schema: ZodType<T>,
    data: unknown
): Promise<T> => {
    const result = await schema.safeParseAsync(data);

    if (!result.success) {
        console.error('Invalid Type', result.error); // ZodError instance
        throw new Error('Validation failed');
    }

    return result.data;
};
