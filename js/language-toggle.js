document.addEventListener('DOMContentLoaded', () => {
    let currentLang = localStorage.getItem('language') || 'es';

    // Set initial language
    updateContent(currentLang);
    updateActiveFlag(currentLang);
    document.documentElement.lang = currentLang;

    // Attach click listeners to flags if they exist
    const esBtn = document.getElementById('lang-btn-es');
    const caBtn = document.getElementById('lang-btn-ca');

    if (esBtn) {
        esBtn.addEventListener('click', () => changeLanguage('es'));
    }
    if (caBtn) {
        caBtn.addEventListener('click', () => changeLanguage('ca'));
    }
});

function changeLanguage(lang) {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    updateContent(lang);
    updateActiveFlag(lang);
}

function updateContent(lang) {
    if (!window.translations || !window.translations[lang]) return;

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = window.translations[lang][key];

        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
}

function updateActiveFlag(lang) {
    const esBtn = document.getElementById('lang-btn-es');
    const caBtn = document.getElementById('lang-btn-ca');

    if (esBtn && caBtn) {
        // Reset classes
        const activeClasses = ['opacity-100', 'scale-110', 'grayscale-0'];
        const inactiveClasses = ['opacity-50', 'grayscale'];

        if (lang === 'es') {
            esBtn.classList.add(...activeClasses);
            esBtn.classList.remove(...inactiveClasses);

            caBtn.classList.add(...inactiveClasses);
            caBtn.classList.remove(...activeClasses);
        } else {
            caBtn.classList.add(...activeClasses);
            caBtn.classList.remove(...inactiveClasses);

            esBtn.classList.add(...inactiveClasses);
            esBtn.classList.remove(...activeClasses);
        }
    }
}
