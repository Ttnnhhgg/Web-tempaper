// Str6.js - с модальными окнами form9 и form11

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

    // ========== ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА ==========
    const langBtns = document.querySelectorAll('.lang-btn');
    const body = document.body;
    
    function setLanguage(lang) {
        body.setAttribute('data-lang', lang);
        langBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        localStorage.setItem('selectedLanguage', lang);
    }
    
    const savedLang = localStorage.getItem('selectedLanguage');
    setLanguage(savedLang === 'en' ? 'en' : 'ru');
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            if (lang === 'ru' || lang === 'en') setLanguage(lang);
        });
    });

    // ========== МОДАЛЬНЫЕ ОКНА ==========
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'flex';
    }
    
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'none';
    }
    
    function closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }

    // Получаем модальные окна
    const modalForm1 = document.getElementById('callbackModal');
    const modalForm9 = document.getElementById('modalForm9');
    const modalForm11 = document.getElementById('modalForm11');
    
    // Кнопка "Заказать звонок" в шапке
    const callbackBtn = document.getElementById('callbackBtn');
    if (callbackBtn) {
        callbackBtn.addEventListener('click', () => openModal('callbackModal'));
    }
    
    // Кнопка "Перезвоните мне" в FAQ
    const faqCallbackBtn = document.querySelector('.faq-callback-btn');
    if (faqCallbackBtn) {
        faqCallbackBtn.addEventListener('click', () => openModal('callbackModal'));
    }
    
    // Кнопка "Рассчитать стоимость" (calcBtn) - открывает modalForm11
    const calcBtn = document.getElementById('calcBtn');
    if (calcBtn) {
        calcBtn.addEventListener('click', () => openModal('modalForm11'));
    }
    
    // Все кнопки "Рассчитать платёж" - открывают modalForm9
    const calculatePaymentBtns = document.querySelectorAll('.form-calculate-btn, .promo-btn, .small-promo-btn');
    calculatePaymentBtns.forEach(btn => {
        btn.addEventListener('click', () => openModal('modalForm9'));
    });
    
    // Закрытие модальных окон
    const closeModal1 = document.querySelector('#callbackModal .close-modal');
    if (closeModal1) closeModal1.addEventListener('click', () => closeModal('callbackModal'));
    
    const closeModal9 = document.querySelector('#modalForm9 .close-modal9');
    if (closeModal9) closeModal9.addEventListener('click', () => closeModal('modalForm9'));
    
    const closeModal11 = document.querySelector('#modalForm11 .close-modal11');
    if (closeModal11) closeModal11.addEventListener('click', () => closeModal('modalForm11'));
    
    // Закрытие по клику на фон
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Обработка формы заказа звонка (callbackModal)
    const callbackForm = document.getElementById('callbackForm');
    if (callbackForm) {
        callbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const phone = document.getElementById('phoneInput')?.value;
            if (phone) {
                alert('Спасибо! Мы свяжемся с вами.');
                closeModal('callbackModal');
                callbackForm.reset();
            } else {
                alert('Пожалуйста, введите номер телефона');
            }
        });
    }
    
    // Обработка формы "Рассчитать платёж" (form9)
    const form9 = document.getElementById('form9');
    if (form9) {
        form9.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form9Name')?.value;
            const phone = document.getElementById('form9Phone')?.value;
            if (name && phone) {
                alert('Спасибо! Мы рассчитаем платёж и свяжемся с вами.');
                closeModal('modalForm9');
                form9.reset();
            } else {
                alert('Пожалуйста, заполните имя и телефон');
            }
        });
    }
    
    // Обработка формы "Рассчитать стоимость" (form11)
    const form11 = document.getElementById('form11');
    if (form11) {
        form11.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form11Name')?.value;
            const phone = document.getElementById('form11Phone')?.value;
            if (name && phone) {
                alert('Спасибо! Мы рассчитаем стоимость и свяжемся с вами.');
                closeModal('modalForm11');
                form11.reset();
            } else {
                alert('Пожалуйста, заполните имя и телефон');
            }
        });
    }
    
    // Стрелки в форме (демо)
    const arrows = document.querySelectorAll('.gray-select-box');
    arrows.forEach(arrow => {
        arrow.addEventListener('click', function() {
            const currentLang = body.getAttribute('data-lang');
            alert(currentLang === 'ru' ? 'Выберите значение из списка' : 'Select a value from the list');
        });
    });
    
    // Кнопка возврата на главную
    const homeButton = document.getElementById('homeButton');
    if (homeButton) {
        homeButton.href = '../Str1.html';
    }

    // ========== БУРГЕР-МЕНЮ ==========
    (function() {
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
        
        const mobileLinks = document.querySelectorAll('.mobile-nav-item a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        if (mobileCallbackBtn) {
            mobileCallbackBtn.addEventListener('click', function(e) {
                e.preventDefault();
                openModal('callbackModal');
                closeMobileMenu();
            });
        }
        
        const mobileLangBtns = document.querySelectorAll('.lang-btn-mobile');
        mobileLangBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                if (lang === 'ru' || lang === 'en') {
                    setLanguage(lang);
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
            if (window.innerWidth > 1100 && mobileMenu && mobileMenu.classList.contains('open')) {
                closeMobileMenu();
            }
        });
    })();

    console.log('Страница загружена, все модальные окна работают');





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