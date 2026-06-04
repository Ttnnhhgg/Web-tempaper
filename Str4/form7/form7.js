document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('expertQuestionForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const consentCheckbox = document.getElementById('consentCheckbox');
    const submitBtn = document.getElementById('submitBtn');
    const closeFormBtn = document.getElementById('closeFormBtn');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const consentError = document.getElementById('consentError');

    const modal = document.getElementById('successModal');
    const closeModalBtn = document.querySelector('.modal-close');

    // Функция закрытия формы (возврат на предыдущую страницу или закрытие окна)
    function closeForm() {
        // Можно закрыть модальное окно или вернуться назад
        // В данном случае просто показываем сообщение и закрываем/возвращаем
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.close();
            // Если window.close не срабатывает, показываем сообщение
            alert('Вы можете закрыть вкладку браузера');
        }
    }

    // Обработчик кнопки закрытия
    if (closeFormBtn) {
        closeFormBtn.addEventListener('click', closeForm);
    }

    function clearFieldErrors() {
        nameInput.classList.remove('error-field');
        emailInput.classList.remove('error-field');
        messageInput.classList.remove('error-field');
        
        if (nameError) nameError.innerText = '';
        if (emailError) emailError.innerText = '';
        if (messageError) messageError.innerText = '';
        if (consentError) consentError.innerText = '';
    }

    function validateName(value) {
        const trimmed = value.trim();
        if (trimmed === '') {
            return { isValid: false, message: 'Пожалуйста, укажите ваше имя' };
        }
        if (trimmed.length < 2) {
            return { isValid: false, message: 'Имя должно содержать не менее 2 символов' };
        }
        return { isValid: true, message: '' };
    }

    function validateEmail(value) {
        const trimmed = value.trim();
        if (trimmed === '') {
            return { isValid: false, message: 'Укажите адрес электронной почты' };
        }
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (!emailRegex.test(trimmed)) {
            return { isValid: false, message: 'Введите корректный email' };
        }
        return { isValid: true, message: '' };
    }

    function validateMessage(value) {
        const trimmed = value.trim();
        if (trimmed === '') {
            return { isValid: false, message: 'Напишите текст вопроса' };
        }
        if (trimmed.length < 4) {
            return { isValid: false, message: 'Сообщение должно содержать минимум 4 символа' };
        }
        return { isValid: true, message: '' };
    }

    function validateConsent(checked) {
        if (!checked) {
            return { isValid: false, message: 'Необходимо согласие на обработку персональных данных' };
        }
        return { isValid: true, message: '' };
    }

    function displayErrors(errorsObj) {
        if (errorsObj.name) {
            nameInput.classList.add('error-field');
            nameError.innerText = errorsObj.name;
        } else {
            nameInput.classList.remove('error-field');
            nameError.innerText = '';
        }
        
        if (errorsObj.email) {
            emailInput.classList.add('error-field');
            emailError.innerText = errorsObj.email;
        } else {
            emailInput.classList.remove('error-field');
            emailError.innerText = '';
        }
        
        if (errorsObj.message) {
            messageInput.classList.add('error-field');
            messageError.innerText = errorsObj.message;
        } else {
            messageInput.classList.remove('error-field');
            messageError.innerText = '';
        }
        
        if (errorsObj.consent) {
            consentError.innerText = errorsObj.consent;
        } else {
            consentError.innerText = '';
        }
    }

    function validateForm() {
        const nameValidation = validateName(nameInput.value);
        const emailValidation = validateEmail(emailInput.value);
        const messageValidation = validateMessage(messageInput.value);
        const consentValidation = validateConsent(consentCheckbox.checked);
        
        const errors = {
            name: nameValidation.isValid ? '' : nameValidation.message,
            email: emailValidation.isValid ? '' : emailValidation.message,
            message: messageValidation.isValid ? '' : messageValidation.message,
            consent: consentValidation.isValid ? '' : consentValidation.message,
        };
        
        const isValid = nameValidation.isValid && emailValidation.isValid && messageValidation.isValid && consentValidation.isValid;
        
        return { isValid, errors };
    }

    function submitFormData(formDataObj) {
        console.log('Отправка формы:', formDataObj);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 300);
        });
    }

    function showSuccessModal() {
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
        
        clearFieldErrors();
        
        const { isValid, errors } = validateForm();
        
        if (!isValid) {
            displayErrors({
                name: errors.name,
                email: errors.email,
                message: errors.message,
                consent: errors.consent,
            });
            if (errors.consent) {
                consentCheckbox.closest('.checkbox-label')?.classList.add('shake-animation');
                setTimeout(() => {
                    consentCheckbox.closest('.checkbox-label')?.classList.remove('shake-animation');
                }, 500);
            }
            return;
        }
        
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            consent: consentCheckbox.checked,
            timestamp: new Date().toISOString()
        };
        
        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = 'Отправка...';
        
        try {
            await submitFormData(formData);
            showSuccessModal();
            form.reset();
            clearFieldErrors();
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        }
    }
    
    form.addEventListener('submit', handleFormSubmit);
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    window.addEventListener('click', (event) => {
        if (modal && event.target === modal) {
            closeModal();
        }
    });
    
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('focus', () => {
            input.classList.remove('error-field');
            const parentGroup = input.closest('.form-group');
            if (parentGroup) {
                const errorDiv = parentGroup.querySelector('.error-message');
                if (errorDiv) errorDiv.innerText = '';
            }
        });
    });
    
    consentCheckbox.addEventListener('change', () => {
        if (consentError) consentError.innerText = '';
    });
});