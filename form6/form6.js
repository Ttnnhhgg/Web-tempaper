(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const routeButton = document.getElementById('routeBtn');
        const toast = document.getElementById('notificationToast');
        
        if (!routeButton) {
            return;
        }
        
        const OFFICE_ADDRESS = 'г.Казань, ул.Яркая 31 Б';
        
        function showNotification(message) {
            if (!toast) return;
            
            toast.classList.remove('show');
            void toast.offsetWidth;
            
            toast.textContent = message || `Маршрут построен: ${OFFICE_ADDRESS}`;
            toast.classList.add('show');
            
            setTimeout(function() {
                if (toast) {
                    toast.classList.remove('show');
                }
            }, 3000);
        }
        
        function buildMapsUrl() {
            const encodedAddress = encodeURIComponent(OFFICE_ADDRESS);
            return `https://yandex.ru/maps/?text=${encodedAddress}&mode=search&z=12`;
        }
        
        function openRouteMaps() {
            const mapsUrl = buildMapsUrl();
            window.open(mapsUrl, '_blank', 'noopener,noreferrer');
            showNotification(`Открыт маршрут к офису: ${OFFICE_ADDRESS}`);
        }
        
        routeButton.addEventListener('click', function(event) {
            event.preventDefault();
            showNotification(`Строим маршрут до ${OFFICE_ADDRESS}...`);
            
            setTimeout(function() {
                openRouteMaps();
            }, 180);
        });
        
        routeButton.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.97)';
        });
        routeButton.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        routeButton.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        if ('ontouchstart' in window) {
            routeButton.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.97)';
            });
            routeButton.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        }
    });
})();