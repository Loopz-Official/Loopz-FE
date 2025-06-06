# Loopz

This is Frontend Monorepo built with [Turborepo](https://turborepo.com/) with [Tailwind CSS](https://tailwindcss.com/) and [Next.js](https://nextjs.org/).

## 🏛️ Project Structure

```shell
.
├── apps
│   ├── admin
│   │   ├── app
│   │   └── public
│   └── client
│       ├── app
│       └── public
└── packages
    ├── eslint-config
    ├── tailwind-config
    ├── typescript-config
    └── ui
        └── src
```

---

## 📦 Node.js 환경 설정 가이드

> 이 프로젝트는 Node.js `v22.16.0(LTS)` 을 사용합니다.  
> 정확한 실행 환경 유지를 위해 아래 가이드를 참고하여 버전을 통일해 주세요.

### 📌 NVM 사용 권장

```bash
# .nvmrc 내 명시된 버전으로 Node.js 설치
nvm install

# 설치된 버전 사용
nvm use
```

### pnpm-workspace.yaml의 버전 강제 설정 (의존성 관리용)

이 프로젝트는 pnpm을 사용하며, 다른 Node.js 버전에서 의존성 설치를 방지하기 위해 다음 설정이 포함되어 있습니다:

```yaml
# pnpm-workspace.yaml
nodeVersion: 22.16.0

# Node.js 22.16.0이 아닌 환경에서는 pnpm install이 에러를 발생시킵니다
engineStrict: true
```

따라서, 의존성 추가 또는 설치 전, 반드시 Node.js 버전을 확인하세요:

```bash
node -v     # v22.16.0 이어야 합니다
```

## 📦 권장 설치 순서 (Onboarding Guide)

```bash
# 1. 프로젝트 내 Node.js 버전 설치
nvm install
nvm use

# 2. pnpm 설치 (* 설치가 안되어 있을 경우)
corepack enable pnpm # 로컬 글로벌 환경에 pnpm 설치
corepack install # 프로젝트 내 명시된 버전의 package manager 설치

# 3. 패키지 설치
pnpm install
```

---

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `web`: another [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `ui`: a stub React component library with [Tailwind CSS](https://tailwindcss.com/) shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Building packages/ui

This example is set up to produce compiled styles for `ui` components into the `dist` directory. The component `.tsx` files are consumed by the Next.js apps directly using `transpilePackages` in `next.config.ts`. This was chosen for several reasons:

- Make sharing one `tailwind.config.ts` to apps and packages as easy as possible.
- Make package compilation simple by only depending on the Next.js Compiler and `tailwindcss`.
- Ensure Tailwind classes do not overwrite each other. The `ui` package uses a `ui-` prefix for it's classes.
- Maintain clear package export boundaries.

Another option is to consume `packages/ui` directly from source without building. If using this option, you will need to update the `tailwind.config.ts` in your apps to be aware of your package locations, so it can find all usages of the `tailwindcss` class names for CSS compilation.

For example, in [tailwind.config.ts](packages/tailwind-config/tailwind.config.ts):

```js
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/ui/*.{js,ts,jsx,tsx}",
  ],
```

If you choose this strategy, you can remove the `tailwindcss` and `autoprefixer` dependencies from the `ui` package.

### Utilities

This Turborepo has some additional tools already setup for you:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
