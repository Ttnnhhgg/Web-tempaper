// Str1.js - С JSON SERVER (ПОЛНАЯ ВЕРСИЯ)

document.addEventListener('DOMContentLoaded', () => {
    console.log('Страница загружена');

    // ========== КОНФИГУРАЦИЯ API ==========
    const API_URL = 'http://localhost:3000';
    const USERS_API = `${API_URL}/users`;
    
    // ========== ФУНКЦИЯ УВЕДОМЛЕНИЙ ==========
    function showNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = isError ? '#dc3545' : '#28a745';
        notification.style.color = '#fff';
        notification.style.padding = '12px 24px';
        notification.style.borderRadius = '8px';
        notification.style.zIndex = '10001';
        notification.style.fontSize = '14px';
        notification.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    // ========== ФУНКЦИИ ДЛЯ МОДАЛЬНЫХ ОКОН ==========
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

    // ========== РАБОТА С API ПОЛЬЗОВАТЕЛЕЙ ==========
    
    // Получить всех пользователей
    async function fetchUsers() {
        try {
            const response = await fetch(USERS_API);
            if (!response.ok) throw new Error('Ошибка загрузки пользователей');
            return await response.json();
        } catch (error) {
            console.error('Ошибка fetchUsers:', error);
            showNotification('Ошибка подключения к серверу. Убедитесь, что JSON Server запущен.', true);
            return [];
        }
    }
    
    // Добавить пользователя
    async function addUser(userData) {
        try {
            const response = await fetch(USERS_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (!response.ok) throw new Error('Ошибка добавления пользователя');
            return await response.json();
        } catch (error) {
            console.error('Ошибка addUser:', error);
            showNotification('Ошибка сервера', true);
            return null;
        }
    }
    
    // Удалить пользователя
    async function deleteUser(userId) {
        try {
            const response = await fetch(`${USERS_API}/${userId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Ошибка удаления пользователя');
            return true;
        } catch (error) {
            console.error('Ошибка deleteUser:', error);
            showNotification('Ошибка сервера', true);
            return false;
        }
    }
    
    // Проверка логина
    async function loginUser(username, password) {
        const users = await fetchUsers();
        const user = users.find(u => u.username === username && u.password === password);
        return user || null;
    }
    
    // Проверка существования пользователя
    async function userExists(username) {
        const users = await fetchUsers();
        return users.some(u => u.username === username);
    }
    
    // ========== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ==========
    const themeBtn = document.getElementById('themeSwitchBtn');
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
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    // ========== ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ ==========
    const visionBtn = document.getElementById('visionBtn');
    if (visionBtn) {
        const savedVisionMode = localStorage.getItem('visionMode');
        if (savedVisionMode === 'on') {
            document.body.classList.add('vision-mode');
            visionBtn.innerHTML = '👁️ Обычный режим';
        } else {
            visionBtn.innerHTML = '👁️ Версия для слабовидящих';
        }
        
        function toggleVisionMode() {
            document.body.classList.toggle('vision-mode');
            const isVisionMode = document.body.classList.contains('vision-mode');
            localStorage.setItem('visionMode', isVisionMode ? 'on' : 'off');
            visionBtn.innerHTML = isVisionMode ? '👁️ Обычный режим' : '👁️ Версия для слабовидящих';
            showNotification(isVisionMode ? 'Включен режим для слабовидящих' : 'Выключен режим для слабовидящих');
        }
        visionBtn.addEventListener('click', toggleVisionMode);
    }

    // ========== СИСТЕМА РЕГИСТРАЦИИ И ЛОГИНА (С JSON SERVER) ==========
    
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    
    function getRoleName(role) {
        switch(role) {
            case 'admin': return 'Администратор';
            case 'designer': return 'Дизайнер';
            default: return 'Пользователь';
        }
    }
    
    // КНОПКИ ВХОДА И РЕГИСТРАЦИИ
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('loginModal');
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('registerModal');
        });
    }
    
    // Обработка формы логина (асинхронная)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername')?.value.trim();
            const password = document.getElementById('loginPassword')?.value;
            
            if (username && password) {
                showNotification('Проверка данных...');
                
                const user = await loginUser(username, password);
                
                if (user) {
                    currentUser = { 
                        id: user.id,
                        username: user.username, 
                        role: user.role,
                        createdAt: user.createdAt
                    };
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    updateAuthUI();
                    closeAllModals();
                    document.getElementById('loginUsername').value = '';
                    document.getElementById('loginPassword').value = '';
                    showNotification(`Добро пожаловать, ${username}! Роль: ${getRoleName(user.role)}`);
                } else {
                    showNotification('Неверный логин или пароль', true);
                }
            } else {
                showNotification('Заполните все поля', true);
            }
        });
    }
    
    // Обработка формы регистрации (асинхронная, с отправкой на JSON Server)
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('regUsername')?.value.trim();
            const password = document.getElementById('regPassword')?.value;
            
            if (username && password) {
                if (username.length < 3) {
                    showNotification('Логин должен содержать минимум 3 символа', true);
                    return;
                }
                if (password.length < 4) {
                    showNotification('Пароль должен содержать минимум 4 символа', true);
                    return;
                }
                
                // Проверка на существующего пользователя
                const exists = await userExists(username);
                if (exists) {
                    showNotification('Пользователь с таким логином уже существует', true);
                    return;
                }
                
                // Создаем нового пользователя
                const newUser = {
                    username: username,
                    password: password, // В реальном проекте нужно хэшировать!
                    role: 'user',
                    createdAt: new Date().toISOString()
                };
                
                const addedUser = await addUser(newUser);
                
                if (addedUser) {
                    showNotification('Регистрация успешна! Теперь войдите в систему');
                    closeAllModals();
                    document.getElementById('regUsername').value = '';
                    document.getElementById('regPassword').value = '';
                    openModal('loginModal');
                } else {
                    showNotification('Ошибка при регистрации. Попробуйте позже.', true);
                }
            } else {
                showNotification('Заполните все поля', true);
            }
        });
    }
    
    // Кнопка выхода
    document.addEventListener('click', (e) => {
        if (e.target.id === 'logoutBtn') {
            localStorage.removeItem('currentUser');
            currentUser = null;
            updateAuthUI();
            showNotification('Вы вышли из системы');
        }
    });
    
    // Функция обновления UI
    function updateAuthUI() {
        const authButtons = document.querySelector('.auth-buttons');
        const userInfo = document.querySelector('.user-info');
        
        if (currentUser) {
            if (userInfo) {
                userInfo.innerHTML = `
                    <span class="user-name">${currentUser.username}</span>
                    <span class="user-role">(${getRoleName(currentUser.role)})</span>
                    <button class="logout-btn" id="logoutBtn">Выйти</button>
                `;
                userInfo.style.display = 'flex';
            }
            if (authButtons) authButtons.style.display = 'none';
            
            if (currentUser.role === 'admin') showAdminPanel();
            else if (currentUser.role === 'designer') showDesignerPanel();
        } else {
            if (userInfo) userInfo.style.display = 'none';
            if (authButtons) authButtons.style.display = 'flex';
            hideAdminPanel();
            hideDesignerPanel();
        }
    }
    
    
    
    // ========== МОДАЛЬНЫЕ ОКНА (ОСТАЛЬНЫЕ) ==========
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = btn.closest('.modal-overlay');
            if (modal) modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    });
    
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllModals();
    });
    
    document.querySelectorAll('.callback-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('modalForm1');
        });
    });
    
    const askQuestionBtn = document.getElementById('askQuestionBtn');
    if (askQuestionBtn) {
        askQuestionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('modalForm3');
        });
    }
    
    document.querySelectorAll('.get-calc-btn, .mortgage-card-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('modalForm10');
        });
    });
    
    document.querySelectorAll('.callback-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.querySelector('input[type="text"]')?.value;
            const phone = form.querySelector('input[type="tel"]')?.value;
            if (name && phone) {
                showNotification('Спасибо! Мы свяжемся с вами в ближайшее время.');
                const modal = form.closest('.modal-overlay');
                if (modal) modal.style.display = 'none';
                form.reset();
                document.body.style.overflow = '';
            } else {
                showNotification('Пожалуйста, заполните имя и телефон', true);
            }
        });
    });
    
    // ========== ВИДЕО ==========
    const videoCard = document.getElementById('videoPreviewCard');
    const modalVideo = document.getElementById('modalVideo');
    const videoIframe = document.getElementById('videoIframe');
    if (videoCard) {
        videoCard.addEventListener('click', () => {
            if (modalVideo && videoIframe) {
                videoIframe.src = 'https://www.youtube.com/embed/oB6m7k5LsgA?autoplay=1';
                modalVideo.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    document.querySelectorAll('.video-close').forEach(btn => {
        btn.addEventListener('click', () => {
            if (videoIframe) videoIframe.src = '';
            if (modalVideo) modalVideo.style.display = 'none';
            document.body.style.overflow = '';
        });
    });
    
    // ========== МАРШРУТ ==========
    const routeBtn = document.querySelector('.office-route-btn');
    if (routeBtn) {
        routeBtn.addEventListener('click', () => {
            window.open('https://yandex.ru/maps/?text=Казань, улица Яркая, 31Б&mode=routes', '_blank');
        });
    }
    
    // ========== ПАГИНАЦИЯ СЛАЙДОВ ==========
    const bars = document.querySelectorAll('.pagination-bar');
    const slideLeft = document.querySelector('.slide-left');
    const slideCenter = document.querySelector('.slide-center');
    const slideRight = document.querySelector('.slide-right');
    
    if (bars.length && slideLeft && slideCenter && slideRight) {
        const slides = [
            { left: 'im5.png', center: 'im10.png', right: 'im11.png' },
            { left: 'im11.png', center: 'im5.png', right: 'im10.png' },
            { left: 'im10.png', center: 'im11.png', right: 'im5.png' }
        ];
        let currentIndex = 1;
        
        function changeSlide(index) {
            if (index === currentIndex) return;
            bars.forEach((bar, i) => bar.classList.toggle('active', i === index));
            const leftImg = slideLeft.querySelector('.slide-img');
            const centerImg = slideCenter.querySelector('.slide-img-center');
            const rightImg = slideRight.querySelector('.slide-img');
            if (leftImg && centerImg && rightImg && slides[index]) {
                leftImg.src = slides[index].left;
                centerImg.src = slides[index].center;
                rightImg.src = slides[index].right;
            }
            currentIndex = index;
        }
        bars.forEach((bar, index) => bar.addEventListener('click', () => changeSlide(index)));
    }
    
    // ========== СЛАЙДЕР ОТЗЫВОВ ==========
    const track = document.getElementById('reviewsTrack');
    const reviewsPrevBtn = document.getElementById('reviewsPrev');
    const reviewsNextBtn = document.getElementById('reviewsNext');
    let currentReviewIndex = 0;
    
    function updateReviewSlider() {
        const cardWidth = document.querySelector('.review-card')?.offsetWidth;
        if (cardWidth && track) {
            track.style.transform = `translateX(-${currentReviewIndex * (cardWidth + 30)}px)`;
        }
    }
    
    if (reviewsPrevBtn && reviewsNextBtn && track) {
        reviewsPrevBtn.addEventListener('click', () => {
            if (currentReviewIndex > 0) {
                currentReviewIndex--;
                updateReviewSlider();
            }
        });
        reviewsNextBtn.addEventListener('click', () => {
            const cards = document.querySelectorAll('.review-card');
            let cardsPerView = window.innerWidth <= 920 ? 1 : (window.innerWidth <= 1280 ? 2 : 3);
            if (currentReviewIndex < cards.length - cardsPerView) {
                currentReviewIndex++;
                updateReviewSlider();
            }
        });
        window.addEventListener('resize', () => {
            currentReviewIndex = 0;
            updateReviewSlider();
        });
        setTimeout(updateReviewSlider, 100);
    }
    
    // ========== БУРГЕР-МЕНЮ ==========
    const burgerBtn = document.getElementById('mobileToggle');
    const menuPanel = document.getElementById('mobileDropdown');
    let bgOverlay = document.querySelector('.mobile-overlay');
    if (!bgOverlay) {
        bgOverlay = document.createElement('div');
        bgOverlay.className = 'mobile-overlay';
        document.body.appendChild(bgOverlay);
    }
    
    function closeMenu() {
        burgerBtn?.classList.remove('active');
        menuPanel?.classList.remove('active');
        bgOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function openMenu() {
        burgerBtn?.classList.add('active');
        menuPanel?.classList.add('active');
        bgOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    if (burgerBtn && menuPanel) {
        burgerBtn.onclick = (e) => {
            e.stopPropagation();
            menuPanel.classList.contains('active') ? closeMenu() : openMenu();
        };
        bgOverlay.onclick = closeMenu;
    }
    
    // ========== ПЕРЕВОД ЯЗЫКА ==========
    let currentLang = localStorage.getItem('selectedLanguage') || 'ru';
    
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
        showNotification(currentLang === 'ru' ? 'Язык изменён на русский' : 'Language changed to English');
    }
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage(btn.getAttribute('data-lang'));
        });
    });
    
    // Проверка подключения к серверу при загрузке
    async function checkServerConnection() {
        try {
            const response = await fetch(`${API_URL}/users?_limit=1`);
            if (response.ok) {
                console.log('✅ JSON Server подключен на порту 3000');
            } else {
                console.warn('⚠️ JSON Server не отвечает');
            }
        } catch (error) {
            console.warn('⚠️ JSON Server не запущен! Запустите: json-server --watch db.json --port 3000');
        }
    }
    
    // Инициализация UI и проверка сервера
    updateAuthUI();
    checkServerConnection();
    
    console.log('Страница загружена, все системы работают');
    
    // Функции для глобального доступа
    window.closeLoginModal = () => closeAllModals();
    window.closeRegisterModal = () => closeAllModals();
});