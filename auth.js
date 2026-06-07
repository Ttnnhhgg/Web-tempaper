// auth.js - Глобальная система авторизации для всех страниц

// ========== КОНФИГУРАЦИЯ ==========
const API_URL = 'http://localhost:3000';
const USERS_API = `${API_URL}/users`;
const PROJECTS_API = `${API_URL}/projects`;

// Текущий пользователь (глобальный)
window.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// ========== ФУНКЦИИ API ==========
async function fetchUsers() {
    try {
        const response = await fetch(USERS_API);
        if (!response.ok) throw new Error('Ошибка загрузки');
        return await response.json();
    } catch (error) {
        console.error('Ошибка fetchUsers:', error);
        return [];
    }
}

async function addUser(userData) {
    try {
        const response = await fetch(USERS_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!response.ok) throw new Error('Ошибка добавления');
        return await response.json();
    } catch (error) {
        console.error('Ошибка addUser:', error);
        return null;
    }
}

async function updateUser(userId, userData) {
    try {
        const response = await fetch(`${USERS_API}/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!response.ok) throw new Error('Ошибка обновления');
        return await response.json();
    } catch (error) {
        console.error('Ошибка updateUser:', error);
        return null;
    }
}

async function deleteUser(userId) {
    try {
        const response = await fetch(`${USERS_API}/${userId}`, { method: 'DELETE' });
        return response.ok;
    } catch (error) {
        console.error('Ошибка deleteUser:', error);
        return false;
    }
}

async function loginUser(username, password) {
    const users = await fetchUsers();
    return users.find(u => u.username === username && u.password === password) || null;
}

async function userExists(username) {
    const users = await fetchUsers();
    return users.some(u => u.username === username);
}

// ========== РАБОТА С ПРОЕКТАМИ ==========
async function fetchProjects() {
    try {
        const response = await fetch(PROJECTS_API);
        if (!response.ok) throw new Error('Ошибка загрузки проектов');
        return await response.json();
    } catch (error) {
        console.error('Ошибка fetchProjects:', error);
        return [];
    }
}

async function addProject(projectData) {
    try {
        const response = await fetch(PROJECTS_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData)
        });
        if (!response.ok) throw new Error('Ошибка добавления проекта');
        return await response.json();
    } catch (error) {
        console.error('Ошибка addProject:', error);
        return null;
    }
}

async function updateProject(projectId, projectData) {
    try {
        const response = await fetch(`${PROJECTS_API}/${projectId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData)
        });
        if (!response.ok) throw new Error('Ошибка обновления проекта');
        return await response.json();
    } catch (error) {
        console.error('Ошибка updateProject:', error);
        return null;
    }
}

async function deleteProject(projectId) {
    try {
        const response = await fetch(`${PROJECTS_API}/${projectId}`, { method: 'DELETE' });
        return response.ok;
    } catch (error) {
        console.error('Ошибка deleteProject:', error);
        return false;
    }
}

// ========== ФУНКЦИИ UI ==========
function showNotification(message, isError = false) {
    document.querySelectorAll('.global-notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = 'global-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${isError ? '#dc3545' : '#28a745'};
        color: #fff;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10001;
        font-size: 14px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        font-family: 'Manrope', sans-serif;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function getRoleName(role) {
    switch(role) {
        case 'admin': return 'Администратор';
        case 'designer': return 'Дизайнер';
        default: return 'Пользователь';
    }
}

// ========== ОБНОВЛЕНИЕ UI НА ВСЕХ СТРАНИЦАХ ==========
function updateAuthUI() {
    const authButtons = document.querySelector('.auth-buttons');
    const userInfo = document.querySelector('.user-info');
    
    if (window.currentUser) {
        if (userInfo) {
            userInfo.innerHTML = `
                <span class="user-name">${window.currentUser.username}</span>
                <span class="user-role">(${getRoleName(window.currentUser.role)})</span>
                <button class="logout-btn" id="globalLogoutBtn">Выйти</button>
            `;
            userInfo.style.display = 'flex';
            
            const logoutBtn = document.getElementById('globalLogoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    localStorage.removeItem('currentUser');
                    window.currentUser = null;
                    updateAuthUI();
                    showNotification('Вы вышли из системы');
                });
            }
        }
        if (authButtons) authButtons.style.display = 'none';
        
        if (window.currentUser.role === 'admin') {
            showGlobalAdminPanel();
        } else if (window.currentUser.role === 'designer') {
            showGlobalDesignerPanel();
        }
    } else {
        if (userInfo) userInfo.style.display = 'none';
        if (authButtons) authButtons.style.display = 'flex';
        hideGlobalAdminPanel();
        hideGlobalDesignerPanel();
    }
}

