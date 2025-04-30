# National No-Ads Day

이 프로젝트는 National No-Ads Day (9월 15일)를 위한 웹사이트입니다.

## 주요 기능
- 랜딩하는 탑 페이지에 집중, 화려한 애니메이션 
- 관상용 한 페이지 웹사이트로 필수 버튼과 상호작용만 포함
- 배경을 담당할 이미지 사용
- 화려하지만 깔끔하고 모던해 보이는 카드 방식, 모바일에서 사용 가능하게 조정
- 심플해보이지만 화려한 애니매이션과 카운팅 등
- 이미지를 AI로 gif로 사용하는 방식도 고려

## 기술 스택
- Next.js
- TypeScript
- Tailwind CSS
- GSAP (애니메이션)
- Chart.js (데이터 시각화)
- Framer Motion (UI 애니메이션)

## 설치 및 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 프로젝트 구조
- `/public` - 정적 파일 (이미지, 아이콘 등)
- `/src/pages` - 페이지 컴포넌트
- `/src/components` - 재사용 가능한 컴포넌트
- `/src/styles` - 글로벌 스타일