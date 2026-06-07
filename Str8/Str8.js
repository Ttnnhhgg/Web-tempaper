// Str8.js - с модальными окнами

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

    // Модальное окно form1 (Заказать звонок / Связаться с менеджером)
    const modalForm1 = document.getElementById('modalForm1');
    const closeModal1 = document.querySelector('.close-modal1');
    const form1 = document.getElementById('form1');

    // Модальное окно form5 (Оставить заявку)
    const modalForm5 = document.getElementById('modalForm5');
    const closeModal5 = document.querySelector('.close-modal5');
    const form5 = document.getElementById('form5');

    // Модальное окно formDetails (Детали проекта)
    const modalFormDetails = document.getElementById('modalFormDetails');
    const closeModalDetails = document.querySelector('.close-modalDetails');
    const formDetails = document.getElementById('formDetails');

    // Кнопка "Заказать звонок" в шапке
    const callbackBtn = document.getElementById('callbackBtn');
    if (callbackBtn) {
        callbackBtn.addEventListener('click', () => openModal('modalForm1'));
    }

    // Кнопка "СВЯЗАТЬСЯ С МЕНЕДЖЕРОМ"
    const contactManagerBtn = document.getElementById('contactManagerBtn');
    if (contactManagerBtn) {
        contactManagerBtn.addEventListener('click', () => openModal('modalForm1'));
    }

    // Кнопка "ОСТАВИТЬ ЗАЯВКУ"
    const leaveRequestBtn = document.getElementById('leaveRequestBtn');
    if (leaveRequestBtn) {
        leaveRequestBtn.addEventListener('click', () => openModal('modalForm5'));
    }

    // Все кнопки "Детали проекта"
    const detailsBtns = document.querySelectorAll('.details-btn, .house-details-btn, .project-card-btn');
    detailsBtns.forEach(btn => {
        btn.addEventListener('click', () => openModal('modalFormDetails'));
    });

    // Закрытие модальных окон
    if (closeModal1) closeModal1.addEventListener('click', () => closeModal('modalForm1'));
    if (closeModal5) closeModal5.addEventListener('click', () => closeModal('modalForm5'));
    if (closeModalDetails) closeModalDetails.addEventListener('click', () => closeModal('modalFormDetails'));

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

    // Отправка form1
    if (form1) {
        form1.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form1Name')?.value;
            const phone = document.getElementById('form1Phone')?.value;
            if (name && phone) {
                alert('Спасибо! Мы свяжемся с вами.');
                closeModal('modalForm1');
                form1.reset();
            } else {
                alert('Пожалуйста, заполните имя и телефон');
            }
        });
    }

    // Отправка form5
    if (form5) {
        form5.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form5Name')?.value;
            const phone = document.getElementById('form5Phone')?.value;
            if (name && phone) {
                alert('Спасибо! Ваша заявка принята.');
                closeModal('modalForm5');
                form5.reset();
            } else {
                alert('Пожалуйста, заполните имя и телефон');
            }
        });
    }

    // Отправка formDetails
    if (formDetails) {
        formDetails.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('detailsName')?.value;
            const phone = document.getElementById('detailsPhone')?.value;
            if (name && phone) {
                alert('Спасибо! Мы отправим детали проекта.');
                closeModal('modalFormDetails');
                formDetails.reset();
            } else {
                alert('Пожалуйста, заполните имя и телефон');
            }
        });
    }

    // Пагинация
    let currentPage = 1;
    const totalPages = 4;

    function switchPage(page) {
        document.querySelectorAll('.pagination-num').forEach(btn => {
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

    // Кнопка возврата на главную
    const homeButton = document.getElementById('homeButton');
    if (homeButton) {
        homeButton.href = '../Str1.html';
    }

    console.log('Страница загружена, модальные окна работают');



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
                openModal('modalForm1');
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