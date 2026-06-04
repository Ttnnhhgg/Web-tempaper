(function() {
    const orderButton = document.querySelector('.order-btn');
    const nameInput = document.querySelector('.input-field input[type="text"]');
    const phoneInput = document.querySelector('.input-field input[type="tel"]');
    const checkBox = document.querySelector('.checkbox-wrapper input');
    const closeBtn = document.querySelector('.close-icon');

    function showMessage(msg, isError = false) {
        let notification = document.querySelector('.toast-notify');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'toast-notify';
            notification.style.position = 'fixed';
            notification.style.bottom = '24px';
            notification.style.left = '50%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.backgroundColor = isError ? '#e11d48' : '#1e293b';
            notification.style.color = '#fff';
            notification.style.padding = '12px 24px';
            notification.style.borderRadius = '48px';
            notification.style.fontSize = '14px';
            notification.style.fontWeight = '500';
            notification.style.zIndex = '9999';
            notification.style.fontFamily = 'system-ui, sans-serif';
            notification.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.1)';
            document.body.appendChild(notification);
        }
        notification.textContent = msg;
        notification.style.backgroundColor = isError ? '#e11d48' : '#0f172a';
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2800);
    }

    function validateForm() {
        const nameVal = nameInput ? nameInput.value.trim() : '';
        const phoneVal = phoneInput ? phoneInput.value.trim() : '';
        if (!nameVal) {
            showMessage('Пожалуйста, укажите ваше имя', true);
            nameInput.focus();
            return false;
        }
        if (!phoneVal) {
            showMessage('Введите номер телефона для связи', true);
            phoneInput.focus();
            return false;
        }
        const phoneDigits = phoneVal.replace(/[\s+\-()]/g, '');
        if (!/\d/.test(phoneDigits) || phoneDigits.length < 5) {
            showMessage('Укажите корректный номер телефона', true);
            phoneInput.focus();
            return false;
        }
        if (!checkBox.checked) {
            showMessage('Необходимо согласие с политикой обработки персональных данных', true);
            return false;
        }
        return true;
    }

    if (orderButton) {
        orderButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (validateForm()) {
                showMessage('Спасибо! Менеджер перезвонит в течение 30 минут.');
                nameInput.value = '';
                phoneInput.value = '';
                checkBox.checked = false;
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const card = document.querySelector('.callback-card');
            if (card) {
                card.style.transition = 'opacity 0.2s ease';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 200);
            }
        });
    }
})();