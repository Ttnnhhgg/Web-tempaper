// form5.js - страница успешной отправки с крестиком

document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница успешной отправки загружена');
    
    // Кнопка закрытия (крестик)
    const closeBtn = document.getElementById('closeBtn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            // Закрываем текущую страницу или возвращаемся на предыдущую
            if (document.referrer) {
                window.location.href = document.referrer;
            } else {
                // Если нет предыдущей страницы, показываем сообщение
                alert('Закрыть окно');
                // Или можно закрыть окно браузера (не всегда работает)
                // window.close();
            }
        });
    }
    
    // Анимация появления
    const successCard = document.querySelector('.success-card');
    if (successCard) {
        successCard.style.animation = 'fadeIn 0.5s ease';
    }
});

// Добавляем анимацию появления
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .success-card {
        animation: fadeIn 0.5s ease;
    }
`;
document.head.appendChild(style);