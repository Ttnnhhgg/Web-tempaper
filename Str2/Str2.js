// Str2.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Страница загружена');

    // Кнопка "Заказать звонок" — открывает form1
    const callbackBtn = document.getElementById('callbackBtn');
    if (callbackBtn) {
        callbackBtn.addEventListener('click', () => {
            window.open('form1', '_blank');
        });
    }

    // Кнопка "Проложить маршрут"
    const routeBtn = document.getElementById('routeBtn');
    if (routeBtn) {
        routeBtn.addEventListener('click', () => {
            window.open('https://yandex.ru/maps/?text=Казань, улица Яркая, 31Б&mode=routes', '_blank');
        });
    }

    // Яндекс.Карта через iframe
    const mapElement = document.getElementById('yandexMap');
    if (mapElement) {
        mapElement.innerHTML = '<iframe src="https://yandex.ru/map-widget/v1/?ll=49.106405,55.796127&z=17&pt=49.106405,55.796127&l=map" width="100%" height="100%" frameborder="0" style="border:none; display: block;"></iframe>';
    }

    // Проверка изображений
    const images = [
        document.querySelector('.logo-house-img'),
        document.querySelector('.phone-icon-img'),
        document.querySelectorAll('.phone-item-icon')[0],
        document.querySelector('.social-icons-img'),
        document.querySelector('.email-icon')
    ];
    
    images.forEach(img => { 
        if (img) {
            img.onerror = () => console.warn('Изображение не найдено');
        }
    });

    // Форма консультации — открывает form10
    const consultForm = document.getElementById('consultForm');
    if (consultForm) {
        consultForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.open('form10', '_blank');
            consultForm.reset();
        });
    }

    // Проверка изображений в нижнем блоке
    const footerImages = [
        document.querySelector('.footer-logo-img'),
        document.querySelector('.footer-social-img'),
        document.querySelector('.footer-email-icon')
    ];
    footerImages.forEach(img => {
        if (img) {
            img.onerror = () => console.warn('Изображение в нижнем блоке не найдено');
        }
    });
});