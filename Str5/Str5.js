// Str5.js - с модальными окнами для form7 и form8

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
    
    
    
    
    
    
    
    
    
    
    
    
    // Переключение языка
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
        console.log('Язык:', lang === 'ru' ? 'Русский' : 'English');
    }
    
    const savedLang = localStorage.getItem('selectedLanguage');
    setLanguage(savedLang === 'en' ? 'en' : 'ru');
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            if (lang === 'ru' || lang === 'en') setLanguage(lang);
        });
    });

    // Функции для модальных окон
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

    // Модальное окно для заказа звонка
    const callbackModal = document.getElementById('callbackModal');
    const callbackBtn = document.getElementById('callbackBtn');
    const closeCallbackSpan = document.querySelector('#callbackModal .close-modal');
    const callbackForm = document.getElementById('callbackForm');
    const phoneInput = document.getElementById('phoneInput');

    if (callbackBtn) {
        callbackBtn.addEventListener('click', () => openModal('callbackModal'));
    }
    if (closeCallbackSpan) {
        closeCallbackSpan.addEventListener('click', () => closeModal('callbackModal'));
    }
    if (callbackForm) {
        callbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Спасибо! Мы свяжемся с вами.');
            closeModal('callbackModal');
            if (phoneInput) phoneInput.value = '';
        });
    }

    // Модальное окно для "Написать" (form7)
    const modalForm7 = document.getElementById('modalForm7');
    const closeModal7 = document.querySelector('#modalForm7 .close-modal7');
    const form7 = document.getElementById('form7');

    // Модальное окно для "Оставить отзыв" (form8)
    const modalForm8 = document.getElementById('modalForm8');
    const closeModal8 = document.querySelector('#modalForm8 .close-modal8');
    const form8 = document.getElementById('form8');

    // Обработчики для всех кнопок "Написать"
    document.querySelectorAll('.write-btn').forEach(btn => {
        btn.addEventListener('click', () => openModal('modalForm7'));
    });

    // Обработчики для всех кнопок "Оставить отзыв"
    document.querySelectorAll('.review-btn').forEach(btn => {
        btn.addEventListener('click', () => openModal('modalForm8'));
    });

    // Закрытие form7
    if (closeModal7) {
        closeModal7.addEventListener('click', () => closeModal('modalForm7'));
    }

    // Закрытие form8
    if (closeModal8) {
        closeModal8.addEventListener('click', () => closeModal('modalForm8'));
    }

    // Отправка form7
    if (form7) {
        form7.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form7Name')?.value;
            const phone = document.getElementById('form7Phone')?.value;
            const message = document.getElementById('form7Message')?.value;
            if (name && phone) {
                alert('Спасибо! Ваше сообщение отправлено.');
                closeModal('modalForm7');
                form7.reset();
            } else {
                alert('Пожалуйста, заполните имя и телефон');
            }
        });
    }

    // Отправка form8
    if (form8) {
        form8.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form8Name')?.value;
            const phone = document.getElementById('form8Phone')?.value;
            const review = document.getElementById('form8Review')?.value;
            if (name && phone && review) {
                alert('Спасибо за ваш отзыв!');
                closeModal('modalForm8');
                form8.reset();
            } else {
                alert('Пожалуйста, заполните все поля');
            }
        });
    }

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

    console.log('Страница загружена, модальные окна работают');


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
            burgerToggle.addEventListener('click', (e) => {
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
        
        document.addEventListener('keydown', (e) => {
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
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
        
        const mobileCallbackBtn = document.getElementById('mobileCallbackBtn');
        if (mobileCallbackBtn) {
            mobileCallbackBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const modal = document.getElementById('callbackModal');
                if (modal) modal.style.display = 'flex';
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
            });
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 1100 && mobileMenu && mobileMenu.classList.contains('open')) {
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