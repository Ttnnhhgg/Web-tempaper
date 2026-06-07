// Str7.js - с переключением языка через классы lang-ru/lang-en

document.addEventListener('DOMContentLoaded', function() {
        // ========== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ (СВЕТЛАЯ/ТЕМНАЯ) ==========
    const themeBtn = document.getElementById('themeSwitchBtn');
    
    // Загружаем сохраненную тему
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        if (themeBtn) themeBtn.textContent = '☀️ Светлая';
    } else {
        if (themeBtn) themeBtn.textContent = '🌙 Тёмная';
    }
    
    // Функция переключения темы
    function toggleTheme() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        if (themeBtn) {
            themeBtn.textContent = isDark ? '☀️ Светлая' : '🌙 Тёмная';
        }
    }
    
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
    
    
    
    // Переключение языка через классы lang-ru и lang-en
    const langBtns = document.querySelectorAll('.lang-btn');
    const body = document.body;
    
    function setLanguage(lang) {
        // Устанавливаем атрибут data-lang на body
        body.setAttribute('data-lang', lang);
        
        // Обновляем активную кнопку
        langBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Сохраняем язык в localStorage
        localStorage.setItem('selectedLanguage', lang);
        console.log('Язык изменён на:', lang === 'ru' ? 'Русский' : 'English');
    }
    
    // Загружаем сохранённый язык
    const savedLang = localStorage.getItem('selectedLanguage');
    setLanguage(savedLang === 'en' ? 'en' : 'ru');
    
    // Обработчики кнопок перевода
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            if (lang === 'ru' || lang === 'en') {
                setLanguage(lang);
            }
        });
    });

    // Модальное окно для заказа звонка
    const modal = document.getElementById('callbackModal');
    const callbackBtn = document.getElementById('callbackBtn');
    const closeModalSpan = document.querySelector('.close-modal');
    const callbackForm = document.getElementById('callbackForm');
    const phoneInput = document.getElementById('phoneInput');

    function openModal() {
        if (modal) modal.style.display = 'flex';
    }
    function closeModal() {
        if (modal) modal.style.display = 'none';
    }

    if (callbackBtn) callbackBtn.addEventListener('click', openModal);
    if (closeModalSpan) closeModalSpan.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        if (modal && e.target === modal) closeModal();
    });
    
    if (callbackForm) {
        callbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const lang = body.getAttribute('data-lang');
            alert(lang === 'ru' ? 'Спасибо! Мы свяжемся с вами.' : 'Thank you! We will contact you.');
            closeModal();
            if (phoneInput) phoneInput.value = '';
        });
    }

    // Пагинация
    let currentPage = 1;
    const totalPages = 4;

    function switchPage(page) {
        const pageBtns = document.querySelectorAll('.pagination-num');
        pageBtns.forEach(btn => {
            const btnPage = parseInt(btn.textContent);
            if (btnPage === page) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        currentPage = page;
        const projectsSection = document.querySelector('.projects-section');
        if (projectsSection) {
            window.scrollTo({
                top: projectsSection.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    }

    function initPagination() {
        const prevBtn = document.querySelector('.pagination-prev');
        const nextBtn = document.querySelector('.pagination-next');
        const pageBtns = document.querySelectorAll('.pagination-num');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) switchPage(currentPage - 1);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentPage < totalPages) switchPage(currentPage + 1);
            });
        }
        pageBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const page = parseInt(btn.textContent);
                if (!isNaN(page) && page !== currentPage) switchPage(page);
            });
        });
    }

    initPagination();
    switchPage(1);

    // Кнопка "Проложить маршрут"
    const routeBtn = document.getElementById('routeBtn');
    if (routeBtn) {
        routeBtn.addEventListener('click', () => {
            window.open('https://yandex.ru/maps/?text=Казань, улица Яркая, 31Б&mode=routes', '_blank');
        });
    }

    // Кнопки фильтров и деталей (демо-режим)
    const filterBtns = document.querySelectorAll('[data-modal="filter"]');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = body.getAttribute('data-lang');
            alert(lang === 'ru' ? 'Фильтр в разработке' : 'Filter in development');
        });
    });

    const detailsBtns = document.querySelectorAll('[data-modal="formDetails"]');
    detailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = body.getAttribute('data-lang');
            alert(lang === 'ru' ? 'Детали проекта в разработке' : 'Project details in development');
        });
    });

    const contactBtn = document.querySelector('[data-modal="contact"]');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => openModal());
    }

    const requestBtn = document.querySelector('[data-modal="request"]');
    if (requestBtn) {
        requestBtn.addEventListener('click', () => openModal());
    }

    // Кнопка возврата на главную
    const homeButton = document.getElementById('homeButton');
    if (homeButton) {
        homeButton.href = '../Str1.html';
    }

    console.log('Страница загружена, перевод работает через lang-ru/lang-en');


        // ========== БУРГЕР-МЕНЮ ==========
    (function initBurgerMenu() {
        const burgerToggle = document.getElementById('burgerToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileOverlay = document.getElementById('mobileOverlay');
        const mobileClose = document.getElementById('mobileMenuClose');
        const mobileCallbackBtn = document.getElementById('mobileCallbackBtn');
        
        function openMobileMenu() {
            if (mobileMenu) {
                mobileMenu.classList.add('open');
                if (mobileOverlay) mobileOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                if (burgerToggle) burgerToggle.classList.add('active');
            }
        }
        
        function closeMobileMenu() {
            if (mobileMenu) {
                mobileMenu.classList.remove('open');
                if (mobileOverlay) mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
                if (burgerToggle) burgerToggle.classList.remove('active');
            }
        }
        
        if (burgerToggle) {
            burgerToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            });
        }
        
        if (mobileClose) {
            mobileClose.addEventListener('click', closeMobileMenu);
        }
        
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', closeMobileMenu);
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
                closeMobileMenu();
            }
        });
        
        // Подменю
        const submenuItems = document.querySelectorAll('.mobile-nav-item.has-submenu');
        submenuItems.forEach(item => {
            const trigger = item.querySelector('span');
            if (trigger) {
                trigger.addEventListener('click', function(e) {
                    e.stopPropagation();
                    submenuItems.forEach(other => {
                        if (other !== item && other.classList.contains('active')) {
                            other.classList.remove('active');
                        }
                    });
                    item.classList.toggle('active');
                });
            }
        });
        
        // Закрытие по ссылкам
        const mobileLinks = document.querySelectorAll('.mobile-nav-item a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Кнопка заказа звонка в мобильном меню
        if (mobileCallbackBtn) {
            mobileCallbackBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const modal = document.getElementById('callbackModal');
                if (modal) modal.style.display = 'flex';
                closeMobileMenu();
            });
        }
        
        // Язык в мобильном меню
        const mobileLangBtns = document.querySelectorAll('.lang-btn-mobile');
        mobileLangBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                if (lang === 'ru' || lang === 'en') {
                    document.body.setAttribute('data-lang', lang);
                    localStorage.setItem('selectedLanguage', lang);
                    document.querySelectorAll('.lang-btn').forEach(db => {
                        if (db.getAttribute('data-lang') === lang) {
                            db.classList.add('active');
                        } else {
                            db.classList.remove('active');
                        }
                    });
                }
                closeMobileMenu();
            });
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1098 && mobileMenu && mobileMenu.classList.contains('open')) {
                closeMobileMenu();
            }
        });
        
        console.log('Бургер-меню инициализировано');
    })();




        // ========== ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ ==========
    const visionBtn = document.getElementById('visionBtn');
    
    // Загружаем сохраненное состояние режима для слабовидящих
    const savedVisionMode = localStorage.getItem('visionMode');
    if (savedVisionMode === 'on') {
        document.body.classList.add('vision-mode');
        if (visionBtn) visionBtn.innerHTML = '👁️ Обычный режим';
    } else {
        if (visionBtn) visionBtn.innerHTML = '👁️ Версия для слабовидящих';
    }
    
    // Функция переключения режима для слабовидящих
    function toggleVisionMode() {
        document.body.classList.toggle('vision-mode');
        const isVisionMode = document.body.classList.contains('vision-mode');
        localStorage.setItem('visionMode', isVisionMode ? 'on' : 'off');
        
        if (visionBtn) {
            visionBtn.innerHTML = isVisionMode ? '👁️ Обычный режим' : '👁️ Версия для слабовидящих';
        }
        
        // Сообщаем пользователю о переключении
        const message = isVisionMode ? 'Включен режим для слабовидящих' : 'Выключен режим для слабовидящих';
        console.log(message);
        
        // Показываем уведомление (опционально)
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '20px';
        notification.style.backgroundColor = isVisionMode ? '#000' : '#333';
        notification.style.color = isVisionMode ? '#FFFF00' : '#fff';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '10000';
        notification.style.fontSize = '14px';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
    
    if (visionBtn) {
        visionBtn.addEventListener('click', toggleVisionMode);
    }
});