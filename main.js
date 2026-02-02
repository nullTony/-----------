const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

document.addEventListener('click', (e) => {
    // Не переключаем, если кликнули по кнопке или интерактивному элементу
    if (e.target.closest('.step-card') || e.target.closest('.concept-card')) return;

    const screenWidth = window.innerWidth;
    const clickX = e.clientX;

    if (clickX > screenWidth * 0.6) {
        if (currentSlide < slides.length - 1) {
            changeSlide(currentSlide + 1);
        }
    } else if (clickX < screenWidth * 0.4) {
        if (currentSlide > 0) {
            changeSlide(currentSlide - 1);
        }
    }
});

function changeSlide(index) {
    slides[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
}

// Управление стрелками
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") changeSlide(Math.min(currentSlide + 1, slides.length - 1));
    if (e.key === "ArrowLeft") changeSlide(Math.max(currentSlide - 1, 0));
});