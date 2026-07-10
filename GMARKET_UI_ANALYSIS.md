# G마켓 UI 구조 분석

## 개요
G마켓은 GDS(Gmarket Design System)를 기반으로 일관된 사용자 경험을 제공하는 이커머스 플랫폼입니다. 본 문서는 G마켓의 UI 구조와 주요 컴포넌트를 분석한 내용입니다.

---

## 1. 전체 레이아웃 구조

### 1.1 페이지 구성 요소
- **Header**: 화면 최상단에 위치한 네비게이션 영역
- **Content**: 메인 콘텐츠 영역
- **Footer**: 화면 최하단 정보 영역
- **Bottom Navigation**: 모바일 화면 하단 고정 네비게이션

### 1.2 레이아웃 원칙
- 페이지 양옆 마진: 16을 기본으로 사용
- 간격 값: 8의 배수를 기본으로 사용
- 필요시 짝수 크기를 추가해 유연하게 사용

---

## 2. 네비게이션 (Navigation)

### 2.1 GNB Header

#### 역할
- 현재 화면과 관련된 정보와 작업 표시
- 연속된 화면의 계층 탐색 지원
- 상황별 Contextual Action icon 제공

#### 구조
```
[Navigation Icon] [Title] [Action Items]
```

#### 변형 (Variants)
- **Basic Header**: 일반 헤더
- **Corner별 헤더**: 코너별 서비스 로고이미지를 타이틀 영역에 배치

#### 스크롤 동작
- **Basic Header**: 스크롤/역스크롤 시 최상단에 고정되어 항시 노출
- **Tab이 있는 화면**: 역스크롤 시 GNB Header와 Tab이 함께 고정되어 노출

#### 사이즈 스펙
- Container 높이: 48
- 아이콘 Style: 24사이즈 고정
- Touch Area: 48
- 전체 너비: 운영체제나 디바이스에 따라 동적

#### 사용 가이드라인
- **Do**: 타이틀 텍스트를 정해진 영역에 맞게 간단하고 명확하게 정의
- **Don't**: 타이틀을 잘리게 사용하지 않음
- **Do**: Left To-Right 타이틀은 상품 상세 페이지에서만 한정적으로 사용
- **Do**: 코너 전용 헤더 사용 시 Navigation/Action 버튼 컬러 반전 가능

### 2.2 Bottom Navigation

#### 역할
- 화면 하단에 노출되는 요소로 다른 페이지로 빠르게 이동
- 5가지 아이콘으로 구성 (모바일 웹에서는 4개)
- 언제 어디서든 직관적이고 예측 가능해야 함
- 스크롤 시에도 계속 하단에 고정

#### 구성 아이콘 (앱)
1. Home
2. Category & Search
3. Smilehome (프로모션 기간 특별 인터랙션)
4. Mypage
5. History

#### 구성 아이콘 (모바일 웹)
- Smilehome 제외하고 4개 아이콘 사용

#### 상태 (States)
- **Active**: Green-500 색상 사용
- **Inactive**: Gray-900 색상 사용
- 기본 설정값에서 내비게이션 아이콘 하나는 활성화된 상태로 설정

#### 동작 (Behaviors)
- 아이콘 탭 시 해당 메인페이지로 화면 전환
- **Category&Search Active 시**: 통합 검색 대기 레이어 출현, Bottom Navigation 미노출
- **Home/Mypage/History Active 시**: 한 번 더 탭하면 페이지 최상단으로 스크롤되어 새로고침

#### Smilehome 인터랙션
- 프로모션 이벤트 기간동안 앱 진입 시 마다 최초 1회 재생
- 홈 이탈 후 재진입 시 재생되지 않음

#### 사이즈 스펙
- Container 높이: 48
- 아이콘 버튼 Touch Area: 48
- 아이콘 Style: 32 size 고정
- Smilehome 아이콘: Container 기준 Center에서 높이 8의 간격

#### 태블릿 사이즈
- 최대 너비: 768 기준
- 각 아이콘 너비: 153.6 (균등 분할)
- 전체 너비: 운영체제나 디바이스에 따라 동적

#### 사용 가이드라인
- **Do**: 탐색 옵션은 5개 고정으로 사용 (앱)
- **Do**: 모바일 웹에서 탐색 옵션은 4개 고정으로 사용
- **Do**: 아이콘 컬러와 상태값은 한 가지로 사용
- **Don't**: 아이콘 컬러와 상태를 중복으로 사용하지 않음
- **Do**: Smilehome 아이콘은 8의 간격을 두고 사용
- **Don't**: Smilehome 아이콘 아래 간격 생략하지 않음

---

## 3. 배너 (Banners)

### 3.1 배너의 역할
- 단순 마케팅 정보성으로 활용되지 않음
- 사용자의 행동 유도와 넛징(Nudging) 목적으로 사용
- 한 번에 하나씩만 배치
- 닫을 수 없음

### 3.2 배너 유형

#### A. Thumbnail Banner
- 배너 타이틀 내용과 관련된 이미지를 메인으로 사용
- Logo와 Subtitle은 선택 적용
- 홈, 검색 결과 페이지의 캐치와 기획전에 주로 사용

