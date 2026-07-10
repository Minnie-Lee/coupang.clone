# Coupang Clone 소스 분석

## 개요
이 프로젝트는 Next.js 16을 기반으로 한 멀티 벤더 쇼핑몰 애플리케이션입니다. 고객, 판매자, 관리자 포털을 제공하며, JWT 인증, 소셜 로그인, 복잡한 멀티벤더 주문 관리, 정산 시스템 등을 포함합니다.

---

## 1. 기술 스택

### 1.1 프론트엔드
- **프레임워크**: Next.js 16.2.10
- **언어**: TypeScript 6.0.3
- **스타일**: Tailwind CSS 4.3.2
- **UI 라이브러리**: React 19.2.7, React DOM 19.2.7

### 1.2 백엔드
- **API**: Next.js API Routes
- **데이터베이스**: SQLite (개발) / PostgreSQL (프로덕션)
- **ORM**: Prisma 5.22.0
- **인증**: JWT (jsonwebtoken 9.0.3)
- **소셜 로그인**: NextAuth 4.24.14
- **비밀번호 해싱**: bcryptjs 3.0.3

### 1.3 개발 도구
- **패키지 매니저**: npm
- **린트**: ESLint 9.39.4
- **타입 정의**: @types/* 패키지들

---

## 2. 프로젝트 구조

### 2.1 디렉토리 구조
```
tut03/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 라우트
│   │   │   ├── auth/          # 인증 API
│   │   │   ├── customer/      # 고객 API
│   │   │   ├── seller/        # 판매자 API
│   │   │   └── admin/         # 관리자 API
│   │   ├── customer/          # 고객 페이지
│   │   ├── seller/            # 판매자 페이지
│   │   ├── admin/             # 관리자 페이지
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── page.tsx           # 메인 페이지
│   │   └── globals.css        # 전역 스타일
│   ├── lib/                   # 유틸리티 라이브러리
│   │   ├── auth.ts            # 인증 유틸리티
│   │   ├── prisma.ts          # Prisma 클라이언트
│   │   └── settlement.ts      # 정산 로직
│   └── proxy.ts               # 인증 미들웨어
├── prisma/
│   └── schema.prisma          # 데이터베이스 스키마
├── Coupang-UI-Clone/          # UI 컴포넌트 라이브러리
├── .env                       # 환경 변수
├── .env.example               # 환경 변수 예시
├── package.json               # 의존성 관리
├── tsconfig.json              # TypeScript 설정
├── tailwind.config.ts         # Tailwind 설정
├── next.config.js             # Next.js 설정
└── spec.md                    # 프로젝트 사양서
```

---

## 3. 데이터베이스 스키마

### 3.1 핵심 모델

#### User (사용자)
```prisma
model User {
  id          String   @id @default(cuid())
  email       String   @unique
  password    String?
  name        String
  role        String   @default("CUSTOMER")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // OAuth
  googleId    String?  @unique
  kakaoId     String?  @unique
  
  // 관계
  vendor      Vendor?
  orders      Order[]
  wishlist    Wishlist[]
  addresses   Address[]
}
```

**역할 (Role)**: CUSTOMER, SELLER, ADMIN

#### Vendor (판매자)
```prisma
model Vendor {
  id          String       @id @default(cuid())
  userId      String       @unique
  user        User         @relation(fields: [userId], references: [id])
  
  businessName String
  businessNumber String
  description String?
  status      String   @default("PENDING")
  
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  
  // 관계
  products    Product[]
  orderItems  OrderItem[]
  settlements Settlement[]
}
```

**상태 (Status)**: PENDING, APPROVED, REJECTED, SUSPENDED

#### Product (상품)
```prisma
model Product {
  id          String   @id @default(cuid())
  vendorId    String
  vendor      Vendor   @relation(fields: [vendorId], references: [id])
  
  name        String
  description String
  price       Int      // 센트 단위 저장 (예: 10000 = ₩100.00)
  stock       Int      @default(0)
  
  category    String
  tags        String   // JSON 문자열 배열
  
  isActive    Boolean  @default(true)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // 관계
  orderItems  OrderItem[]
  wishlist    Wishlist[]
}
```

#### Order (주문)
```prisma
model Order {
  id          String      @id @default(cuid())
  userId      String
  user        User        @relation(fields: [userId], references: [id])
  
  orderNumber String      @unique
  status      String   @default("PENDING")
  
  subtotal    Int        // 센트 단위
  shippingFee Int        // 센트 단위
  totalAmount Int        // 센트 단위
  
  shippingAddress String
  trackingNumber String?
  
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  
  // 관계
  items       OrderItem[]
}
```

**주문 상태**: PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED

#### OrderItem (주문 항목)
```prisma
model OrderItem {
  id          String   @id @default(cuid())
  orderId     String
  order       Order    @relation(fields: [orderId], references: [id])
  
  productId   String
  product     Product  @relation(fields: [productId], references: [id])
  
  vendorId    String
  vendor      Vendor   @relation(fields: [vendorId], references: [id])
  
  quantity    Int
  price       Int      // 센트 단위
  subtotal    Int      // 센트 단위
  
  // 벤더 관리 반품
  returnRequested Boolean @default(false)
  returnReason String?
  returnStatus String? // PENDING, APPROVED, REJECTED, COMPLETED
  
  createdAt   DateTime @default(now())
}
```

#### Wishlist (찜 목록)
```prisma
model Wishlist {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  productId   String
  product     Product  @relation(fields: [productId], references: [id])
  
  createdAt   DateTime @default(now())
  
  @@unique([userId, productId])
}
```

#### Address (배송지)
```prisma
model Address {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  recipient   String
  phone       String
  address     String
  detail      String
  postalCode  String
  isDefault   Boolean  @default(false)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### Settlement (정산)
```prisma
model Settlement {
  id          String   @id @default(cuid())
  vendorId    String
  vendor      Vendor   @relation(fields: [vendorId], references: [id])
  
  period      String   // YYYY-MM
  totalSales  Int      // 센트 단위
  commission  Int      // 센트 단위
  netAmount   Int      // 센트 단위
  
  status      String   @default("PENDING") // PENDING, PAID
  
  createdAt   DateTime @default(now())
  paidAt      DateTime?
  
  @@unique([vendorId, period])
}
```

### 3.2 데이터베이스 특징
- **SQLite 사용**: 개발 환경에서 SQLite 사용 (프로덕션에서는 PostgreSQL 권장)
- **Enum 제한**: SQLite에서 enum을 지원하지 않아 String 타입 사용
- **가격 저장**: 센트 단위로 저장하여 부동소수점 오류 방지
- **관계 설계**: 외래 키를 통한 강력한 관계 무결성

---

## 4. 인증 시스템

### 4.1 JWT 인증 (`src/lib/auth.ts`)

#### 주요 함수
```typescript
// 비밀번호 해싱
hashPassword(password: string): Promise<string>
verifyPassword(password: string, hashedPassword: string): Promise<boolean>

// 토큰 생성
generateAccessToken(payload: TokenPayload): string  // 15분 만료
generateRefreshToken(payload: TokenPayload): string  // 7일 만료

// 토큰 검증
verifyToken(token: string): TokenPayload | null
```

#### 토큰 페이로드
```typescript
interface TokenPayload {
  userId: string;
  email: string;
  role: string;  // CUSTOMER, SELLER, ADMIN
}
```

### 4.2 인증 미들웨어 (`src/proxy.ts`)

#### 보호된 라우트
- **페이지**: `/customer`, `/seller`, `/admin`
- **API**: `/api/customer`, `/api/seller`, `/api/admin`

#### 공개 라우트
- `/login`, `/register`, `/api/auth/login`, `/api/auth/register`

#### 역할 기반 접근 제어 (RBAC)
- **SELLER**: `/api/seller` 접근 가능 (ADMIN도 접근 가능)
- **ADMIN**: `/api/admin` 접근 가능
- **CUSTOMER**: `/api/customer` 접근 가능

#### 미들웨어 동작
1. 공개 라우트는 체크 스킵
2. API 라우트는 토큰 검증 및 역할 확인
3. 페이지 라우트는 토큰 없으면 로그인 페이지로 리다이렉트
4. 역할 불일치 시 적절한 페이지로 리다이렉트

### 4.3 소셜 로그인
- **Google OAuth 2.0**: NextAuth를 통한 구글 로그인
- **Kakao OAuth 2.0**: NextAuth를 통한 카카오 로그인
- **이메일/비밀번호**: 기본 로그인 방식

---

## 5. API 구조

### 5.1 인증 API (`/api/auth`)

#### 엔드포인트
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/refresh` - 토큰 갱신
- `GET /api/auth/google` - Google 로그인
- `GET /api/auth/kakao` - Kakao 로그인
- `POST /api/auth/logout` - 로그아웃

### 5.2 고객 API (`/api/customer`)

#### 프로필
- `GET /api/customer/profile` - 프로필 조회
- `PUT /api/customer/profile` - 프로필 수정

#### 주문
- `GET /api/customer/orders` - 주문 목록 조회
- `GET /api/customer/orders/:id` - 주문 상세 조회
- `POST /api/customer/orders/create` - 주문 생성
- `POST /api/customer/orders/returns` - 반품 요청

#### 찜 목록
- `GET /api/customer/wishlist` - 찜 목록 조회
- `POST /api/customer/wishlist` - 찜 추가
- `DELETE /api/customer/wishlist/:id` - 찜 삭제

#### 배송지
- `GET /api/customer/addresses` - 배송지 목록 조회
- `POST /api/customer/addresses` - 배송지 추가

### 5.3 판매자 API (`/api/seller`)

#### 상품
- `GET /api/seller/products` - 상품 목록 조회
- `POST /api/seller/products` - 상품 등록
- `PUT /api/seller/products/:id` - 상품 수정
- `DELETE /api/seller/products/:id` - 상품 삭제

#### 정산
- `GET /api/seller/settlements` - 정산 내역 조회

#### 반품
- `GET /api/seller/returns` - 반품 목록 조회
- `PUT /api/seller/returns/:id` - 반품 처리

### 5.4 관리자 API (`/api/admin`)

#### 벤더
- `GET /api/admin/vendors` - 벤더 목록 조회
- `PUT /api/admin/vendors/:id/approve` - 벤더 승인

#### 상품
- `GET /api/admin/products` - 상품 목록 조회

#### 사용자
- `GET /api/admin/users` - 사용자 목록 조회

#### 통계
- `GET /api/admin/statistics` - 통계 조회

---

## 6. 페이지 구조

### 6.1 고객 페이지 (`/customer`)

#### 라우트
- `/customer/profile` - 프로필 관리
- `/customer/orders` - 주문 내역
- `/customer/orders/:id` - 주문 상세
- `/customer/wishlist` - 찜 목록
- `/customer/recommendations` - 추천 상품
- `/customer/addresses` - 배송지 관리

#### 레이아웃 (`src/app/customer/layout.tsx`)
- 고객 전용 네비게이션
- 역할 확인 미들웨어

### 6.2 판매자 페이지 (`/seller`)

#### 라우트
- `/seller/dashboard` - 대시보드
- `/seller/products` - 상품 목록
- `/seller/products/new` - 상품 등록
- `/seller/products/:id/edit` - 상품 편집
- `/seller/inventory` - 재고 관리
- `/seller/pricing` - 가격 책정
- `/seller/settlements` - 정산 내역
- `/seller/returns` - 반품 관리

#### 레이아웃 (`src/app/seller/layout.tsx`)
- 판매자 전용 네비게이션
- 역할 확인 미들웨어

### 6.3 관리자 페이지 (`/admin`)

#### 라우트
- `/admin/dashboard` - 대시보드
- `/admin/vendors` - 벤더 관리
- `/admin/products` - 상품 모니터링
- `/admin/users` - 사용자 관리
- `/admin/permissions` - 권한 관리
- `/admin/statistics` - 통계 분석

#### 레이아웃
- 관리자 전용 네비게이션
- 역할 확인 미들웨어

---

## 7. 비즈니스 로직

### 7.1 정산 시스템 (`src/lib/settlement.ts`)

#### 월간 정산 계산
```typescript
calculateMonthlySettlements(year: number, month: number)
```

**동작 과정:**
1. 지정된 월의 DELIVERED 상태 주문 조회
2. 벤더별 판매액 집계
3. 수수료 10% 계산
4. 순수익 계산 (총 판매액 - 수수료)
5. Settlement 레코드 생성 (기존 레코드가 없는 경우)

#### 대기 중인 정산 처리
```typescript
processPendingSettlements()
```

**동작 과정:**
1. PENDING 상태의 정산 조회
2. 상태를 PAID로 변경
3. 지급일시 기록

### 7.2 주문 처리 로직

#### 멀티 벤더 주문
1. 고객이 여러 벤더의 상품을 장바구니에 추가
2. 결제 시 단일 Order 레코드 생성
3. 각 상품에 대해 벤더 참조와 함께 OrderItems 생성
4. 통합 배송비 한 번 계산
5. 주문 상태 업데이트는 전체 주문에 적용
6. 벤더는 자신의 OrderItems만 관리 가능

#### 배송비 로직
- **고정 요금**: 주문당 ₩3,000
- **무료 배송**: ₩50,000 이상 주문
- **벤더별 규칙**: 향후 개선 예정

### 7.3 반품/환불 프로세스
1. 고객이 특정 OrderItem에 대한 반품 요청
2. 벤더가 알림 수신
3. 벤더가 반품 승인/거부
4. 승인된 경우 벤더가 환불 처리
5. OrderItem 상태 업데이트
6. 주문 상태는 모든 항목에 따라 변경될 수 있음

---

## 8. 보안 고려사항

### 8.1 인증 보안
- **JWT 토큰**: HttpOnly 쿠키에 저장
- **토큰 만료**: 액세스 토큰 15분, 리프레시 토큰 7일
- **비밀번호 해싱**: bcryptjs 사용 (salt rounds: 12)

### 8.2 접근 제어
- **역할 기반 접근 제어 (RBAC)**
- **역할별 API 라우트 보호**
- **미들웨어를 통한 일관된 접근 제어**

### 8.3 데이터 보안
- **SQL 인젝션 방지**: Prisma ORM 사용
- **XSS 방지**: Next.js 기본 보안
- **CSRF 방지**: Next.js 기본 보안
- **입력 유효성 검사**: API 레벨에서 검증

### 8.4 환경 변수
- `.env` 파일에 민감 정보 저장
- `.env.example` 제공으로 설정 가이드 제공

---

## 9. 환경 설정

### 9.1 필수 환경 변수
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
JWT_ACCESS_EXPIRATION="15m"
JWT_REFRESH_EXPIRATION="7d"
NEXTAUTH_URL="http://localhost:3000"
```

### 9.2 데이터베이스 설정
```bash
npx prisma generate  # Prisma 클라이언트 생성
npx prisma db push  # 데이터베이스 스키마 동기화
```

### 9.3 개발 서버 실행
```bash
npm install         # 의존성 설치
npm run dev         # 개발 서버 시작
```

---

## 10. 확장 가능성

### 10.1 데이터베이스
- 현재 SQLite 사용 중
- PostgreSQL로 마이그레이션 가능
- Prisma를 통한 쉬운 데이터베이스 전환

### 10.2 인증
- 현재 JWT + NextAuth
- 추가 소셜 로그인 가능
- 2FA (2-Factor Authentication) 추가 가능

### 10.3 결제
- 현재 결제 로직 구현 필요
- PG(Payment Gateway) 연동 가능
- 다양한 결제 수단 지원 가능

### 10.4 배송
- 현재 기본 배송비 로직
- 벤더별 배송 규칙 추가 가능
- 배송 추적 API 연동 가능

---

## 11. 주요 파일 설명

### 11.1 핵심 파일
- `src/proxy.ts`: 인증 미들웨어, 역할 기반 접근 제어
- `src/lib/auth.ts`: JWT 토큰 생성/검증, 비밀번호 해싱
- `src/lib/prisma.ts`: Prisma 클라이언트 싱글톤
- `src/lib/settlement.ts`: 정산 로직
- `prisma/schema.prisma`: 데이터베이스 스키마 정의

### 11.2 설정 파일
- `package.json`: 의존성 및 스크립트 관리
- `tsconfig.json`: TypeScript 설정
- `tailwind.config.ts`: Tailwind CSS 설정
- `next.config.js`: Next.js 설정
- `.env`: 환경 변수

### 11.3 문서
- `README.md`: 프로젝트 개요 및 시작 가이드
- `spec.md`: 상세 프로젝트 사양서
- `DEPLOYMENT.md`: 배포 가이드

---

## 12. 개발 가이드

### 12.1 새로운 API 추가
1. `src/app/api/{role}/{endpoint}/route.ts` 생성
2. 미들웨어에서 자동으로 역할 확인
3. Prisma를 통한 데이터베이스 접근
4. 적절한 에러 처리 및 유효성 검사

### 12.2 새로운 페이지 추가
1. `src/app/{role}/{page}/page.tsx` 생성
2. 레이아웃에서 네비게이션 추가
3. API 호출을 통한 데이터 가져오기
4. Tailwind CSS를 통한 스타일링

### 12.3 데이터베이스 스키마 변경
1. `prisma/schema.prisma` 수정
2. `npx prisma db push` 실행
3. 필요한 경우 마이그레이션 생성

---

## 13. 결론

이 프로젝트는 Next.js 16, TypeScript, Prisma를 사용하여 구축된 완전한 멀티 벤더 쇼핑몰 시스템입니다. 

**주요 특징:**
- **역할 기반 아키텍처**: 고객, 판매자, 관리자 포털 분리
- **JWT 인증**: 안전한 토큰 기반 인증 시스템
- **소셜 로그인**: Google, Kakao OAuth 지원
- **멀티 벤더 주문**: 여러 판매자의 상품을 단일 주문으로 처리
- **정산 시스템**: 자동화된 월간 정산 및 수수료 계산
- **반품 관리**: 벤더 주도의 반품/환불 처리
- **보안**: RBAC, JWT, bcryptjs를 통한 다층 보안

**향후 개선 가능성:**
- 결제 시스템 연동
- 실시간 알림 시스템
- 고급 검색 및 필터링
- 추천 알고리즘 개선
- 모바일 앱 개발

---

*본 문서는 프로젝트 소스 코드 분석을 기반으로 작성되었습니다.*
