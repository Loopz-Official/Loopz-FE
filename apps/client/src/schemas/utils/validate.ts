import { ZodType } from 'zod/v4';

export const validate = <T>(schema: ZodType<T>, data: unknown): T => {
    const result = schema.safeParse(data);

    if (!result.success) {
        console.error('Invalid Type', result.error); // ZodError instance
        throw new Error('Validation failed');
    }

    return result.data;
};
