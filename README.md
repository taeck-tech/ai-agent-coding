# Turborepo Exam

## 프로젝트 개요

이 저장소는 **AI 에이전트를 적극적으로 활용해 개발 지식을 학습하고 실습하기 위한 스터디 프로젝트**입니다.  
모든 학습 흐름을 모노레포 환경에서 운영하며, 에이전트가 생성한 코드와 문서를 검증·정리하는 과정을 통해 협업형 학습 경험을 구축하는 것이 목표입니다.

## 핵심 목표

- AI 에이전트와의 페어 프로그래밍을 통해 다양한 UI/UX 패턴과 도구를 학습합니다.
- 자동화된 코드 리뷰와 테스트 작성을 실험하며, 품질 중심의 개발 습관을 익힙니다.
- 학습 결과는 각 패키지/앱의 `README.md`에 기록해 지식 베이스를 축적합니다.

## 기술 스택 및 운영 방식

- **Monorepo**: [Turborepo](https://turbo.build/repo)를 기반으로 패키지 간 빌드·테스트 파이프라인을 공유합니다.
- **패키지 매니저**: Yarn 4 (`yarn@4.x`)을 사용합니다.
- **언어/프레임워크**: TypeScript, React, Storybook, Tailwind CSS, Tsup 등을 채택해 디자인 시스템과 문서를 관리합니다.
- **품질 도구**: ESLint, Prettier, Changesets 등을 사용하며, 공통 설정은 공유 패키지로 추상화했습니다.

## 모노레포 구조

```
.
├── apps/
│   └── docs/                   # Storybook 기반 UI 문서 및 예시 환경
├── packages/
│   ├── ui/                     # 디자인 시스템 핵심 UI 컴포넌트
│   ├── tailwind-preset-config/ # Tailwind CSS 프리셋과 토큰
│   ├── typescript-config/      # 공유 TypeScript 설정
│   └── eslint-config/          # 공용 ESLint 룰셋
├── turbo.json                  # Turborepo 파이프라인 정의
└── yarn.lock                   # Yarn Plug'n'Play 잠금 파일
```

각 디렉터리는 독립적인 학습 주제를 다루며, 세부 설정과 사용법은 각 영역의 `README.md`에 정리합니다.

## 기본 워크플로우

- 의존성 설치: `yarn install`
- 패키지 개발 서버 실행: `yarn dev`
- 전체 빌드: `yarn build`
- 린트 및 포맷: `yarn lint`, `yarn format`
- Storybook 프리뷰: `yarn preview-storybook`

터보 캐시를 활용하므로, 명령어 실행 시 `turbo run <task>` 형태의 병렬 처리와 결과 캐싱이 자동으로 적용됩니다.

## 추가 문서

패키지별 상세 목표, 설계 결정, 참고 링크는 각 디렉터리 최상단에 위치한 `README.md`에서 확인할 수 있습니다. 필요 시 해당 문서를 함께 업데이트하면서 학습 기록을 계속 확장해 주세요.
