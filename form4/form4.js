document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('callbackForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const commentInput = document.getElementById('comment');
    const agreeCheckbox = document.getElementById('agreeCheckbox');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    const globalErrorWrapper = document.getElementById('globalErrorWrapper');
    const globalErrorMessage = document.getElementById('globalErrorMessage');

    // Маска для телефона
    function setPhoneMask() {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (value.length === 0) {
                e.target.value = '';
                return;
            }
            
            if (value[0] !== '7' && value[0] !== '8') {
                value = '7' + value;
            }
            if (value[0] === '8') {
                value = '7' + value.substring(1);
            }
            
            formattedValue = '+7';
            if (value.length > 1) {
                formattedValue += ' (' + value.substring(1, 4);
            }
            if (value.length >= 5) {
                formattedValue += ') ' + value.substring(4, 7);
            }
            if (value.length >= 8) {
                formattedValue += '-' + value.substring(7, 9);
            }
            if (value.length >= 10) {
                formattedValue += '-' + value.substring(9, 11);
            }
            if (value.length > 11) {
                formattedValue = formattedValue.substring(0, 18);
            }
            
            e.target.value = formattedValue;
            checkAllFields();
        });
        
        phoneInput.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Tab' || e.key === 'Escape' || e.key === 'Enter') {
                return;
            }
            if (!/^[\d]$/.test(e.key)) {
                e.preventDefault();
            }
        });
    }

    // Обновление стиля поля
    function updateFieldStyle(input, isValid) {
        if (isValid) {
            input.classList.remove('error-border');
            input.classList.add('valid-border');
        } else {
            input.classList.remove('valid-border');
            input.classList.add('error-border');
        }
    }

    function validateName() {
        const name = nameInput.value.trim();
        const isValid = name.length >= 2;
        updateFieldStyle(nameInput, isValid);
        return isValid;
    }

    function validatePhone() {
        const rawPhone = phoneInput.value.trim();
        let isValid = false;
        if (rawPhone) {
            const digits = rawPhone.replace(/\D/g, '');
            isValid = (digits.length === 11 && digits[0] === '7');
        }
        updateFieldStyle(phoneInput, isValid);
        return isValid;
    }

    function validateComment() {
        const comment = commentInput.value.trim();
        const isValid = comment.length <= 500;
        updateFieldStyle(commentInput, isValid);
        return true;
    }

    // Проверка всех полей и управление блоком ошибки
    function checkAllFields() {
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        validateComment();
        
        const allFieldsValid = isNameValid && isPhoneValid;
        
        if (!allFieldsValid) {
            globalErrorWrapper.classList.remove('hidden');
            globalErrorMessage.textContent = 'Заполните обязательное поле';
        } else {
            globalErrorWrapper.classList.add('hidden');
        }
        
        return allFieldsValid;
    }

    function showAgreementError() {
        let agreeErr = document.getElementById('agreeErrorMsg');
        if (!agreeErr) {
            agreeErr = document.createElement('div');
            agreeErr.id = 'agreeErrorMsg';
            agreeErr.className = 'error-message';
            agreeErr.style.textAlign = 'center';
            agreeErr.style.marginTop = '8px';
            const checkboxWrapper = document.querySelector('.checkbox-wrapper');
            checkboxWrapper.parentNode.insertBefore(agreeErr, checkboxWrapper.nextSibling);
        }
        agreeErr.style.display = 'block';
        agreeErr.innerText = 'Необходимо согласие на обработку персональных данных';
        return false;
    }

    function hideAgreementError() {
        const agreeErr = document.getElementById('agreeErrorMsg');
        if (agreeErr) agreeErr.style.display = 'none';
    }

    function validateAgreement() {
        if (!agreeCheckbox.checked) {
            showAgreementError();
            return false;
        }
        hideAgreementError();
        return true;
    }

    // События полей
    nameInput.addEventListener('input', checkAllFields);
    phoneInput.addEventListener('input', checkAllFields);
    commentInput.addEventListener('input', checkAllFields);
    nameInput.addEventListener('blur', checkAllFields);
    phoneInput.addEventListener('blur', checkAllFields);
    commentInput.addEventListener('blur', checkAllFields);

    agreeCheckbox.addEventListener('change', function() {
        if (agreeCheckbox.checked) {
            hideAgreementError();
        }
    });

    setPhoneMask();

    async function submitFormData(formData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Отправка данных:', formData);
                resolve({ ok: true, message: '✓ Заявка принята! Менеджер свяжется с вами в ближайшее время.' });
            }, 800);
        });
    }

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        formStatus.className = 'form-status';
        formStatus.innerText = '';
        
        const isFieldsValid = checkAllFields();
        const isAgreed = validateAgreement();
        
        if (!isFieldsValid || !isAgreed) {
            formStatus.innerText = 'Пожалуйста, исправьте ошибки в форме';
            formStatus.className = 'form-status error';
            if (!isFieldsValid) {
                const firstError = document.querySelector('.error-border');
                if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        const payload = {
            name: nameInput.value.trim(),
            phone: phoneInput.value.trim(),
            comment: commentInput.value.trim() || '',
            agreement: true,
            timestamp: new Date().toISOString()
        };
        
        const originalText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = 'Отправка...';
        formStatus.innerText = 'Отправляем...';
        
        try {
            const response = await submitFormData(payload);
            if (response.ok) {
                formStatus.innerText = response.message;
                formStatus.className = 'form-status success';
                nameInput.value = '';
                phoneInput.value = '';
                commentInput.value = '';
                agreeCheckbox.checked = false;
                
                // Сбрасываем стили полей на красные рамки
                nameInput.classList.remove('valid-border');
                nameInput.classList.add('error-border');
                phoneInput.classList.remove('valid-border');
                phoneInput.classList.add('error-border');
                commentInput.classList.remove('valid-border');
                commentInput.classList.add('error-border');
                
                // Показываем блок ошибки снова
                globalErrorWrapper.classList.remove('hidden');
                hideAgreementError();
            }
        } catch (error) {
            formStatus.innerText = 'Ошибка отправки. Попробуйте позже.';
            formStatus.className = 'form-status error';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
        }
    });
    
    // Первоначальная проверка
    checkAllFields();
});