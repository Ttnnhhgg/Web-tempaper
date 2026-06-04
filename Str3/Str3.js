// Str3.js - Интерактивность шапки

document.addEventListener('DOMContentLoaded', function() {
    // ----- 1. Модальное окно для кнопки "Заказать звонок" -----
    const modal = document.getElementById('callbackModal');
    const callbackBtn = document.getElementById('callbackBtn');
    const closeModalSpan = document.querySelector('.close-modal');
    const callbackForm = document.getElementById('callbackForm');
    const phoneInput = document.getElementById('phoneInput');

    function openModal() {
        if (modal) {
            modal.style.display = 'flex';
            if (phoneInput) phoneInput.value = '';
            setTimeout(() => {
                if (phoneInput) phoneInput.focus();
            }, 100);
        }
    }

    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    if (callbackBtn) {
        callbackBtn.addEventListener('click', openModal);
    }

    if (closeModalSpan) {
        closeModalSpan.addEventListener('click', closeModal);
    }

    window.addEventListener('click', function(event) {
        if (modal && event.target === modal) {
            closeModal();
        }
    });

    if (callbackForm) {
        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let phoneVal = phoneInput ? phoneInput.value.trim() : '';
            if (!phoneVal) {
                alert('Пожалуйста, введите номер телефона');
                return;
            }
            const digitsOnly = phoneVal.replace(/[^+\d]/g, '');
            if (digitsOnly.length < 5) {
                alert('Введите корректный номер телефона');
                return;
            }
            alert(`Спасибо! Мы перезвоним по номеру ${phoneVal} в ближайшее время.`);
            closeModal();
            if (phoneInput) phoneInput.value = '';
        });
    }

    // ----- 2. Дропдауны для пунктов меню -----
    let currentActiveDropdown = null;
    
    const dropdownContentMap = {
        projects: {
            title: 'Наши проекты',
            items: ['Жилой комплекс "Солнечный"', 'Коттеджный посёлок "Лесной"', 'Бизнес-центр "Премьер"', 'Проект "Новое поколение"']
        },
        houses: {
            title: 'Типы домов',
            items: ['Кирпичные дома', 'Дома из бруса', 'Каркасные дома', 'Таунхаусы', 'Коттеджи премиум']
        },
        mortgage: {
            title: 'Ипотечные программы',
            items: ['Семейная ипотека', 'IT-ипотека', 'Военная ипотека', 'Льготная ставка 6%', 'Рефинансирование']
        },
        about: {
            title: 'О компании',
            items: ['История', 'Вакансии', 'Отзывы клиентов', 'Сертификаты', 'Партнёры']
        }
    };
    
    function removeActiveDropdown() {
        if (currentActiveDropdown) {
            currentActiveDropdown.remove();
            currentActiveDropdown = null;
        }
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active-dropdown');
        });
    }
    
    function showDropdown(triggerItem, dropdownKey) {
        removeActiveDropdown();
        
        const content = dropdownContentMap[dropdownKey];
        if (!content) return;
        
        const parentLi = triggerItem.closest('.nav-item');
        if (parentLi) parentLi.classList.add('active-dropdown');
        
        const dropdownDiv = document.createElement('div');
        dropdownDiv.className = 'custom-dropdown';
        dropdownDiv.style.position = 'absolute';
        dropdownDiv.style.backgroundColor = '#fff';
        dropdownDiv.style.border = '1px solid #e0e0e0';
        dropdownDiv.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
        dropdownDiv.style.padding = '12px 0';
        dropdownDiv.style.minWidth = '200px';
        dropdownDiv.style.zIndex = '150';
        dropdownDiv.style.top = '100%';
        dropdownDiv.style.left = '0';
        dropdownDiv.style.marginTop = '12px';
        dropdownDiv.style.opacity = '0';
        dropdownDiv.style.transform = 'translateY(-8px)';
        dropdownDiv.style.transition = 'opacity 0.2s, transform 0.2s';
        
        const titleSpan = document.createElement('div');
        titleSpan.textContent = content.title;
        titleSpan.style.fontWeight = 'bold';
        titleSpan.style.padding = '8px 20px';
        titleSpan.style.borderBottom = '1px solid #eceff3';
        titleSpan.style.color = '#1e2a36';
        titleSpan.style.fontSize = '14px';
        dropdownDiv.appendChild(titleSpan);
        
        const list = document.createElement('ul');
        list.style.listStyle = 'none';
        list.style.margin = '0';
        list.style.padding = '8px 0 0 0';
        
        content.items.forEach(itemText => {
            const li = document.createElement('li');
            li.style.padding = '8px 20px';
            li.style.cursor = 'pointer';
            li.style.fontSize = '14px';
            li.style.color = '#2c3e4e';
            li.style.transition = 'background 0.1s';
            li.textContent = itemText;
            li.addEventListener('mouseenter', () => {
                li.style.backgroundColor = '#fdf8e7';
            });
            li.addEventListener('mouseleave', () => {
                li.style.backgroundColor = 'transparent';
            });
            li.addEventListener('click', (e) => {
                e.stopPropagation();
                alert(`Вы выбрали: ${itemText}`);
                removeActiveDropdown();
            });
            list.appendChild(li);
        });
        dropdownDiv.appendChild(list);
        
        const rect = triggerItem.getBoundingClientRect();
        const headerContainer = document.querySelector('.main-header');
        if (headerContainer && getComputedStyle(headerContainer).position !== 'relative') {
            headerContainer.style.position = 'relative';
        }
        const relativeTop = rect.bottom - headerContainer.getBoundingClientRect().top;
        dropdownDiv.style.top = `${relativeTop + 5}px`;
        dropdownDiv.style.left = `${rect.left - headerContainer.getBoundingClientRect().left}px`;
        headerContainer.appendChild(dropdownDiv);
        
        currentActiveDropdown = dropdownDiv;
        setTimeout(() => {
            if (dropdownDiv) {
                dropdownDiv.style.opacity = '1';
                dropdownDiv.style.transform = 'translateY(0)';
            }
        }, 5);
        
        function handleOutsideClick(e) {
            if (!dropdownDiv.contains(e.target) && !triggerItem.contains(e.target)) {
                removeActiveDropdown();
                document.removeEventListener('click', handleOutsideClick);
            }
        }
        setTimeout(() => {
            document.addEventListener('click', handleOutsideClick);
        }, 10);
    }
    
    const dropdownTriggers = document.querySelectorAll('.nav-link[data-dropdown]');
    dropdownTriggers.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const dropdownKey = link.getAttribute('data-dropdown');
            if (dropdownKey) {
                const parentLi = link.closest('.nav-item');
                if (currentActiveDropdown && parentLi && parentLi.classList.contains('active-dropdown')) {
                    removeActiveDropdown();
                } else {
                    showDropdown(link, dropdownKey);
                }
            }
        });
    });
    
    const contactsLink = document.querySelector('.nav-item:last-child .nav-link');
    if (contactsLink && contactsLink.textContent.trim() === 'Контакты') {
        contactsLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Страница "Контакты"\nАдрес: г. Москва, ул. Строителей, д. 12\nТелефон: +7 (962) 555-25-25');
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentActiveDropdown) {
            removeActiveDropdown();
        }
    });
    
    window.addEventListener('resize', function() {
        if (currentActiveDropdown) {
            removeActiveDropdown();
        }
    });
    
    // ----- 3. Обработчик для кнопки "Читать статью" (блок СМИ) -----
    const mediaButton = document.querySelector('.media-button');
    if (mediaButton) {
        mediaButton.addEventListener('click', function() {
            alert('Переход на страницу со статьей "Бизнес Online"');
        });
    }
    
    // ----- 4. Обработчики для всех кнопок "Читать статью" в блоках новостей -----
    const allNewsButtons = document.querySelectorAll('.news-button');
    const newsTitles = [
        'Где лежат ключи от «рая»?',
        'На рынке новый тренд – свой дом в черте города',
        'На пути к расцвету субурбии: что ждет рынок ИЖС в 2021 году?',
        'Жилье для счастливой жизни: успех кроется в мелочах'
    ];
    
    allNewsButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            alert(`Переход на страницу со статьей "${newsTitles[index]}"`);
        });
    });
    
    // ----- 5. Обработка ошибок загрузки изображений -----
    const logoImg = document.querySelector('.header-logo-img');
    const phoneImg = document.querySelector('.phone-icon-img');
    const allNewsImages = document.querySelectorAll('.news-image');
    
    if (logoImg) {
        logoImg.onerror = function() {
            console.warn('Изображение im1.png не найдено. Убедитесь, что файл находится в той же директории.');
        };
    }
    if (phoneImg) {
        phoneImg.onerror = function() {
            console.warn('Изображение im2.png не найдено. Убедитесь, что файл находится в той же директории.');
        };
    }
    
    const imageNames = ['im3.png', 'im4.png', 'im5.png', 'im6.png'];
    allNewsImages.forEach((img, index) => {
        if (img) {
            img.onerror = function() {
                console.warn(`Изображение ${imageNames[index]} не найдено. Убедитесь, что файл находится в той же директории.`);
            };
        }
    });





        // ----- 6. Скролл вниз по клику на золотую стрелку -----
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });
    }
});