**구성 요소:**
1. Title
2. Subtitle (Optional)
3. Image
4. Logo (Optional)
5. Icon Button

#### B. AD Banner
- 상품의 이미지를 메인으로 사용
- Thumbnail Banner와 형상 차이가 있으나 쓰임새 제한 없음
- 프로모션 정보 전달 목적으로 홈, 검색 결과 페이지의 캐치와 기획전에 주로 사용
- 스와이프, 스크롤 가능한 이미지 영역 포함

#### C. Image Banner
- 프로모션 정보 전달 목적으로 상품 상세 페이지, 검색 결과 페이지에 주로 사용
- 페이지 템플릿 분절 케이스에 따라 Max와 Card 선택 적용
  - Divider로 분절: Max 적용
  - Card 템플릿으로 분절: Card 적용

**구성 요소:**
1. Background
2. Image
3. Title
4. Subtitle
5. Button (Icon 버튼 / Text 버튼)

**특징:**
- Image 없이 사용 시 Max 적용
- Title, Subtitle 최대 글자 수: 16자 제한
- 통 이미지 사용 시 Title, Subtitle, Button 제거
- 넛징이 필요한 경우 Text 버튼 사용

#### D. Full Image Banner
- 프로모션 정보 전달 목적으로 홈의 기획전에 주로 사용
- Divider와 Card 템플릿으로 분절되는 케이스에 모두 사용

**구성 요소:**
1. Container
2. Image

---

## 4. 간격 시스템 (Spacing)

### 4.1 기본 원칙
- 페이지 양옆 마진: 16을 기본으로 사용
- 간격 값: 8의 배수를 기본으로 사용
- 필요시 짝수 크기를 추가해 유연하게 사용

### 4.2 특수 케이스

#### Page with GNB Header
- 헤더가 있는 경우 마진 값을 혼합하여 사용 가능
- Header와 Badge가 있는 경우 기존 가이드 따름

#### Page with Full Footer
- Footer 전체형은 홈, 마이 페이지에서 사용
- G마켓 로고와 Bottom Navigation 간 간격 값: 64를 기본으로 사용

#### Component Group with Heading
- 템플릿을 구성하고 있는 Heading과 Component Group 간 상하 간격: 16을 기본으로 사용

---

## 5. 주요 컴포넌트 목록

### 5.1 Foundation (기초 요소)
- **Color**: 브랜드 아이덴티티 시각화
- **Typography**: 폰트로서 서비스와 사용자 커뮤니케이션
- **Iconography**: 정보를 신속하고 빠르게 커뮤니케이션하는 시각적 표현
- **Spacing**: 컴포넌트 및 UI를 전체 페이지에 배열하는 요소

### 5.2 Components (구성 요소)
- **Accordions**: 아코디언
- **Badges**: 배지
- **Banners**: 배너
- **Buttons**: 버튼 (CTA Buttons는 주문, 결제, 수령에 한정)
- **Chips**: 칩
- **Dialogs**: 다이얼로그
- **Dropdowns**: 드롭다운
- **Heading**: 헤딩
- **Info boxes**: 정보 박스
- **Item cards**: 아이템 카드
- **Labels**: 라벨
- **Lists**: 리스트
- **Navigation**: 네비게이션
- **Popovers**: 팝오버
- **Selection Controls**: 선택 컨트롤
- **Sheets**: 시트
- **Slides**: 슬라이드
- **Tabs**: 탭
- **Text Fields**: 텍스트 필드
- **Thumbnails**: 썸네일

---

## 6. 브랜드 요소 (Brand)

### 6.1 구성 요소
- **Values**: 브랜드 가치
- **Logos**: 로고
- **Colors**: 컬러 시스템
- **Typeface**: 타입페이스
- **Notation**: 표기법

---

## 7. 반응형 디자인

### 7.1 브레이크포인트
- **Large 이상 (1024px 이상)**: 서브 페이지 레이아웃이 정보 구조에 따라 변형
- **Tablet**: Bottom Navigation 최대 너비 768 기준 균등 분할

### 7.2 디바이스별 차이점
- **앱**: Bottom Navigation 5개 아이콘 (Smilehome 포함)
- **모바일 웹**: Bottom Navigation 4개 아이콘 (Smilehome 제외)

---

## 8. 사용성 원칙

### 8.1 일관성
- 전체 페이지에 일관된 레이아웃과 사용자 경험 제공
- 정해진 색상, 사이즈, 간격 가이드 준수

### 8.2 접근성
- 한눈에 들어오는 구조
- 모바일에서 불편하지 않은 인터랙션
- 직관적이고 예측 가능한 네비게이션

### 8.3 확장성
- 향후 콘텐츠/기능이 늘어나도 유지될 수 있는 구조
- 유연한 간격 시스템

---

## 9. 참고 자료

- **G마켓 디자인 시스템 (GDS)**: https://gds.gmarket.co.kr
- **G마켓 웹사이트**: https://www.gmarket.co.kr

---

*본 문서는 G마켓 디자인 시스템 공식 문서를 기반으로 작성되었습니다.*
