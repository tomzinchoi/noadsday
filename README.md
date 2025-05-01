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



read the file structure first, ask before action just read it

these are the additional files, I have finished building the wedbsite and I I need some modifications, so do not change anything unless i say so

read the files before modification and I like the exact same style as rest of the website when you generate something so please read the files first ok?

I would like to make a modification on the src/components/DayInLifeSection.tsx

everything is awsome, I like everything
but 하루 일과를 광고 노출에 따라 아래로 나열하는 방식인데 이를 가로: 일과시간 세로: 광고 노출, 로 표현 방식만 바꿔서 한눈에 보기 편하게 바꾸면 좋을것 같아, 카운팅 애니메이션, 글자 색, 텍스트, 아이콘 전부 다 좋으니까 테이터 표시하는 방식만 바꾸자, 아래서 위로 올라가는 애니메이션도 좋을것 같아, 알아서 잘 해줘, 나머지는 그대로 둬라
reply in english please,

ask me before you strat


## reference links

🔍 1. "4,000~10,000건의 광고 노출"은 어디서 나온 수치인가?
이 수치는 여러 마케팅 연구기관과 광고 산업 분석가들이 **전체적인 광고 노출(visual impression, audio mention 등 모든 매체 포함)**을 추정한 것입니다. 주요 출처는 아래와 같습니다:

Siteefy (2024): “People are exposed to between 4,000 and 10,000 ads every single day.”
👉 https://siteefy.com/how-many-ads-do-we-see-a-day

B9 Solution (2024): 비슷한 범위 제시, 특히 디지털 광고와 전통 광고를 모두 포함한 통계
👉 https://b9solution.com/how-many-ads-do-we-see-a-day-top-trends-statistics

USC Applied Psychology & Forbes, Yankelovich Study 등: 오래전부터 이 범위를 이야기하며 최근 디지털화로 상한선이 증가했다고 분석.



🧍‍♂️ Individuals
Ad-Free Adventure: Go offline—take a nature walk, read a book, or cook a meal without screens.

Digital Detox Morning: Start your day screen-free with journaling, stretching, or a quiet breakfast.

App-Free Challenge: Delete or hide ad-heavy apps for the day (social media, YouTube, news).

Analog Alternatives: Use paper maps, real books, or handwritten notes—reclaim focus from screens.

🏢 Companies
Free Premium Day: Give users ad-free or premium access for 24 hours to show appreciation and respect.

Ad Budget Donation: Donate that day’s ad spend to a media literacy or mental health nonprofit.

Ad-Free Branding Badge: Promote a “No-Ads Today” banner as a trust-building gesture.

One Honest Email: Send a single, no-promo email—just real content or gratitude.

🏘️ Communities
Public Ad Blackout: Cover local ad spaces with community art or positive messages (with permission).

Unplugged Gatherings: Host screen-free meetups like board games, open mics, or picnics.

Media Literacy Booths: Run casual, friendly workshops on how ads target attention.





 
 <h2 className="text-3xl font-heading font-bold mb-6 gradient-text">How Can You Participate?</h2>
                
                <p className="text-lg leading-relaxed mb-6">
                  National No-Ads Day is calling on individuals, communities, and businesses across the world to switch off ad notifications and give a day for attention, spending 24 hours experiencing a life free from advertising interruptions.
                </p>
                
                <p className="text-lg leading-relaxed mb-8">
                  Whether you're into deep reading, creative pursuits, outdoor adventures, or quality time with loved ones—everyone can participate by disconnecting from ads and reconnecting with what truly matters. Use this day to rediscover activities that bring genuine fulfillment rather than algorithmic satisfaction.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-light p-6 rounded-xl">
                    <h4 className="font-bold text-xl mb-3 text-primary">For Individuals</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Turn off notifications for 24 hours</li>
                      <li>Use ad-blockers on all devices</li>
                      <li>Choose ad-free premium services for the day</li>
                      <li>Engage in offline activities</li>
                      <li>Journal about your experience</li>
                    </ul>
                  </div>
                  
                  <div className="bg-light p-6 rounded-xl">
                    <h4 className="font-bold text-xl mb-3 text-secondary">For Businesses</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Offer ad-free experiences to customers</li>
                      <li>Pause scheduled advertising campaigns</li>
                      <li>Host offline community events</li>
                      <li>Encourage employees to disconnect</li>
                      <li>Develop attention-friendly policies</li>
                    </ul>
                  </div>
                </div>