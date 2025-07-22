import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
    const requestUrl = request.nextUrl;
    const enabled = request.cookies.get('enabled')?.value === 'true';
    const nickname = request.cookies.get('nickname')?.value;
    const accessToken = request.cookies.get('access-token')?.value;

    const isAuthRoute = requestUrl.pathname.startsWith('/auth');
    const isOAuthRoute = requestUrl.pathname.startsWith('/oauth');
    const isLoginPage = requestUrl.pathname === '/auth/login';
    const isCompletePage = requestUrl.pathname === '/auth/complete';
    const isMainPage = requestUrl.pathname === '/main';
    const isNicknamePage = requestUrl.pathname === '/auth/nickname';
    const isTermsPage = requestUrl.pathname === '/auth/terms';
    const isNavigatingToNickname =
        isNicknamePage ||
        request.headers.get('referer')?.includes('/auth/nickname');
    const isNavigatingToTerms =
        isTermsPage || request.headers.get('referer')?.includes('/auth/terms');

    // 온보딩 플로우 보완: enabled=false일 때 nickname까지 체크
    if (accessToken && !enabled) {
        // 1. 닉네임이 없으면 약관 페이지 접근 불가 → 닉네임 페이지로 리다이렉트
        if (isTermsPage && (!nickname || nickname === 'null')) {
            return NextResponse.redirect(
                new URL('/auth/nickname', request.url)
            );
        }
        // 2. 닉네임이 있으면 닉네임 페이지 접근 불가 → 약관 페이지로 리다이렉트
        if (isNicknamePage && nickname && nickname !== 'null') {
            return NextResponse.redirect(new URL('/auth/terms', request.url));
        }
        // 3. 온보딩(닉네임/약관) 외 경로 접근 시 쿠키 삭제 및 로그인 리다이렉트
        if (!isNavigatingToNickname && !isNavigatingToTerms) {
            const response = NextResponse.redirect(
                new URL('/auth/login', request.url)
            );

            response.cookies.delete('access-token');
            response.cookies.delete('nickname');
            response.cookies.delete('enabled');

            return response;
        }
    }

    // 1. accessToken, enabled 모두 있을 때 /auth 경로 접근 시 /main으로 (/auth/complete 제외)
    if (accessToken && enabled) {
        if (isAuthRoute && !isMainPage && !isCompletePage)
            return NextResponse.redirect(new URL('/main', request.url));
    }

    // 2. accessToken 없을 때, OAuth 경로가 아니고, 로그인 페이지가 아니면 /auth/login으로
    if (!accessToken && !isOAuthRoute && !isLoginPage) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
        // 모든 경로 중, _next/static, favicon.ico 등은 제외
        '/((?!_next/static|_next/image|favicon.ico|static|media).*)',
    ],
};
