// Str2.js — ИСПРАВЛЕННАЯ ВЕРСИЯ С РАБОТАЮЩИМИ ФОРМАМИ
document.addEventListener('DOMContentLoaded', () => {
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























    // СЛОВАРЬ ПЕРЕВОДОВ
    const translations = {
        ru: {
            nav_projects: "Наши проекты ▼",
            nav_houses: "Дома ▼",
            nav_mortgage: "Ипотека",
            nav_about: "О компании ▼",
            nav_contacts: "Контакты",
            callback_btn: "Заказать звонок",
            office_title1: "ЦЕНТРАЛЬНЫЙ ОФИС",
            win_dom: "WIN DOM",
            address: "Республика Татарстан, г. Казань ул. Яркая, д.31Б",
            consultation_title: "Консультация",
            consultation_sub1: "Наш менеджер свяжется с вами",
            consultation_sub2: "в ближайшее время",
            name_placeholder: "Ваше имя",
            phone_placeholder: "Телефон",
            submit_btn: "Получить консультацию",
            consent_text: "Нажимая кнопку «Получить консультацию», вы подтверждаете свое согласие на обработку персональных данных",
            consent: "согласие",
            personal_data: "обработку персональных данных",
            map_title: "Вы можете обратиться к нашим менеджерам по любому вопросу",
            map_address: "г.Казань, ул.Яркая 31 Б",
            map_hours: "Пн-Сб: с 9:00 до 18:00",
            map_phone: "+7 (962) 555-25-25",
            route_btn: "Проложить маршрут",
            footer_about: "О КОМПАНИИ",
            footer_home: "Главная",
            footer_team: "Наша команда",
            footer_media: "СМИ о нас",
            footer_reviews: "Отзывы",
            footer_news: "Новости",
            footer_contacts: "Контакты",
            footer_policy: "Политика конфиденциальности",
            footer_projects: "ПРОЕКТЫ",
            project1: "Изумрудный Village",
            project2: "Зимняя горка",
            project3: "Константиновка",
            project4: "Усады Village",
            project5: "IQ-CLUB",
            footer_mortgage: "ИПОТЕКА",
            mortgage1: "Ипотечные кредиты",
            mortgage2: "Для семей с детьми",
            mortgage3: "Военная ипотека",
            mortgage4: "Господдержка 2023",
            footer_slogan: "ДОМА ДЛЯ ПОБЕДИТЕЛЕЙ"
        },
        en: {
            nav_projects: "Our Projects ▼",
            nav_houses: "Houses ▼",
            nav_mortgage: "Mortgage",
            nav_about: "About ▼",
            nav_contacts: "Contacts",
            callback_btn: "Request a call",
            office_title1: "CENTRAL OFFICE",
            win_dom: "WIN DOM",
            address: "Republic of Tatarstan, Kazan, Yarkaya str., 31B",
            consultation_title: "Consultation",
            consultation_sub1: "Our manager will contact you",
            consultation_sub2: "shortly",
            name_placeholder: "Your name",
            phone_placeholder: "Phone",
            submit_btn: "Get consultation",
            consent_text: "By clicking the button, you consent to the processing of personal data",
            consent: "consent",
            personal_data: "personal data processing",
            map_title: "You can contact our managers for any question",
            map_address: "Kazan, Yarkaya str. 31 B",
            map_hours: "Mon-Sat: 9:00 AM - 6:00 PM",
            map_phone: "+7 (962) 555-25-25",
            route_btn: "Get directions",
            footer_about: "ABOUT COMPANY",
            footer_home: "Home",
            footer_team: "Our team",
            footer_media: "Media about us",
            footer_reviews: "Reviews",
            footer_news: "News",
            footer_contacts: "Contacts",
            footer_policy: "Privacy policy",
            footer_projects: "PROJECTS",
            project1: "Emerald Village",
            project2: "Winter Hill",
            project3: "Konstantinovka",
            project4: "Usady Village",
            project5: "IQ-CLUB",
            footer_mortgage: "MORTGAGE",
            mortgage1: "Mortgage loans",
            mortgage2: "For families with children",
            mortgage3: "Military mortgage",
            mortgage4: "State support 2023",
            footer_slogan: "HOMES FOR WINNERS"
        }
    };

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
        // Модальное окно для заказа звонка (form1)
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

        // Модальное окно для консультации (form10)
        if (!document.getElementById('modalForm10')) {
            const modal10 = document.createElement('div');
            modal10.id = 'modalForm10';
            modal10.className = 'modal-overlay';
            modal10.innerHTML = `
                <div class="modal-container">
                    <div class="modal-header">
                        <h3>Получить консультацию</h3>
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
                            <label>Ваш вопрос</label>
                            <textarea rows="3" placeholder="Опишите ваш вопрос..."></textarea>
                        </div>
                        <button type="submit" class="submit-modal-btn">Отправить</button>
                    </form>
                </div>
            `;
            document.body.appendChild(modal10);
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

    // ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ ЯЗЫКА
    function setLanguage(lang) {
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                    el.placeholder = translations[lang][key];
                } else if (el.tagName === 'BUTTON' && el.getAttribute('data-key')) {
                    el.textContent = translations[lang][key];
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        localStorage.setItem('language', lang);
        console.log('Язык изменён на:', lang);
    }

    // НАВЕШИВАЕМ СОБЫТИЯ НА КНОПКИ ЯЗЫКА
    const langBtns = document.querySelectorAll('.lang-btn');
    console.log('Найдено кнопок языка:', langBtns.length);
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const lang = this.getAttribute('data-lang');
            console.log('Нажата кнопка:', lang);
            setLanguage(lang);
        });
    });
    
    // ЗАГРУЖАЕМ СОХРАНЁННЫЙ ЯЗЫК
    const savedLang = localStorage.getItem('language') || 'ru';
    setLanguage(savedLang);

    // КНОПКА "ЗАКАЗАТЬ ЗВОНОК" - открываем модальное окно
    const callbackBtn = document.getElementById('callbackBtn');
    if (callbackBtn) {
        callbackBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('modalForm1');
        });
    }

    // КНОПКА "ПРОЛОЖИТЬ МАРШРУТ"
    const routeBtn = document.getElementById('routeBtn');
    if (routeBtn) {
        routeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://yandex.ru/maps/?text=Казань, улица Яркая, 31Б&mode=routes', '_blank');
        });
    }

    // ФОРМА КОНСУЛЬТАЦИИ - открываем модальное окно
    const consultForm = document.getElementById('consultForm');
    if (consultForm) {
        consultForm.addEventListener('submit', (e) => {
            e.preventDefault();
            openModal('modalForm10');
            consultForm.reset();
        });
    }

    // КАРТА
    const mapElement = document.getElementById('yandexMap');
    if (mapElement) {
        mapElement.innerHTML = '<iframe src="https://yandex.ru/map-widget/v1/?ll=49.106405,55.796127&z=17&pt=49.106405,55.796127&l=map" width="100%" height="100%" frameborder="0" style="border:none; display: block;"></iframe>';
    }

    // КНОПКА "НА ГЛАВНУЮ"
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

    // Закрытие модальных окон по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    console.log('Страница полностью загружена, формы работают через модальные окна');

























    // Добавьте в конец файла Str2.js, перед последней закрывающей скобкой