// ========== МОДАЛЬНЫЕ ОКНА ==========
function openGlobalModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeAllGlobalModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = '';
}

function initGlobalModals() {
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
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
        if (e.key === 'Escape') closeAllGlobalModals();
    });
}

// ========== ЛОГИН ==========
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername')?.value.trim();
        const password = document.getElementById('loginPassword')?.value;
        
        if (username && password) {
            const user = await loginUser(username, password);
            
            if (user) {
                window.currentUser = {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    createdAt: user.createdAt
                };
                localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
                updateAuthUI();
                closeAllGlobalModals();
                document.getElementById('loginUsername').value = '';
                document.getElementById('loginPassword').value = '';
                showNotification(`Добро пожаловать, ${username}!`);
            } else {
                showNotification('Неверный логин или пароль', true);
            }
        } else {
            showNotification('Заполните все поля', true);
        }
    });
}

// ========== РЕГИСТРАЦИЯ ==========
function initRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;
    
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
            
            const exists = await userExists(username);
            if (exists) {
                showNotification('Пользователь уже существует', true);
                return;
            }
            
            const newUser = {
                username: username,
                password: password,
                role: 'user',
                createdAt: new Date().toISOString()
            };
            
            const addedUser = await addUser(newUser);
            
            if (addedUser) {
                showNotification('Регистрация успешна! Теперь войдите в систему');
                closeAllGlobalModals();
                document.getElementById('regUsername').value = '';
                document.getElementById('regPassword').value = '';
                openGlobalModal('loginModal');
            } else {
                showNotification('Ошибка при регистрации', true);
            }
        } else {
            showNotification('Заполните все поля', true);
        }
    });
}

// ========== АДМИН ПАНЕЛЬ (ПОЛНЫЙ ДОСТУП: УДАЛЕНИЕ + РЕДАКТИРОВАНИЕ) ==========
let globalAdminPanel = null;

