// Menu mobile toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Destaque do link ativo
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Carrossel automático
const wrapper = document.getElementById('carrosselWrapper');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;
const totalSlides = indicators.length;
let autoSlideInterval;

function updateCarrossel(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === currentIndex);
    });
}

indicators.forEach(indicator => {
    indicator.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        updateCarrossel(slideIndex);
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
});

function nextSlide() {
    updateCarrossel(currentIndex + 1);
}

autoSlideInterval = setInterval(nextSlide, 5000);

const carrosselContainer = document.querySelector('.carrossel-container');
if (carrosselContainer) {
    carrosselContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carrosselContainer.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
}

// Formulário WhatsApp
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        const numero = '258879894385';
        
        if (!nome || !mensagem) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        const texto = `Olá, sou ${nome}. ${mensagem}`;
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
        
        window.open(url, '_blank');
    });
}