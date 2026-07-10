# 배포 가이드

## 사전 요구사항

- Node.js 18+ 설치
- PostgreSQL 또는 SQLite 데이터베이스
- 환경 변수 설정

## 환경 변수 설정

`.env` 파일에 다음 변수를 설정하세요:

```env
DATABASE_URL="file:./dev.db" # SQLite 개발용
# 또는 PostgreSQL: "postgresql://user:password@localhost:5432/dbname"

JWT_SECRET="your-secret-key-here"
JWT_ACCESS_EXPIRATION="15m"
JWT_REFRESH_EXPIRATION="7d"

NEXTAUTH_URL="http://localhost:3000"

# 소셜 로그인 (선택사항)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
KAKAO_CLIENT_ID="your-kakao-client-id"
KAKAO_CLIENT_SECRET="your-kakao-client-secret"
```

## 데이터베이스 설정

### SQLite (개발용)

```bash
npm install
npx prisma generate
npx prisma db push
```

### PostgreSQL (프로덕션용)

```bash
npm install
npx prisma generate
npx prisma migrate deploy
```

## 빌드 및 실행

### 개발 모드

```bash
npm run dev
```

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 배포 플랫폼

### Vercel

1. GitHub 리포지토리에 코드 푸시
2. Vercel 대시보드에서 프로젝트 임포트
3. 환경 변수 설정
4. 자동 배포

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
docker build -t coupang-clone .
docker run -p 3000:3000 coupang-clone
```

## 주의사항

- 프로덕션 환경에서는 반드시 PostgreSQL 사용
- JWT_SECRET은 강력한 랜덤 값으로 설정
- HTTPS 사용 권장
- 정기적으로 데이터베이스 백업 수행