async function showGlobalAdminPanel() {
    if (globalAdminPanel) {
        globalAdminPanel.classList.add('active');
        await updateGlobalUsersList();
        return;
    }
    
    globalAdminPanel = document.createElement('div');
    globalAdminPanel.id = 'globalAdminPanel';
    globalAdminPanel.className = 'admin-panel';
    globalAdminPanel.innerHTML = `
        <div class="designer-panel-header">
            <h3>👑 Панель Администратора</h3>
            <button id="closeGlobalAdminPanel">✖</button>
        </div>
        <div class="designer-panel-content">
            <div class="designer-section">
                <h4>👥 Управление пользователями</h4>
                <ul id="globalUsersList" style="max-height: 200px; overflow-y: auto;"></ul>
                <div style="margin-top: 10px;">
                    <input type="text" id="globalNewUsername" placeholder="Логин" style="width: 100%; margin-bottom: 5px;">
                    <input type="password" id="globalNewPassword" placeholder="Пароль" style="width: 100%; margin-bottom: 5px;">
                    <select id="globalNewUserRole" style="width: 100%; margin-bottom: 5px;">
                        <option value="user">Пользователь</option>
                        <option value="designer">Дизайнер</option>
                        <option value="admin">Администратор</option>
                    </select>
                    <button id="globalAddUserBtn">➕ Добавить пользователя</button>
                </div>
            </div>
            <div class="designer-section">
                <h4>📋 Управление проектами (полный доступ)</h4>
                <button id="globalAdminProjectsBtn">Управление проектами</button>
                <button id="globalAdminAddProjectBtn">➕ Добавить проект</button>
            </div>
            <div class="designer-section">
                <h4>🎨 Редактирование контента</h4>
                <button id="globalAdminEditContentBtn">✏️ Режим редактирования</button>
                <button id="globalAdminSaveBtn">💾 Сохранить изменения</button>
                <button id="globalAdminResetBtn">🔄 Сбросить</button>
            </div>
            <div class="designer-section">
                <h4>🎨 Настройка цветов</h4>
                <input type="color" id="globalAdminColorPicker" value="#EFA35A">
                <button id="globalAdminApplyColorBtn">Применить цвет</button>
            </div>
        </div>
    `;
    document.body.appendChild(globalAdminPanel);
    
    document.getElementById('closeGlobalAdminPanel')?.addEventListener('click', () => {
        globalAdminPanel.classList.remove('active');
    });
    
    // Добавление пользователя
    document.getElementById('globalAddUserBtn')?.addEventListener('click', async () => {
        const username = document.getElementById('globalNewUsername')?.value.trim();
        const password = document.getElementById('globalNewPassword')?.value;
        const role = document.getElementById('globalNewUserRole')?.value;
        
        if (username && password) {
            const exists = await userExists(username);
            if (exists) {
                showNotification('Пользователь уже существует', true);
                return;
            }
            
            const newUser = {
                username: username,
                password: password,
                role: role,
                createdAt: new Date().toISOString()
            };
            
            const added = await addUser(newUser);
            if (added) {
                await updateGlobalUsersList();
                showNotification(`Пользователь ${username} добавлен`);
                document.getElementById('globalNewUsername').value = '';
                document.getElementById('globalNewPassword').value = '';
            }
        } else {
            showNotification('Заполните логин и пароль', true);
        }
    });
    
    // Управление проектами (админ)
    document.getElementById('globalAdminProjectsBtn')?.addEventListener('click', () => {
        showProjectsManager(true); // true = режим админа (можно удалять)
    });
    
    document.getElementById('globalAdminAddProjectBtn')?.addEventListener('click', () => {
        showAddProjectForm(true);
    });
    
    // Редактирование контента
    let editMode = false;
    document.getElementById('globalAdminEditContentBtn')?.addEventListener('click', () => {
        editMode = !editMode;
        const btn = document.getElementById('globalAdminEditContentBtn');
        
        if (editMode) {
            document.body.style.cursor = 'text';
            btn.style.background = '#28a745';
            btn.textContent = '✅ Выйти из режима';
            showNotification('Режим редактирования включен');
            
            const editableElements = document.querySelectorAll('h1, h2, h3, p, .hero-description, .about-company-text, .architecture-description, .project-name');
            editableElements.forEach(el => {
                el.setAttribute('contenteditable', 'true');
                el.style.outline = '2px dashed #EFA35A';
            });
        } else {
            document.body.style.cursor = '';
            btn.style.background = '';
            btn.textContent = '✏️ Режим редактирования';
            showNotification('Режим редактирования выключен');
            
            const editableElements = document.querySelectorAll('[contenteditable="true"]');
            editableElements.forEach(el => {
                el.removeAttribute('contenteditable');
                el.style.outline = '';
            });
        }
    });
    
    // Сохранение
    document.getElementById('globalAdminSaveBtn')?.addEventListener('click', () => {
        const editedContent = {};
        const editableElements = document.querySelectorAll('[contenteditable="true"]');
        editableElements.forEach((el, index) => {
            editedContent[index] = el.innerHTML;
        });
        localStorage.setItem('adminEdits', JSON.stringify(editedContent));
        showNotification('Изменения сохранены!');
    });
    
    // Сброс
    document.getElementById('globalAdminResetBtn')?.addEventListener('click', () => {
        localStorage.removeItem('adminEdits');
        location.reload();
    });
    
    // Цвет
    const colorPicker = document.getElementById('globalAdminColorPicker');
    document.getElementById('globalAdminApplyColorBtn')?.addEventListener('click', () => {
        const newColor = colorPicker.value;
        document.documentElement.style.setProperty('--accent', newColor);
        document.documentElement.style.setProperty('--accent-dark', newColor);
        localStorage.setItem('customAccentColor', newColor);
        showNotification(`Цвет изменен на ${newColor}`);
    });
    
    const savedColor = localStorage.getItem('customAccentColor');
    if (savedColor && colorPicker) {
        colorPicker.value = savedColor;
        document.documentElement.style.setProperty('--accent', savedColor);
    }
    
    globalAdminPanel.classList.add('active');
    await updateGlobalUsersList();
}

