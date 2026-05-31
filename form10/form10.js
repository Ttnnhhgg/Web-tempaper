document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const privacyCheck = document.getElementById('privacyCheck');
    
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const consentError = document.getElementById('consentError');
    
    function showError(input, errorDiv, message) {
        errorDiv.textContent = message;
        if (input) input.classList.add('error-field');
    }
    
    function clearError(input, errorDiv) {
        errorDiv.textContent = '';
        if (input) input.classList.remove('error-field');
    }
    
    function validateName() {
        const name = nameInput.value.trim();
        if (!name) {
            showError(nameInput, nameError, 'Укажите ваше имя');
            return false;
        }
        if (name.length < 2) {
            showError(nameInput, nameError, 'Имя должно содержать минимум 2 символа');
            return false;
        }
        if (/[^a-zA-Zа-яА-ЯёЁ\s\-]/.test(name)) {
            showError(nameInput, nameError, 'Имя может содержать только буквы');
            return false;
        }
        clearError(nameInput, nameError);
        return true;
    }
    
    function validatePhone() {
        const phone = phoneInput.value.trim();
        if (!phone) {
            showError(phoneInput, phoneError, 'Укажите номер телефона');
            return false;
        }
        const digitsOnly = phone.replace(/\D/g, '');
        if (digitsOnly.length < 10) {
            showError(phoneInput, phoneError, 'Введите корректный номер телефона (минимум 10 цифр)');
            return false;
        }
        if (digitsOnly.length > 15) {
            showError(phoneInput, phoneError, 'Номер телефона слишком длинный');
            return false;
        }
        clearError(phoneInput, phoneError);
        return true;
    }
    
    function validateConsent() {
        if (!privacyCheck.checked) {
            consentError.textContent = 'Необходимо согласие на обработку персональных данных';
            return false;
        }
        consentError.textContent = '';
        return true;
    }
    
    nameInput.addEventListener('blur', validateName);
    phoneInput.addEventListener('blur', validatePhone);
    privacyCheck.addEventListener('change', function() {
        if (privacyCheck.checked) {
            consentError.textContent = '';
        }
    });
    
    nameInput.addEventListener('input', function() {
        if (nameError.textContent) validateName();
    });
    phoneInput.addEventListener('input', function() {
        if (phoneError.textContent) validatePhone();
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isConsentValid = validateConsent();
        
        if (isNameValid && isPhoneValid && isConsentValid) {
            const oldSuccess = document.querySelector('.success-message');
            if (oldSuccess) oldSuccess.remove();
            
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Заявка отправлена! Менеджер свяжется с вами.';
            form.appendChild(successMsg);
            
            form.reset();
            
            setTimeout(function() {
                if (successMsg) successMsg.remove();
            }, 5000);
        } else {
            const firstError = document.querySelector('.error-field');
            if (firstError) {
                firstError.focus();
            }
        }
    });
});