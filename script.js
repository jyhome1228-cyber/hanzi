const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
const navLinks = document.querySelectorAll('.primary-nav a');

const updateHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > 8);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

menuToggle?.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? 'Close' : 'Menu';
  document.body.classList.toggle('menu-open', isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    primaryNav?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.textContent = 'Menu';
    document.body.classList.remove('menu-open');
  });
});

const sourceText = document.querySelector('#source-text');
const charCount = document.querySelector('#char-count');
const sourceLang = document.querySelector('#source-lang');
const targetLang = document.querySelector('#target-lang');
const swapButton = document.querySelector('#swap-languages');
const translateButton = document.querySelector('#translate-button');
const translationResult = document.querySelector('#translation-result');
const translatorStatus = document.querySelector('#translator-status');
const copyResult = document.querySelector('#copy-result');

const updateCount = () => {
  if (!sourceText || !charCount) return;
  charCount.textContent = String(sourceText.value.length);
};

sourceText?.addEventListener('input', updateCount);
updateCount();

swapButton?.addEventListener('click', () => {
  if (!sourceLang || !targetLang) return;
  const currentSource = sourceLang.value;
  sourceLang.value = targetLang.value;
  targetLang.value = currentSource;

  if (translationResult?.classList.contains('has-result') && sourceText) {
    const previousSource = sourceText.value;
    sourceText.value = translationResult.textContent || '';
    translationResult.textContent = previousSource || '번역 결과가 여기에 표시됩니다.';
    updateCount();
  }
});

const setStatus = (message, type = 'default') => {
  if (!translatorStatus) return;
  translatorStatus.textContent = message;
  translatorStatus.dataset.type = type;
};

translateButton?.addEventListener('click', async () => {
  const text = sourceText?.value.trim() || '';

  if (!text) {
    setStatus('번역할 내용을 먼저 입력해주세요.', 'error');
    sourceText?.focus();
    return;
  }

  if (sourceLang?.value === targetLang?.value) {
    setStatus('원문과 번역 언어를 다르게 선택해주세요.', 'error');
    targetLang?.focus();
    return;
  }

  translateButton.disabled = true;
  translateButton.textContent = 'Translating…';
  setStatus('번역 요청을 준비하고 있습니다.');

  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        source: sourceLang?.value,
        target: targetLang?.value,
      }),
    });

    if (!response.ok) throw new Error('Translation API is not connected.');

    const data = await response.json();
    const translated = data.translation || data.translatedText;

    if (!translated) throw new Error('No translation returned.');

    if (translationResult) {
      translationResult.textContent = translated;
      translationResult.classList.add('has-result');
    }
    setStatus('번역이 완료되었습니다.', 'success');
  } catch (error) {
    if (translationResult) {
      translationResult.textContent = '번역 API 연결 전입니다. UI와 입력 기능은 준비되어 있습니다.';
      translationResult.classList.remove('has-result');
    }
    setStatus('현재는 UI 베타 버전입니다. 다음 단계에서 번역 API를 연결합니다.', 'error');
  } finally {
    translateButton.disabled = false;
    translateButton.textContent = 'Translate';
  }
});

copyResult?.addEventListener('click', async () => {
  const value = translationResult?.classList.contains('has-result')
    ? translationResult.textContent?.trim()
    : '';

  if (!value) {
    setStatus('복사할 번역 결과가 없습니다.', 'error');
    return;
  }

  try {
    await navigator.clipboard.writeText(value);
    copyResult.textContent = 'Copied';
    setStatus('번역 결과를 복사했습니다.', 'success');
    window.setTimeout(() => {
      copyResult.textContent = 'Copy';
    }, 1400);
  } catch (error) {
    setStatus('복사하지 못했습니다. 텍스트를 직접 선택해주세요.', 'error');
  }
});

const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const submitButton = contactForm.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.textContent = '문의 기능 연결 예정';
    window.setTimeout(() => {
      submitButton.textContent = '프로젝트 문의하기';
    }, 1800);
  }
});