async function updateGlobalUsersList() {
    const usersList = document.getElementById('globalUsersList');
    if (!usersList) return;
    
    const users = await fetchUsers();
    
    usersList.innerHTML = users.map(user => `
        <li style="display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px solid #eee;">
            <strong>${user.username}</strong> - ${getRoleName(user.role)}
            <div>
                <button class="edit-user-btn" data-id="${user.id}" data-username="${user.username}" data-role="${user.role}" style="background: #ffc107; border: none; border-radius: 4px; padding: 2px 8px; margin-right: 5px; cursor: pointer;">✏️</button>
                <button class="delete-user-btn" data-id="${user.id}" style="background: #dc3545; border: none; border-radius: 4px; padding: 2px 8px; cursor: pointer;">❌</button>
            </div>
        </li>
    `).join('');
    
    // Редактирование пользователя
    document.querySelectorAll('.edit-user-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const userId = parseInt(btn.dataset.id);
            const oldUsername = btn.dataset.username;
            const oldRole = btn.dataset.role;
            
            const newUsername = prompt('Новый логин:', oldUsername);
            const newRole = prompt('Новая роль (user/designer/admin):', oldRole);
            
            if (newUsername && newRole && ['user', 'designer', 'admin'].includes(newRole)) {
                const users = await fetchUsers();
                const user = users.find(u => u.id === userId);
                if (user) {
                    user.username = newUsername;
                    user.role = newRole;
                    const updated = await updateUser(userId, user);
                    if (updated) {
                        await updateGlobalUsersList();
                        showNotification(`Пользователь обновлен`);
                    }
                }
            }
        });
    });
    
    // Удаление пользователя
    document.querySelectorAll('.delete-user-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const userId = parseInt(btn.dataset.id);
            
            if (window.currentUser && userId === window.currentUser.id) {
                showNotification('Нельзя удалить самого себя', true);
                return;
            }
            
            if (confirm('Удалить пользователя?')) {
                const deleted = await deleteUser(userId);
                if (deleted) {
                    await updateGlobalUsersList();
                    showNotification('Пользователь удален');
                }
            }
        });
    });
}

function hideGlobalAdminPanel() {
    if (globalAdminPanel) {
        globalAdminPanel.classList.remove('active');
    }
}

// ========== ПАНЕЛЬ ДИЗАЙНЕРА (ТОЛЬКО ДОБАВЛЕНИЕ И РЕДАКТИРОВАНИЕ, БЕЗ УДАЛЕНИЯ) ==========
let globalDesignerPanel = null;

function showGlobalDesignerPanel() {
    if (globalDesignerPanel) {
        globalDesignerPanel.classList.add('active');
        return;
    }
    
    globalDesignerPanel = document.createElement('div');
    globalDesignerPanel.id = 'globalDesignerPanel';
    globalDesignerPanel.className = 'designer-panel';
    globalDesignerPanel.innerHTML = `
        <div class="designer-panel-header">
            <h3>🎨 Панель Дизайнера</h3>
            <button id="closeGlobalDesignerPanel">✖</button>
        </div>
        <div class="designer-panel-content">
            <div class="designer-section">
                <h4>📋 Управление проектами</h4>
                <p style="font-size: 12px; color: #666;">Вы можете просматривать и добавлять проекты</p>
                <button id="globalDesignerProjectsBtn">📋 Просмотр проектов</button>
                <button id="globalDesignerAddProjectBtn">➕ Добавить проект</button>
            </div>
            <div class="designer-section">
                <h4>✏️ Редактирование контента</h4>
                <button id="globalDesignerEditContentBtn">✏️ Режим редактирования</button>
                <button id="globalDesignerSaveBtn">💾 Сохранить изменения</button>
            </div>
            <div class="designer-section">
                <h4>🎨 Настройка цветов</h4>
                <input type="color" id="globalDesignerColorPicker" value="#EFA35A">
                <button id="globalDesignerApplyColorBtn">Применить цвет</button>
            </div>
        </div>
    `;
    document.body.appendChild(globalDesignerPanel);
    
    document.getElementById('closeGlobalDesignerPanel')?.addEventListener('click', () => {
        globalDesignerPanel.classList.remove('active');
    });
    
    // Просмотр проектов (только просмотр, без удаления)
    document.getElementById('globalDesignerProjectsBtn')?.addEventListener('click', () => {
        showProjectsManager(false); // false = режим только просмотр/добавление
    });
    
    // Добавление проекта
    document.getElementById('globalDesignerAddProjectBtn')?.addEventListener('click', () => {
        showAddProjectForm(false);
    });
    
    // Режим редактирования
    let editMode = false;
    document.getElementById('globalDesignerEditContentBtn')?.addEventListener('click', () => {
        editMode = !editMode;
        const btn = document.getElementById('globalDesignerEditContentBtn');
        
        if (editMode) {
            document.body.style.cursor = 'text';
            btn.style.background = '#28a745';
            btn.textContent = '✅ Выйти из режима';
            showNotification('Режим редактирования включен');
            
            const editableElements = document.querySelectorAll('h1, h2, h3, p, .hero-description, .about-company-text');
            editableElements.forEach(el => {
                el.setAttribute('contenteditable', 'true');
                el.style.outline = '2px dashed #EFA35A';
            });
        } else {
            document.body.style.cursor = '';
            btn.style.background = '';
            btn.textContent = '✏️ Режим редактирования';
            showNotification('Режим редактирования выключен');
            
            const editableElements = document.querySelectorAll('[contenteditable="true"]');
            editableElements.forEach(el => {
                el.removeAttribute('contenteditable');
                el.style.outline = '';
            });
        }
    });
    
    // Сохранение
    document.getElementById('globalDesignerSaveBtn')?.addEventListener('click', () => {
        const editedContent = {};
        const editableElements = document.querySelectorAll('[contenteditable="true"]');
        editableElements.forEach((el, index) => {
            editedContent[index] = el.innerHTML;
        });
        localStorage.setItem('designerEdits', JSON.stringify(editedContent));
        showNotification('Изменения сохранены!');
    });
    
    // Цвет
    const colorPicker = document.getElementById('globalDesignerColorPicker');
    document.getElementById('globalDesignerApplyColorBtn')?.addEventListener('click', () => {
        const newColor = colorPicker.value;
        document.documentElement.style.setProperty('--accent', newColor);
        document.documentElement.style.setProperty('--accent-dark', newColor);
        localStorage.setItem('customAccentColor', newColor);
        showNotification(`Цвет изменен на ${newColor}`);
    });
    
    const savedColor = localStorage.getItem('customAccentColor');
    if (savedColor && colorPicker) {
        colorPicker.value = savedColor;
        document.documentElement.style.setProperty('--accent', savedColor);
    }
    
    globalDesignerPanel.classList.add('active');
}

