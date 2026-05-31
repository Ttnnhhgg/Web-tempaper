document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('callbackForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const commentInput = document.getElementById('comment');
    const agreeCheckbox = document.getElementById('agreeCheckbox');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const commentError = document.getElementById('commentError');

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
            if (phoneError.innerText) phoneError.innerText = '';
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

    function validateName() {
        const name = nameInput.value.trim();
        if (!name) {
            nameError.innerText = 'Пожалуйста, укажите ваше имя';
            return false;
        }
        if (name.length < 2) {
            nameError.innerText = 'Имя должно содержать минимум 2 символа';
            return false;
        }
        nameError.innerText = '';
        return true;
    }

    function validatePhone() {
        const rawPhone = phoneInput.value.trim();
        if (!rawPhone) {
            phoneError.innerText = 'Введите номер телефона';
            return false;
        }
        const digits = rawPhone.replace(/\D/g, '');
        if (digits.length === 11 && digits[0] === '7') {
            phoneError.innerText = '';
            return true;
        }
        phoneError.innerText = 'Введите номер в формате +7 (XXX) XXX-XX-XX';
        return false;
    }

    function validateComment() {
        const comment = commentInput.value.trim();
        if (comment.length > 500) {
            commentError.innerText = 'Комментарий не должен превышать 500 символов';
            return false;
        }
        commentError.innerText = '';
        return true;
    }

    function showAgreementError() {
        let agreeErr = document.getElementById('agreeErrorMsg');
        if (!agreeErr) {
            agreeErr = document.createElement('div');
            agreeErr.id = 'agreeErrorMsg';
            agreeErr.className = 'error-message';
            agreeErr.style.textAlign = 'center';
            agreeErr.style.marginTop = '6px';
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

    function validateForm() {
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isCommentValid = validateComment();
        const isAgreed = validateAgreement();
        return isNameValid && isPhoneValid && isCommentValid && isAgreed;
    }

    agreeCheckbox.addEventListener('change', function() {
        if (agreeCheckbox.checked) {
            hideAgreementError();
        }
    });

    nameInput.addEventListener('blur', validateName);
    phoneInput.addEventListener('blur', validatePhone);
    commentInput.addEventListener('blur', validateComment);
    
    nameInput.addEventListener('input', () => { if (nameError.innerText) nameError.innerText = ''; });
    commentInput.addEventListener('input', () => { if (commentError.innerText) commentError.innerText = ''; });

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
        
        if (!validateForm()) {
            formStatus.innerText = 'Пожалуйста, исправьте ошибки в форме';
            formStatus.className = 'form-status error';
            const firstError = document.querySelector('.error-message:not(:empty)');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
                nameError.innerText = '';
                phoneError.innerText = '';
                commentError.innerText = '';
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
});