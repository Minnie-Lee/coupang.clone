# 멀티벤더 쇼핑몰 사양서

이 문서는 TypeScript + Tailwind CSS를 사용하는 멀티벤더 쇼핑몰의 요구사항을 명시합니다. 세 가지 모듈식 라우트 그룹(고객, 판매자, 관리자), 복잡한 멀티벤더 주문 관계를 지원하는 Prisma 데이터베이스 스키마, Google/Kakao 소셜 로그인이 포함된 JWT 인증, 통합 배송비, 그리고 벤더 관리 반품/환불을 포함합니다.

## 기술 스택
- **프론트엔드**: TypeScript, Tailwind CSS
- **백엔드**: TypeScript (Next.js API 라우트)
- **데이터베이스**: PostgreSQL with Prisma ORM
- **인증**: JWT with Google & Kakao OAuth

## 데이터베이스 스키마 설계

### 핵심 테이블
```prisma
enum UserRole {
  CUSTOMER  // 고객
  SELLER    // 판매자
  ADMIN     // 관리자
}

enum VendorStatus {
  PENDING   // 대기중
  APPROVED  // 승인됨
  REJECTED  // 거부됨
  SUSPENDED // 정지됨
}

enum OrderStatus {
  PENDING    // 대기중
  CONFIRMED  // 확인됨
  PROCESSING // 처리중
  SHIPPED    // 배송됨
  DELIVERED  // 배송완료
  CANCELLED  // 취소됨
  REFUNDED   // 환불됨
}

model User {
  id          String   @id @default(cuid())
  email       String   @unique
  password    String?
  name        String
  role        UserRole @default(CUSTOMER)
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

model Vendor {
  id          String       @id @default(cuid())
  userId      String       @unique
  user        User         @relation(fields: [userId], references: [id])
  
  businessName String
  businessNumber String
  description String?
  status      VendorStatus @default(PENDING)
  
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  
  // 관계
  products    Product[]
  orderItems  OrderItem[]
  settlements Settlement[]
}

model Product {
  id          String   @id @default(cuid())
  vendorId    String
  vendor      Vendor   @relation(fields: [vendorId], references: [id])
  
  name        String
  description String
  price       Decimal  @db.Decimal(10, 2)
  stock       Int      @default(0)
  
  // 카테고리
  category    String
  tags        String[]
  
  // 상태
  isActive    Boolean  @default(true)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // 관계
  orderItems  OrderItem[]
  wishlist    Wishlist[]
}

model Order {
  id          String      @id @default(cuid())
  userId      String
  user        User        @relation(fields: [userId], references: [id])
  
  orderNumber String      @unique
  status      OrderStatus @default(PENDING)
  
  // 가격
  subtotal    Decimal     @db.Decimal(10, 2)
  shippingFee Decimal     @db.Decimal(10, 2)
  totalAmount Decimal     @db.Decimal(10, 2)
  
  // 배송
  shippingAddress String
  trackingNumber String?
  
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  
  // 관계
  items       OrderItem[]
}

model OrderItem {
  id          String   @id @default(cuid())
  orderId     String
  order       Order    @relation(fields: [orderId], references: [id])
  
  productId   String
  product     Product  @relation(fields: [productId], references: [id])
  
  vendorId    String
  vendor      Vendor   @relation(fields: [vendorId], references: [id])
  
  quantity    Int
  price       Decimal  @db.Decimal(10, 2)
  subtotal    Decimal  @db.Decimal(10, 2)
  
  // 벤더 관리 반품
  returnRequested Boolean @default(false)
  returnReason String?
  returnStatus String? // PENDING(대기), APPROVED(승인), REJECTED(거부), COMPLETED(완료)
  
  createdAt   DateTime @default(now())
}

model Wishlist {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  productId   String
  product     Product  @relation(fields: [productId], references: [id])
  
  createdAt   DateTime @default(now())
  
  @@unique([userId, productId])
}

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

model Settlement {
  id          String   @id @default(cuid())
  vendorId    String
  vendor      Vendor   @relation(fields: [vendorId], references: [id])
  
  period      String   // YYYY-MM (기간)
  totalSales  Decimal  @db.Decimal(10, 2)
  commission  Decimal  @db.Decimal(10, 2)
  netAmount   Decimal  @db.Decimal(10, 2)
  
  status      String   @default("PENDING") // PENDING(대기), PAID(지급됨)
  
  createdAt   DateTime @default(now())
  paidAt      DateTime?
}
```

