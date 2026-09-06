# HANZI LAB

Korea ↔ China Business Support

한국과 중국 사이의 번역, 리서치, 소싱, 커뮤니케이션, 현지화 업무를 지원하는 서비스 웹사이트입니다.

## Current structure

- Home / Hero
- Services — 10 core services
- HANZI QUICK — Korean ↔ Chinese translator UI (500 characters)
- Work — sample case studies
- Process
- Pricing
- About
- Contact

## Design system direction

SEED Design System의 구조적 원칙을 참고해 다음 기준을 사용합니다.

- Role-based color tokens
- 4px spacing scale
- 1040px main content container
- 12-column desktop hierarchy
- Mobile-first responsive simplification
- 44px+ interactive target size
- Visible focus states
- Reduced-motion support
- Clear semantic heading order

## Files

- `index.html` — single-page site structure
- `styles.css` — design tokens, typography, responsive layout
- `script.js` — mobile navigation, translator UI, basic interactions

## HANZI QUICK

현재 번역기는 프론트 UI까지 구현되어 있으며 `/api/translate` 엔드포인트 연결을 기다리는 상태입니다.

권장 구조:

```text
Browser → /api/translate → serverless function → translation API
```

API key는 브라우저 코드에 직접 노출하지 않습니다.

## Next

1. Translation API / serverless function connection
2. Contact form backend
3. Real portfolio assets and case studies
4. SEO / OG metadata refinement
5. Deployment configuration
