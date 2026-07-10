# Multi-Vendor Shopping Mall

멀티 벤더 쇼핑몰 애플리케이션입니다. 고객, 판매자, 관리자 포털을 제공합니다.

## 기능

### 고객 포털
- 프로필 관리
- 주문 목록 및 상세 조회
- 찜 목록
- 추천 상품
- 배송지 관리

### 판매자 포털
- 대시보드
- 상품 관리 (등록, 편집, 재고, 가격)
- 정산 관리
- 반품/환불 관리

### 관리자 포털
- 대시보드
- 벤더 관리
- 상품 모니터링
- 사용자 관리
- 권한 관리
- 통계 및 분석

## 기술 스택

- **프레임워크**: Next.js 16
- **언어**: TypeScript
- **스타일**: Tailwind CSS
- **데이터베이스**: Prisma ORM (SQLite/PostgreSQL)
- **인증**: JWT
- **비밀번호 해싱**: bcryptjs

## 시작하기

### 설치

```bash
npm install
```

### 환경 변수 설정

`.env` 파일 생성:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
JWT_ACCESS_EXPIRATION="15m"
JWT_REFRESH_EXPIRATION="7d"
NEXTAUTH_URL="http://localhost:3000"
```

### 데이터베이스 설정

```bash
npx prisma generate
npx prisma db push
```

### 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 접속하세요.

## API 엔드포인트

### 인증
- `POST /api/auth/login` - 로그인
- `POST /api/auth/refresh` - 토큰 갱신
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/kakao` - Kakao OAuth

### 고객
- `GET /api/customer/orders` - 주문 목록
- `POST /api/customer/orders/create` - 주문 생성
- `GET /api/customer/wishlist` - 찜 목록
- `POST /api/customer/wishlist` - 찜 추가
- `GET /api/customer/addresses` - 배송지 목록
- `POST /api/customer/addresses` - 배송지 추가
- `POST /api/customer/orders/returns` - 반품 요청

### 판매자
- `GET /api/seller/products` - 상품 목록
- `POST /api/seller/products` - 상품 등록
- `GET /api/seller/settlements` - 정산 내역
- `GET /api/seller/returns` - 반품 요청 목록
- `PUT /api/seller/returns/:id` - 반품 처리

### 관리자
- `GET /api/admin/vendors` - 벤더 목록
- `GET /api/admin/products` - 상품 목록
- `GET /api/admin/users` - 사용자 목록
- `GET /api/admin/statistics` - 통계

## 프로젝트 구조

```
src/
├── app/
│   ├── api/           # API 라우트
│   ├── customer/      # 고객 페이지
│   ├── seller/        # 판매자 페이지
│   └── admin/         # 관리자 페이지
├── lib/
│   ├── auth.ts        # 인증 유틸리티
│   ├── prisma.ts      # Prisma 클라이언트
│   └── settlement.ts  # 정산 로직
└── proxy.ts           # 인증 미들웨어
```

## 라이선스

ISC