## 라우트 구조

### 고객 라우트 (`/customer/*`)
- `/customer/profile` - 사용자 프로필 관리
- `/customer/orders` - 주문 내역 및 추적
- `/customer/orders/:id` - 주문 상세 보기
- `/customer/wishlist` - 찜 목록 관리
- `/customer/recommendations` - 개인화된 상품 추천
- `/customer/addresses` - 배송지 관리

### 판매자 라우트 (`/seller/*`)
- `/seller/dashboard` - 판매 성과 개요
- `/seller/products` - 상품 목록 및 관리
- `/seller/products/new` - 상품 등록
- `/seller/products/:id/edit` - 상품 편집
- `/seller/inventory` - 재고 관리
- `/seller/pricing` - 가격 책정 및 프로모션
- `/seller/settlements` - 정산 내역
- `/seller/settlements/:id` - 정산 상세
- `/seller/returns` - 반품/환불 관리

### 관리자 라우트 (`/admin/*`)
- `/admin/dashboard` - 플랫폼 전체 분석
- `/admin/vendors` - 벤더 목록 및 승인
- `/admin/vendors/:id` - 벤더 상세 및 관리
- `/admin/products` - 상품 모니터링
- `/admin/users` - 사용자 관리
- `/admin/permissions` - 역할 및 권한 관리
- `/admin/statistics` - 분석 및 보고서

## 인증 흐름

### JWT 인증
- 액세스 토큰 만료: 15분
- 리프레시 토큰 만료: 7일
- 토큰 저장: HttpOnly 쿠키

### 소셜 로그인
- Google OAuth 2.0
- Kakao OAuth 2.0
- 이메일/비밀번호 등록 대안

## 주문 처리 로직

### 여러 벤더가 포함된 단일 주문
1. 고객이 여러 벤더의 상품을 장바구니에 추가
2. 결제 시 단일 Order 레코드 생성
3. 각 상품에 대해 벤더 참조와 함께 OrderItems 생성
4. 통합 배송비 한 번 계산
5. 주문 상태 업데이트는 전체 주문에 적용
6. 벤더는 자신의 OrderItems만 관리 가능 (반품/환불)

### 배송비 로직
- 고정 요금: 주문당 ₩3,000
- 무료 배송: ₩50,000 이상 주문
- 벤더별 배송 규칙 (향후 개선)

### 반품/환불 프로세스
1. 고객이 특정 OrderItem에 대한 반품 요청
2. 벤더가 알림 수신
3. 벤더가 반품 승인/거부
4. 승인된 경우 벤더가 환불 처리
5. OrderItem 상태 업데이트
6. 주문 상태는 모든 항목에 따라 변경될 수 있음

## API 구조

### 인증 엔드포인트
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/refresh` - 토큰 갱신
- `GET /api/auth/google` - Google 로그인
- `GET /api/auth/kakao` - Kakao 로그인
- `POST /api/auth/logout` - 로그아웃

### 고객 엔드포인트
- `GET /api/customer/profile` - 프로필 조회
- `PUT /api/customer/profile` - 프로필 수정
- `GET /api/customer/orders` - 주문 목록 조회
- `GET /api/customer/orders/:id` - 주문 상세 조회
- `GET /api/customer/wishlist` - 찜 목록 조회
- `POST /api/customer/wishlist` - 찜 추가
- `DELETE /api/customer/wishlist/:id` - 찜 삭제

### 판매자 엔드포인트
- `GET /api/seller/products` - 상품 목록 조회
- `POST /api/seller/products` - 상품 등록
- `PUT /api/seller/products/:id` - 상품 수정
- `DELETE /api/seller/products/:id` - 상품 삭제
- `GET /api/seller/settlements` - 정산 내역 조회
- `GET /api/seller/returns` - 반품 목록 조회
- `PUT /api/seller/returns/:id` - 반품 처리

### 관리자 엔드포인트
- `GET /api/admin/vendors` - 벤더 목록 조회
- `PUT /api/admin/vendors/:id/approve` - 벤더 승인
- `GET /api/admin/products` - 상품 목록 조회
- `GET /api/admin/users` - 사용자 목록 조회
- `GET /api/admin/statistics` - 통계 조회

## 보안 고려사항
- 역할 기반 액세스 제어 (RBAC)
- 역할별 API 라우트 보호
- 입력 유효성 검사 및 정제
- SQL 인젝션 방지 (Prisma)
- XSS 방지
- CSRF 방지
- 속도 제한
