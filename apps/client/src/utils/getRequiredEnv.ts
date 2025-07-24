export function getRequiredEnv(key: string): string {
    const value = process.env[key];

    if (!value) {
        throw new Error(`필수 환경변수 ${key}가 설정되지 않았습니다.`);
    }
    return value;
}