// Менеджер проектов (с разделением прав)
async function showProjectsManager(isAdmin = false) {
    const projects = await fetchProjects();
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-container" style="max-width: 600px; max-height: 80vh; overflow-y: auto;">
            <div class="modal-header">
                <h3>📋 Управление проектами ${isAdmin ? '(Админ)' : '(Дизайнер)'}</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
            </div>
            <div class="admin-section">
                <h4>Существующие проекты</h4>
                <ul id="projectsListModal" style="list-style: none; max-height: 300px; overflow-y: auto;">
                    ${projects.map(project => `
                        <li style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee;">
                            <div>
                                <strong>${project.name}</strong><br>
                                <small>${project.location || ''}</small>
                            </div>
                            <div>
                                ${isAdmin ? `<button class="edit-project-btn" data-id="${project.id}" style="background: #ffc107; border: none; border-radius: 4px; padding: 4px 10px; margin-right: 5px; cursor: pointer;">✏️</button>` : ''}
                                ${isAdmin ? `<button class="delete-project-btn" data-id="${project.id}" style="background: #dc3545; border: none; border-radius: 4px; padding: 4px 10px; cursor: pointer;">❌</button>` : ''}
                                ${!isAdmin ? `<span style="color: #28a745;">✓ (только просмотр)</span>` : ''}
                            </div>
                        </li>
                    `).join('')}
                </ul>
                ${projects.length === 0 ? '<p style="text-align: center; color: #999;">Нет проектов</p>' : ''}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    if (isAdmin) {
        // Редактирование проекта (только для админа)
        document.querySelectorAll('.edit-project-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const projectId = parseInt(btn.dataset.id);
                const newName = prompt('Новое название проекта:');
                if (newName) {
                    const project = projects.find(p => p.id === projectId);
                    if (project) {
                        project.name = newName;
                        await updateProject(projectId, project);
                        showNotification('Проект обновлен');
                        modal.remove();
                        showProjectsManager(true);
                    }
                }
            });
        });
        
        // Удаление проекта (только для админа)
        document.querySelectorAll('.delete-project-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const projectId = parseInt(btn.dataset.id);
                if (confirm('Удалить проект?')) {
                    await deleteProject(projectId);
                    showNotification('Проект удален');
                    modal.remove();
                    showProjectsManager(true);
                }
            });
        });
    }
}

