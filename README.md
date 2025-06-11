# 차량 출입 관리 시스템 (Vehicle Access Management System)

차량 출입을 효율적으로 관리하기 위한 웹 기반 시스템입니다. 등록/미등록 차량의 출입을 통합적으로 관리하고, VIP와 FREE PASS 기능을 지원합니다.

## 주요 기능

- 통합 출입 관리 (등록/미등록 차량)
- VIP 등급 관리 (가족/특별)
- FREE PASS 지원
- 실시간 모니터링
- 미등록 차량 데이터 관리
- 다양한 통계 및 보고서

## 기술 스택

- **Framework**: Next.js 15.3.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Database**: PostgreSQL (Supabase)
- **Authentication**: NextAuth.js
- **Icons**: Lucide React

## 시작하기

1. 환경 설정

```bash
# .env.local 파일 생성
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXTAUTH_SECRET=your-auth-secret
NEXTAUTH_URL=http://localhost:3000
```

2. 의존성 설치

```bash
npm install
# or
yarn install
```

3. 개발 서버 실행

```bash
npm run dev
# or
yarn dev
```

4. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 문서

프로젝트 문서는 `/docs` 폴더에서 확인할 수 있습니다:

- `PRD.md` - 제품 요구사항 정의서
- `Database-Schema.md` - 데이터베이스 스키마
- `User-Journey.md` - 사용자 여정

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
