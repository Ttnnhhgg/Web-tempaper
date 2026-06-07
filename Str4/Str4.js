// Str4.js - Полная версия с модальными окнами и переключением языка

document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена');
    
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

    // ========== МОДАЛЬНЫЕ ОКНА ==========
    // Функции для работы с модальными окнами
    function closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = '';
    }

    function openModal(modalId) {
        closeAllModals();
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    // Создаём модальные окна, если их нет на странице
    function createModals() {
        // Модальное окно для заказа звонка
        if (!document.getElementById('modalForm1')) {
            const modal1 = document.createElement('div');
            modal1.id = 'modalForm1';
            modal1.className = 'modal-overlay';
            modal1.innerHTML = `
                <div class="modal-container">
                    <div class="modal-header">
                        <h3>Заказать звонок</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <form class="callback-form">
                        <div class="form-group">
                            <label>Ваше имя</label>
                            <input type="text" placeholder="Алексей" required>
                        </div>
                        <div class="form-group">
                            <label>Телефон</label>
                            <input type="tel" placeholder="+7 (___) ___-__-__" required>
                        </div>
                        <div class="form-group">
                            <label>Комментарий (необязательно)</label>
                            <textarea rows="2" placeholder="Удобное время для звонка..."></textarea>
                        </div>
                        <button type="submit" class="submit-modal-btn">Отправить</button>
                    </form>
                </div>
            `;
            document.body.appendChild(modal1);
        }

        // Добавляем стили для модальных окон, если их нет
        if (!document.querySelector('#modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = `
                .modal-overlay {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.7);
                    z-index: 10000;
                    justify-content: center;
                    align-items: center;
                }
                .modal-container {
                    background: #fff;
                    max-width: 480px;
                    width: 90%;
                    padding: 32px 28px;
                    border-radius: 0;
                }
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .modal-header h3 {
                    font-size: 28px;
                    font-weight: 800;
                    color: #1f2c3c;
                    font-family: 'Manrope', sans-serif;
                }
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 32px;
                    cursor: pointer;
                    color: #6c7a8a;
                }
                .form-group {
                    margin-bottom: 20px;
                }
                .form-group label {
                    display: block;
                    font-weight: 600;
                    margin-bottom: 8px;
                    color: #1e2a3a;
                    font-family: 'Manrope', sans-serif;
                }
                .form-group input, .form-group textarea {
                    width: 100%;
                    padding: 12px 16px;
                    border: 1px solid #cfdfed;
                    font-family: 'Manrope', sans-serif;
                    font-size: 15px;
                }
                .submit-modal-btn {
                    background: #EFA35A;
                    width: 100%;
                    padding: 14px;
                    border: none;
                    font-weight: 800;
                    font-size: 16px;
                    color: #1f2c3c;
                    cursor: pointer;
                    font-family: 'Manrope', sans-serif;
                }
                .submit-modal-btn:hover {
                    background: #e08e3a;
                }
            `;
            document.head.appendChild(style);
        }

        // Навешиваем обработчики на закрытие модальных окон
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeAllModals();
                }
            });
        });

        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeAllModals();
            });
        });

        // Обработка отправки форм
        document.querySelectorAll('.callback-form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = form.querySelector('input[type="text"]')?.value;
                const phone = form.querySelector('input[type="tel"]')?.value;
                
                if (name && phone) {
                    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
                    closeAllModals();
                    form.reset();
                } else {
                    alert('Пожалуйста, заполните имя и телефон');
                }
            });
        });
    }

    // Создаём модальные окна
    createModals();

    // КНОПКА "ЗАКАЗАТЬ ЗВОНОК" - открываем модальное окно
    const callbackBtn = document.getElementById('callbackBtn');
    if (callbackBtn) {
        callbackBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('modalForm1');
        });
    }

    // ========== СИСТЕМА ПЕРЕВОДА САЙТА ==========
    const translations = {
        ru: {
            callback_btn: "Заказать звонок",
            back_to_media: "Назад к СМИ",
            other_news_dark: "ДРУГИЕ",
            other_news_orange: " НОВОСТИ",
            share: "ПОДЕЛИТЬСЯ",
            footer_about: "О КОМПАНИИ",
            footer_projects: "ПРОЕКТЫ",
            footer_mortgage: "ИПОТЕКА",
            footer_slogan: "ДОМА ДЛЯ ПОБЕДИТЕЛЕЙ",
            footer_policy: "Политика конфиденциальности",
            home: "Главная",
            team: "Наша команда",
            media: "СМИ о нас",
            reviews: "Отзывы",
            news: "Новости",
            contacts: "Контакты",
            project1: "Изумрудный Village",
            project2: "Зимняя горка",
            project3: "Константиновка",
            project4: "Усады Village",
            project5: "IQ-CLUB",
            mortgage1: "Ипотечные кредиты",
            mortgage2: "Для семей с детьми",
            mortgage3: "Военная ипотека",
            mortgage4: "Господдержка 2023"
        },
        en: {
            callback_btn: "Request a call",
            back_to_media: "Back to media",
            other_news_dark: "OTHER",
            other_news_orange: " NEWS",
            share: "SHARE",
            footer_about: "ABOUT US",
            footer_projects: "PROJECTS",
            footer_mortgage: "MORTGAGE",
            footer_slogan: "HOMES FOR WINNERS",
            footer_policy: "Privacy policy",
            home: "Home",
            team: "Our team",
            media: "Media about us",
            reviews: "Reviews",
            news: "News",
            contacts: "Contacts",
            project1: "Emerald Village",
            project2: "Winter Hill",
            project3: "Konstantinovka",
            project4: "Usady Village",
            project5: "IQ-CLUB",
            mortgage1: "Mortgage loans",
            mortgage2: "For families with children",
            mortgage3: "Military mortgage",
            mortgage4: "State support 2023"
        }
    };

    // Функция установки языка
    function setLanguage(lang) {
        document.body.setAttribute('data-lang', lang);
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        const callbackBtnElement = document.getElementById('callbackBtn');
        if (callbackBtnElement && translations[lang]) {
            callbackBtnElement.textContent = translations[lang].callback_btn;
        }
        
        const backToMediaLinks = document.querySelectorAll('.back-to-media-link, .back-to-media');
        backToMediaLinks.forEach(link => {
            const span = link.querySelector('span:not(.arrow-left)');
            if (span && translations[lang]) {
                span.textContent = translations[lang].back_to_media;
            }
        });
        
        const otherNewsDark = document.querySelector('.other-news-dark');
        const otherNewsOrange = document.querySelector('.other-news-orange-italic');
        if (otherNewsDark && translations[lang]) otherNewsDark.textContent = translations[lang].other_news_dark;
        if (otherNewsOrange && translations[lang]) otherNewsOrange.textContent = translations[lang].other_news_orange;
        
        const shareText = document.querySelector('.share-text');
        if (shareText && translations[lang]) shareText.textContent = translations[lang].share;
        
        const footerTitles = document.querySelectorAll('.footer-title');
        if (footerTitles[0] && translations[lang]) footerTitles[0].innerHTML = translations[lang].footer_about;
        if (footerTitles[1] && translations[lang]) footerTitles[1].innerHTML = translations[lang].footer_projects;
        if (footerTitles[2] && translations[lang]) footerTitles[2].innerHTML = translations[lang].footer_mortgage;
        
        const footerSlogan = document.querySelector('.footer-slogan');
        if (footerSlogan && translations[lang]) footerSlogan.innerHTML = translations[lang].footer_slogan;
        
        const footerPolicy = document.querySelector('.footer-policy');
        if (footerPolicy && translations[lang]) footerPolicy.innerHTML = translations[lang].footer_policy;
        
        localStorage.setItem('selectedLanguage', lang);
        console.log('Язык изменён на:', lang);
    }
    
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang && (savedLang === 'ru' || savedLang === 'en')) {
        setLanguage(savedLang);
    } else {
        setLanguage('ru');
    }
    
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const lang = this.getAttribute('data-lang');
            if (lang === 'ru' || lang === 'en') {
                setLanguage(lang);
            }
        });
    });

    // ========== ОСТАЛЬНАЯ ФУНКЦИОНАЛЬНОСТЬ ==========
    
    const backButtons = document.querySelectorAll('.back-to-media-link, .back-to-media');
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const currentLang = document.body.getAttribute('data-lang');
            if (currentLang === 'en') {
                alert('Return to media list');
            } else {
                alert('Переход к списку СМИ');
            }
        });
    });

    const otherNewsBlock = document.querySelector('.other-news');
    if (otherNewsBlock) {
        otherNewsBlock.addEventListener('click', function(e) {
            e.preventDefault();
            const currentLang = document.body.getAttribute('data-lang');
            if (currentLang === 'en') {
                alert('Go to other news');
            } else {
                alert('Переход к другим новостям');
            }
        });
    }

    const shareText = document.querySelector('.share-text');
    if (shareText) {
        shareText.addEventListener('click', function() {
            const currentLang = document.body.getAttribute('data-lang');
            if (currentLang === 'en') {
                alert('Share on social networks (demo mode)');
            } else {
                alert('Поделиться в соцсетях (демо-режим)');
            }
        });
    }

    const socialIcons = document.querySelector('.social-img');
    if (socialIcons) {
        socialIcons.addEventListener('click', function() {
            const currentLang = document.body.getAttribute('data-lang');
            if (currentLang === 'en') {
                alert('Open social networks (demo mode)');
            } else {
                alert('Открыть соцсети (демо-режим)');
            }
        });
    }

    const rightBlocks = document.querySelectorAll('.right-block');
    if (rightBlocks[0]) {
        rightBlocks[0].addEventListener('click', function() {
            alert('Открыть новость: На рынке новый тренд – свой дом в черте города');
        });
    }
    if (rightBlocks[1]) {
        rightBlocks[1].addEventListener('click', function() {
            alert('Открыть новость: БИЗНЕСONLINE - На пути к расцвету субурбии');
        });
    }
    if (rightBlocks[2]) {
        rightBlocks[2].addEventListener('click', function() {
            alert('Открыть новость: Жилье для счастливой жизни: успех кроется в мелочах');
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    const homeButton = document.getElementById('homeButton');
    if (homeButton) {
        const isHomePage = window.location.pathname === '/' || 
                          window.location.pathname === '/Str1.html' ||
                          window.location.pathname.endsWith('Str1.html');
        
        if (isHomePage) {
            homeButton.style.display = 'none';
        }
        
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                homeButton.style.opacity = '0.7';
                homeButton.style.transform = 'translateY(-10px)';
            } else {
                homeButton.style.opacity = '1';
                homeButton.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        });
    }

    // ========== БУРГЕР-МЕНЮ ==========
    (function initBurgerMenu() {
        const burgerToggle = document.getElementById('burgerToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileOverlay = document.getElementById('mobileOverlay');
        const mobileClose = document.getElementById('mobileMenuClose');
        
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
        
        const submenuItems = document.querySelectorAll('.mobile-nav-item.has-submenu');
        submenuItems.forEach(function(item) {
            const trigger = item.querySelector('span');
            if (trigger) {
                trigger.addEventListener('click', function(e) {
                    e.stopPropagation();
                    submenuItems.forEach(function(other) {
                        if (other !== item && other.classList.contains('active')) {
                            other.classList.remove('active');
                        }
                    });
                    item.classList.toggle('active');
                });
            }
        });
        
        const mobileLinks = document.querySelectorAll('.mobile-nav-item a');
        mobileLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // Кнопка заказа звонка в мобильном меню
        const mobileCallbackBtn = document.getElementById('mobileCallbackBtn');
        if (mobileCallbackBtn) {
            mobileCallbackBtn.addEventListener('click', function(e) {
                e.preventDefault();
                openModal('modalForm1');
                closeMobileMenu();
            });
        }
    })();

    console.log('Страница полностью загружена, все функции работают');










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