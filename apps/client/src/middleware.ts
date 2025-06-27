import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
    const requestUrl = request.nextUrl;
    const enabled = request.cookies.get('enabled')?.value === 'true';
    // const nickname = request.cookies.get('nickname')?.value !== 'null';
    const accessToken = request.cookies.get('access-token')?.value;

    const isAuthRoute = requestUrl.pathname.startsWith('/auth');
    const isOAuthRoute = requestUrl.pathname.startsWith('/oauth');
    const isLoginPage = requestUrl.pathname === '/auth/login';
    const isTermsPage = requestUrl.pathname === '/auth/terms';
    const isNicknamePage = requestUrl.pathname === '/auth/nickname';
    const isCompletePage = requestUrl.pathname === '/auth/complete';
    const isMainPage = requestUrl.pathname === '/main';

    // 1. accessToken, enabled 모두 있을 때 /auth 경로 접근 시 /main으로 (/aut/complete 제외)
    if (accessToken && enabled) {
        if (isAuthRoute && !isMainPage && !isCompletePage)
            return NextResponse.redirect(new URL('/main', request.url));
    }

    // 2. accessToken 없을 때, OAuth 경로가 아니고, 로그인 페이지가 아니면 /auth/login으로
    if (!accessToken && !isOAuthRoute && !isLoginPage) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // 3. accessToken은 있는데 enabled가 없을 때 (회원가입 미완료)
    if (accessToken && !enabled) {
        // 회원가입 페이지(terms, nickname)에 있는 경우가 아니라면 로그인 페이지로 리다이렉트
        if (!isTermsPage && !isNicknamePage) {
            const response = NextResponse.redirect(
                new URL('/auth/login', request.url)
            );

            // 회원가입 미완료 사용자의 쿠키를 삭제하여 로그아웃 처리
            response.cookies.delete('access-token');
            response.cookies.delete('nickname');
            response.cookies.delete('enabled');

            return response;
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