async function showAddProjectForm(isAdmin = false) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-container">
            <div class="modal-header">
                <h3>➕ Добавить проект</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
            </div>
            <div class="admin-section">
                <div class="form-group">
                    <label>Название проекта</label>
                    <input type="text" id="newProjectName" placeholder="Например: Изумрудный Village">
                </div>
                <div class="form-group">
                    <label>Расположение</label>
                    <input type="text" id="newProjectLocation" placeholder="Например: 8 минут от метро">
                </div>
                <div class="form-group">
                    <label>Описание (необязательно)</label>
                    <textarea id="newProjectDesc" rows="2" placeholder="Краткое описание..."></textarea>
                </div>
                <button id="submitNewProjectBtn" style="width: 100%; padding: 10px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">➕ Добавить проект</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    document.getElementById('submitNewProjectBtn')?.addEventListener('click', async () => {
        const name = document.getElementById('newProjectName')?.value.trim();
        const location = document.getElementById('newProjectLocation')?.value.trim();
        const description = document.getElementById('newProjectDesc')?.value;
        
        if (name) {
            const newProject = {
                name: name,
                location: location,
                description: description,
                createdAt: new Date().toISOString(),
                createdBy: window.currentUser?.username
            };
            
            const added = await addProject(newProject);
            if (added) {
                showNotification(`Проект "${name}" добавлен`);
                modal.remove();
            } else {
                showNotification('Ошибка при добавлении проекта', true);
            }
        } else {
            showNotification('Введите название проекта', true);
        }
    });
}

function hideGlobalDesignerPanel() {
    if (globalDesignerPanel) {
        globalDesignerPanel.classList.remove('active');
    }
}

// ========== КНОПКИ ВХОДА/РЕГИСТРАЦИИ ==========
function initAuthButtons() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openGlobalModal('loginModal');
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openGlobalModal('registerModal');
        });
    }
}

// ========== ПРОВЕРКА ПОДКЛЮЧЕНИЯ ==========
async function checkServerConnection() {
    try {
        const response = await fetch(`${API_URL}/users?_limit=1`);
        if (response.ok) {
            console.log('✅ JSON Server подключен');
        } else {
            console.warn('⚠️ JSON Server не отвечает');
        }
    } catch (error) {
        console.warn('⚠️ JSON Server не запущен! Запустите: json-server --watch db.json --port 3000');
    }
}





















// ========== ОБНОВЛЕНИЕ UI НА ВСЕХ СТРАНИЦАХ ==========
function updateAuthUI() {
    const authButtons = document.querySelector('.auth-buttons');
    const userInfo = document.querySelector('.user-info');
    
    if (window.currentUser) {
        if (userInfo) {
            userInfo.innerHTML = `
                <span class="user-name">${window.currentUser.username}</span>
                <span class="user-role">(${getRoleName(window.currentUser.role)})</span>
                <button class="logout-btn" id="globalLogoutBtn">Выйти</button>
            `;
            userInfo.style.display = 'flex';
            
            const logoutBtn = document.getElementById('globalLogoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    localStorage.removeItem('currentUser');
                    window.currentUser = null;
                    updateAuthUI();
                    showNotification('Вы вышли из системы');
                    // Убираем иконки корзины/избранного
                    const icons = document.querySelector('.cart-favorite-icons');
                    if (icons) icons.remove();
                });
            }
        }
        if (authButtons) authButtons.style.display = 'none';
        
        // Добавляем иконки корзины и избранного
        addCartAndFavoriteIcons();
        updateCartFavoriteCounts();
        
        // Добавляем кнопки на карточки проектов
        setTimeout(() => addAddToCartButtons(), 500);
        
        if (window.currentUser.role === 'admin') {
            showGlobalAdminPanel();
        } else if (window.currentUser.role === 'designer') {
            showGlobalDesignerPanel();
        }
    } else {
        if (userInfo) userInfo.style.display = 'none';
        if (authButtons) authButtons.style.display = 'flex';
        hideGlobalAdminPanel();
        hideGlobalDesignerPanel();
        
        // Убираем иконки если нет пользователя
        const icons = document.querySelector('.cart-favorite-icons');
        if (icons) icons.remove();
    }
}
// ========== ИНИЦИАЛИЗАЦИЯ ==========
function initAuth() {
    initGlobalModals();
    initLoginForm();
    initRegisterForm();
    initAuthButtons();
    updateAuthUI();
    checkServerConnection();
    
    // Добавляем иконки, если пользователь уже авторизован
    if (window.currentUser) {
        setTimeout(() => {
            addCartAndFavoriteIcons();
            updateCartFavoriteCounts();
            addAddToCartButtons();
        }, 500);
    }
}