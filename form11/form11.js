(function() {
    const form = document.getElementById('mortgageForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const consentCheckbox = document.getElementById('consent');
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const toast = document.getElementById('toastMsg');

    function showFieldError(inputElement, errorElement, message, condition) {
        if (condition) {
            errorElement.style.display = 'block';
            inputElement.classList.add('error-border');
            if (message) errorElement.innerText = message;
            return false;
        } else {
            errorElement.style.display = 'none';
            inputElement.classList.remove('error-border');
            return true;
        }
    }

    function isValidPhone(phoneValue) {
        if (!phoneValue || phoneValue.trim() === '') return false;
        const digits = phoneValue.replace(/\D/g, '');
        return digits.length >= 5 && digits.length <= 15;
    }

    function isValidName(nameValue) {
        return nameValue && nameValue.trim().length >= 2;
    }

    function showToast(message) {
        toast.textContent = message || '✓ Заявка отправлена';
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2700);
    }

    function validateForm() {
        let isFormValid = true;

        const nameValid = isValidName(nameInput.value);
        if (!nameValid) {
            showFieldError(nameInput, nameError, 'Пожалуйста, укажите ваше имя', true);
            isFormValid = false;
        } else {
            showFieldError(nameInput, nameError, '', false);
        }

        const phoneValid = isValidPhone(phoneInput.value);
        if (!phoneValid) {
            showFieldError(phoneInput, phoneError, 'Введите корректный номер телефона (минимум 5 цифр)', true);
            isFormValid = false;
        } else {
            showFieldError(phoneInput, phoneError, '', false);
        }

        if (!consentCheckbox.checked) {
            const checkboxGroup = document.querySelector('.checkbox-group');
            if (!checkboxGroup.querySelector('.consent-error')) {
                const consentErrSpan = document.createElement('div');
                consentErrSpan.className = 'error-msg';
                consentErrSpan.id = 'consentError';
                consentErrSpan.style.marginLeft = '28px';
                consentErrSpan.style.marginTop = '2px';
                consentErrSpan.innerText = 'Необходимо согласие на обработку персональных данных';
                checkboxGroup.appendChild(consentErrSpan);
            } else {
                const existingErr = document.getElementById('consentError');
                if (existingErr) existingErr.style.display = 'block';
            }
            checkboxGroup.style.backgroundColor = '#fff7f5';
            checkboxGroup.style.padding = '4px 6px 4px 6px';
            checkboxGroup.style.transition = '0.1s';
            isFormValid = false;
        } else {
            const checkboxGroup = document.querySelector('.checkbox-group');
            const existingErr = document.getElementById('consentError');
            if (existingErr) existingErr.style.display = 'none';
            checkboxGroup.style.backgroundColor = 'transparent';
            checkboxGroup.style.padding = '';
        }

        return isFormValid;
    }

    function handleSubmit(event) {
        event.preventDefault();

        const valid = validateForm();

        if (valid) {
            const formData = {
                name: nameInput.value.trim(),
                phone: phoneInput.value.trim(),
                consent: consentCheckbox.checked
            };
            console.log('Отправка данных:', formData);
            showToast('✓ Заявка на ипотеку отправлена!');

            nameInput.classList.remove('error-border');
            phoneInput.classList.remove('error-border');
            nameError.style.display = 'none';
            phoneError.style.display = 'none';
            const consentErrDiv = document.getElementById('consentError');
            if (consentErrDiv) consentErrDiv.style.display = 'none';
            const chkGroup = document.querySelector('.checkbox-group');
            if (chkGroup) {
                chkGroup.style.backgroundColor = '';
                chkGroup.style.padding = '';
            }
        } else {
            const firstError = document.querySelector('.error-border, .checkbox-group .error-msg');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    function addLiveValidation() {
        nameInput.addEventListener('blur', function() {
            if (nameInput.value.trim() === '' || nameInput.value.trim().length < 2) {
                showFieldError(nameInput, nameError, 'Пожалуйста, укажите ваше имя', true);
            } else {
                showFieldError(nameInput, nameError, '', false);
            }
        });

        phoneInput.addEventListener('blur', function() {
            if (!isValidPhone(phoneInput.value)) {
                showFieldError(phoneInput, phoneError, 'Введите корректный номер телефона (минимум 5 цифр)', true);
            } else {
                showFieldError(phoneInput, phoneError, '', false);
            }
        });

        consentCheckbox.addEventListener('change', function() {
            const checkboxGroup = document.querySelector('.checkbox-group');
            const existingErr = document.getElementById('consentError');
            if (consentCheckbox.checked) {
                if (existingErr) existingErr.style.display = 'none';
                if (checkboxGroup) {
                    checkboxGroup.style.backgroundColor = '';
                    checkboxGroup.style.padding = '';
                }
            }
        });
    }

    form.addEventListener('submit', handleSubmit);
    addLiveValidation();

    let submitAttempt = false;
    form.addEventListener('submit', function(e) {
        if (submitAttempt) {
            e.preventDefault();
            return false;
        }
        submitAttempt = true;
        setTimeout(() => { submitAttempt = false; }, 1500);
    });
})();