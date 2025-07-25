import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
    const requestUrl = request.nextUrl;
    const enabled = request.cookies.get('enabled')?.value === 'true';
    const isNicknameNull = request.cookies.get('nickname')?.value === 'null';
    const accessToken = request.cookies.get('access-token')?.value;

    const isAuthRoute = requestUrl.pathname.startsWith('/auth');
    const isOAuthRoute = requestUrl.pathname.startsWith('/oauth');
    const isLoginPage = requestUrl.pathname === '/auth/login';
    const isCompletePage = requestUrl.pathname === '/auth/complete';
    const isNicknamePage = requestUrl.pathname === '/auth/nickname';
    const isTermsPage = requestUrl.pathname === '/auth/terms';
    const isPaymentNotification =
        requestUrl.pathname === '/payment/notification';

    // 1. 토큰이 없고, 소셜 로그인 라우트와 결제 알림 라우트를 제외한 라우트 접근 시 로그인 페이지로 리다이렉트
    if (
        !accessToken &&
        !isOAuthRoute &&
        !isLoginPage &&
        !isPaymentNotification
    ) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // 2. 토큰이 있고(소셜 로그인 성공 후), nickname 쿠키 값이 null인 경우, 약관 동의 및 회원가입 완료 페이지의 라우트 접근 시에만 닉네임 페이지로 리다이렉트
    if (accessToken && isNicknameNull && (isTermsPage || isCompletePage)) {
        return NextResponse.redirect(new URL('/auth/nickname', request.url));
    }

    // 3. 토큰이 있고, 닉네임 쿠키 값이 null이 아닌 경우
    if (accessToken && !isNicknameNull) {
        // 3-1. enabled 값이 false인 경우, 약관 동의 및 회원가입 완료 페이지의 라우트 접근 시에만 약관 페이지로 리다이렉트
        if (!enabled && (isNicknamePage || isCompletePage)) {
            return NextResponse.redirect(new URL('/auth/terms', request.url));
        }

        // 3-2. enabled 값이 true인 경우, 로그인 온보딩 및 소셜 로그인 라우트 접근 시에만 메인 페이지로 리다이렉트
        if (enabled && !isCompletePage && (isAuthRoute || isOAuthRoute)) {
            return NextResponse.redirect(new URL('/main', request.url));
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
