(function() {
    const form = document.getElementById('costForm');
    const nameInput = document.getElementById('nameInput');
    const phoneInput = document.getElementById('phoneInput');
    const emailInput = document.getElementById('emailInput');
    const consentCheck = document.getElementById('consentCheck');
    const submitBtn = document.getElementById('submitBtn');

    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');
    const consentError = document.getElementById('consentError');

    function setInputErrorStyle(input, isError) {
        if (isError) {
            input.classList.add('error-input');
        } else {
            input.classList.remove('error-input');
        }
    }

    function validateName(name) {
        const trimmed = name.trim();
        if (trimmed === '') {
            return { isValid: false, message: 'Пожалуйста, укажите ваше имя' };
        }
        if (trimmed.length < 2) {
            return { isValid: false, message: 'Имя должно содержать не менее 2 символов' };
        }
        const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/;
        if (!nameRegex.test(trimmed)) {
            return { isValid: false, message: 'Имя может содержать только буквы, пробелы и дефис' };
        }
        return { isValid: true, message: '' };
    }

    function validatePhone(phone) {
        const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
        if (cleaned === '') {
            return { isValid: false, message: 'Введите номер телефона' };
        }
        let digits = cleaned;
        if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
            if (/^[78]\d{10}$/.test(digits)) {
                return { isValid: true, message: '' };
            }
        }
        if (digits.length === 10 && /^9\d{9}$/.test(digits)) {
            return { isValid: true, message: '' };
        }
        if (digits.length === 11 && digits[0] === '7' && /^\d{11}$/.test(digits)) {
            return { isValid: true, message: '' };
        }
        return { isValid: false, message: 'Введите корректный номер телефона (например, +7 123 456-78-90)' };
    }

    function validateEmail(email) {
        const trimmed = email.trim();
        if (trimmed === '') {
            return { isValid: false, message: 'Укажите ваш e-mail' };
        }
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (!emailRegex.test(trimmed)) {
            return { isValid: false, message: 'Введите корректный email (пример: name@domain.ru)' };
        }
        return { isValid: true, message: '' };
    }

    function validateConsent(checked) {
        if (!checked) {
            return { isValid: false, message: 'Необходимо согласие на обработку персональных данных' };
        }
        return { isValid: true, message: '' };
    }

    function validateForm() {
        let isFormValid = true;

        const nameValidation = validateName(nameInput.value);
        if (!nameValidation.isValid) {
            nameError.textContent = nameValidation.message;
            setInputErrorStyle(nameInput, true);
            isFormValid = false;
        } else {
            nameError.textContent = '';
            setInputErrorStyle(nameInput, false);
        }

        const phoneValidation = validatePhone(phoneInput.value);
        if (!phoneValidation.isValid) {
            phoneError.textContent = phoneValidation.message;
            setInputErrorStyle(phoneInput, true);
            isFormValid = false;
        } else {
            phoneError.textContent = '';
            setInputErrorStyle(phoneInput, false);
        }

        const emailValidation = validateEmail(emailInput.value);
        if (!emailValidation.isValid) {
            emailError.textContent = emailValidation.message;
            setInputErrorStyle(emailInput, true);
            isFormValid = false;
        } else {
            emailError.textContent = '';
            setInputErrorStyle(emailInput, false);
        }

        const consentValidation = validateConsent(consentCheck.checked);
        if (!consentValidation.isValid) {
            consentError.textContent = consentValidation.message;
            isFormValid = false;
        } else {
            consentError.textContent = '';
        }

        return isFormValid;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const isValid = validateForm();

        if (isValid) {
            const originalText = submitBtn.innerText;
            submitBtn.disabled = true;
            submitBtn.innerText = 'Отправка...';
            submitBtn.style.opacity = '0.8';

            const formData = {
                name: nameInput.value.trim(),
                phone: phoneInput.value.trim(),
                email: emailInput.value.trim(),
                consent: true,
                timestamp: new Date().toISOString()
            };

            try {
                await mockApiSend(formData);
                showSuccessMessage();
                form.reset();
                resetFormStyles();
            } catch (error) {
                console.error('Ошибка отправки:', error);
                showErrorMessage('Не удалось отправить заявку. Попробуйте позже.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = '1';
            }
        } else {
            const firstErrorField = document.querySelector('.error-input');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstErrorField.focus();
            } else if (consentError.textContent !== '') {
                consentError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    function mockApiSend(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const isSuccess = Math.random() > 0.05;
                if (isSuccess) {
                    console.log('Заявка отправлена (симуляция):', data);
                    resolve({ ok: true, message: 'Заявка принята' });
                } else {
                    reject(new Error('Сервер временно недоступен'));
                }
            }, 800);
        });
    }

    function showSuccessMessage() {
        const toast = document.createElement('div');
        toast.textContent = '✓ Заявка успешно отправлена! Мы свяжемся с вами.';
        toast.style.position = 'fixed';
        toast.style.bottom = '24px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = '#000000';
        toast.style.color = 'white';
        toast.style.padding = '14px 24px';
        toast.style.borderRadius = '0px';
        toast.style.fontWeight = '600';
        toast.style.fontSize = '15px';
        toast.style.fontFamily = "'Inter', sans-serif";
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        toast.style.zIndex = '1000';
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 3500);
    }

    function showErrorMessage(text) {
        const toast = document.createElement('div');
        toast.textContent = '⚠️ ' + text;
        toast.style.position = 'fixed';
        toast.style.bottom = '24px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = '#e53e3e';
        toast.style.color = 'white';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '0px';
        toast.style.fontWeight = '500';
        toast.style.fontFamily = "'Inter', sans-serif";
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        toast.style.zIndex = '1000';
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    function resetFormStyles() {
        setInputErrorStyle(nameInput, false);
        setInputErrorStyle(phoneInput, false);
        setInputErrorStyle(emailInput, false);
        nameError.textContent = '';
        phoneError.textContent = '';
        emailError.textContent = '';
        consentError.textContent = '';
        consentCheck.checked = false;
    }

    nameInput.addEventListener('blur', () => {
        const res = validateName(nameInput.value);
        if (!res.isValid) {
            nameError.textContent = res.message;
            setInputErrorStyle(nameInput, true);
        } else {
            nameError.textContent = '';
            setInputErrorStyle(nameInput, false);
        }
    });

    phoneInput.addEventListener('blur', () => {
        const res = validatePhone(phoneInput.value);
        if (!res.isValid) {
            phoneError.textContent = res.message;
            setInputErrorStyle(phoneInput, true);
        } else {
            phoneError.textContent = '';
            setInputErrorStyle(phoneInput, false);
        }
    });

    emailInput.addEventListener('blur', () => {
        const res = validateEmail(emailInput.value);
        if (!res.isValid) {
            emailError.textContent = res.message;
            setInputErrorStyle(emailInput, true);
        } else {
            emailError.textContent = '';
            setInputErrorStyle(emailInput, false);
        }
    });

    consentCheck.addEventListener('change', () => {
        if (consentCheck.checked) {
            consentError.textContent = '';
        }
    });
})();