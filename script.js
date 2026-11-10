// Gerenciamento de Acessibilidade (Tamanho da Fonte)
let currentFontScale = 100;

function changeFontSize(direction) {
    currentFontScale = Math.min(Math.max(currentFontScale + direction * 10, 80), 140);
    document.documentElement.style.fontSize = `${currentFontScale}%`;
    localStorage.setItem('user-font-scale', currentFontScale);
    updateFontScaleIndicator();
}

function resetFontSize() {
    currentFontScale = 100;
    document.documentElement.style.fontSize = '100%';
    localStorage.setItem('user-font-scale', 100);
    updateFontScaleIndicator();
}

function updateFontScaleIndicator() {
    const indicator = document.getElementById('font-scale-display');
    if (indicator) {
        indicator.textContent = `${currentFontScale}%`;
    }
}

// Gerenciamento de Tema (Claro / Escuro / Sistema)
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('user-theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('user-theme', theme);
    updateThemeToggleUI(theme);
}

function toggleTheme() {
    const activeTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
    applyTheme(activeTheme);
}

function updateThemeToggleUI(theme) {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
        const icon = btn.querySelector('.theme-icon');
        const text = btn.querySelector('.theme-text');
        if (theme === 'dark') {
            if (icon) icon.textContent = '☀️';
            if (text) text.textContent = 'Modo Claro';
        } else {
            if (icon) icon.textContent = '🌙';
            if (text) text.textContent = 'Modo Escuro';
        }
    }
}

// Inicialização ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
    // Aplicar Tema Salvo
    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    // Aplicar Fonte Salva
    const savedScale = localStorage.getItem('user-font-scale');
    if (savedScale) {
        currentFontScale = parseInt(savedScale, 10);
        document.documentElement.style.fontSize = `${currentFontScale}%`;
    }
    updateFontScaleIndicator();

    // Efeito de Scroll no Menu Navegação
    const navMenu = document.querySelector('.menu');
    if (navMenu) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navMenu.classList.add('is-scrolled');
            } else {
                navMenu.classList.remove('is-scrolled');
            }
        });
    }
});