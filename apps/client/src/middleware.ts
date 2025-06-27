import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
    const requestUrl = request.nextUrl;
    const enabled = request.cookies.get('enabled')?.value;
    const nickname = request.cookies.get('nickname')?.value;
    const accessToken = request.cookies.get('access-token')?.value;

    const isAuthRoute = requestUrl.pathname.startsWith('/auth');
    const isOAuthRoute = requestUrl.pathname.startsWith('/oauth');
    const isLoginPage = requestUrl.pathname === '/auth/login';
    const isTermsPage = requestUrl.pathname === '/auth/terms';
    const isNicknamePage = requestUrl.pathname === '/auth/nickname';
    const isMainPage = requestUrl.pathname === '/main';

    // 1. accessToken, enabled 모두 있을 때 /auth 경로 접근 시 /main으로
    if (accessToken && enabled && isAuthRoute && !isMainPage) {
        return NextResponse.redirect(new URL('/main', request.url));
    }

    // 2. accessToken 없을 때, OAuth 경로가 아니고, 로그인 페이지가 아니면 /auth/login으로
    if (!accessToken && !isOAuthRoute && !isLoginPage) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // 3. accessToken은 있는데 enabled가 없을 때, 약관/닉네임 페이지가 아니면 해당 페이지로
    if (accessToken && !enabled) {
        if (!isTermsPage && !isNicknamePage) {
            // enabled 값에 따라 terms 또는 nickname으로 분기
            const redirectPath = nickname ? '/auth/terms' : '/auth/nickname';
            return NextResponse.redirect(new URL(redirectPath, request.url));
        }
    }

    return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
        // 모든 경로 중, _next/static, favicon.ico 등은 제외
        '/((?!_next/static|_next/image|favicon.ico|static|media).*)',
    ],
};