// ========== ОБРАБОТКА ВЫПАДАЮЩИХ МЕНЮ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ ==========
function initMobileDropdowns() {
    if (window.innerWidth <= 1100) {
        const dropdowns = document.querySelectorAll('.nav-item.dropdown');
        
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (!link || !menu) return;
            
            // Убираем оригинальный href
            if (link.getAttribute('href') === 'javascript:void(0)') {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Закрываем другие открытые dropdown
                    dropdowns.forEach(other => {
                        if (other !== dropdown && other.classList.contains('active')) {
                            other.classList.remove('active');
                        }
                    });
                    
                    dropdown.classList.toggle('active');
                });
            }
        });
        
        // Закрытие при клике вне меню
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-item.dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
}

// Инициализация мобильных dropdown
initMobileDropdowns();

// При изменении размера окна
window.addEventListener('resize', () => {
    initMobileDropdowns();
});



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
        
        // Обработка подменю в мобильной версии
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
        
        // Закрытие меню при клике на ссылку
        const mobileLinks = document.querySelectorAll('.mobile-nav-item a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
        
        // Кнопка заказа звонка в мобильном меню
        const mobileCallbackBtn = document.getElementById('mobileCallbackBtn');
        if (mobileCallbackBtn) {
            mobileCallbackBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal('modalForm1');
                closeMobileMenu();
            });
        }
        
        // Переключатели языка в мобильном меню
        const mobileLangBtns = document.querySelectorAll('.lang-btn-mobile');
        mobileLangBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                if (lang === 'ru' || lang === 'en') {
                    setLanguage(lang);
                    // Синхронизируем с десктопными кнопками
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
        
        // При изменении размера окна - закрываем меню
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