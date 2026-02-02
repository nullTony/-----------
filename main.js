const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

// Определяем, мобильное ли устройство
function isMobile() {
    return window.innerWidth <= 768;
}

// Клик по экрану для переключения слайдов (только для десктопа)
document.addEventListener('click', (e) => {
    // На мобильных устройствах отключаем переключение кликом
    if (isMobile()) return;

    // Не переключаем, если кликнули по интерактивному элементу
    if (e.target.closest('.step-card') || 
        e.target.closest('.concept-card') ||
        e.target.closest('.s5-card') ||
        e.target.closest('.s6-point') ||
        e.target.closest('.s7-card') ||
        e.target.closest('.rec9-card') ||
        e.target.closest('.f-card')) {
        return;
    }

    const screenWidth = window.innerWidth;
    const clickX = e.clientX;

    // Правая часть экрана - следующий слайд
    if (clickX > screenWidth * 0.6) {
        if (currentSlide < slides.length - 1) {
            changeSlide(currentSlide + 1);
        }
    } 
    // Левая часть экрана - предыдущий слайд
    else if (clickX < screenWidth * 0.4) {
        if (currentSlide > 0) {
            changeSlide(currentSlide - 1);
        }
    }
});

function changeSlide(index) {
    slides[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    
    // Прокручиваем наверх при смене слайда
    if (isMobile()) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Управление стрелками (работает на всех устройствах)
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") {
        if (currentSlide < slides.length - 1) {
            changeSlide(currentSlide + 1);
        }
    }
    if (e.key === "ArrowLeft") {
        if (currentSlide > 0) {
            changeSlide(currentSlide - 1);
        }
    }
});

// Свайп для мобильных устройств
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, false);

function handleSwipe() {
    // Вычисляем разницу по осям
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Минимальное расстояние свайпа
    const minSwipeDistance = 50;
    
    // Проверяем, что горизонтальный свайп больше вертикального
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
        if (diffX > 0) {
            // Свайп влево - следующий слайд
            if (currentSlide < slides.length - 1) {
                changeSlide(currentSlide + 1);
            }
        } else {
            // Свайп вправо - предыдущий слайд
            if (currentSlide > 0) {
                changeSlide(currentSlide - 1);
            }
        }
    }
}

// Обработка изменения размера окна
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Можно добавить дополнительную логику при изменении размера
        console.log('Window resized');
    }, 250);
});