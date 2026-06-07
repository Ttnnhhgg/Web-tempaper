document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const commentInput = document.getElementById('comment');
    const privacyCheck = document.getElementById('privacyCheck');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const commentError = document.getElementById('commentError');
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
        clearError(nameInput, nameError);
        return true;
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        if (!email) {
            showError(emailInput, emailError, 'Введите адрес электронной почты');
            return false;
        }
        const emailPattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showError(emailInput, emailError, 'Введите корректный email');
            return false;
        }
        clearError(emailInput, emailError);
        return true;
    }
    
    function validateComment() {
        const comment = commentInput.value.trim();
        if (!comment) {
            showError(commentInput, commentError, 'Напишите ваш комментарий');
            return false;
        }
        if (comment.length < 5) {
            showError(commentInput, commentError, 'Комментарий должен содержать не менее 5 символов');
            return false;
        }
        clearError(commentInput, commentError);
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
    emailInput.addEventListener('blur', validateEmail);
    commentInput.addEventListener('blur', validateComment);
    privacyCheck.addEventListener('change', function() {
        if (privacyCheck.checked) {
            consentError.textContent = '';
        }
    });
    
    nameInput.addEventListener('input', function() {
        if (nameError.textContent) validateName();
    });
    emailInput.addEventListener('input', function() {
        if (emailError.textContent) validateEmail();
    });
    commentInput.addEventListener('input', function() {
        if (commentError.textContent) validateComment();
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isCommentValid = validateComment();
        const isConsentValid = validateConsent();
        
        if (isNameValid && isEmailValid && isCommentValid && isConsentValid) {
            const oldSuccess = document.querySelector('.success-message');
            if (oldSuccess) oldSuccess.remove();
            
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Сообщение отправлено! Мы свяжемся с вами.';
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