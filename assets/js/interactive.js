/*===== INTERACTIVE PORTFOLIO FEATURES =====*/

// Project data structure for dynamic rendering
const projects = [
    {
        name: 'Todo App',
        description: 'A task management application built with Maven and Java',
        technologies: ['Java', 'Maven'],
        image: 'assets/img/work1.jpg'
    },
    {
        name: 'E-Kart',
        description: 'An e-commerce application built with Spring Boot',
        technologies: ['Java', 'Spring Boot', 'MySQL'],
        image: 'assets/img/work2.jpg'
    }
];

// Initialize interactive features
document.addEventListener('DOMContentLoaded', function() {
    initProjectCards();
    initTabNavigation();
    initDarkMode();
});

/*===== ENHANCED PROJECT CARDS =====*/
function initProjectCards() {
    const projectCards = document.querySelectorAll('.work__img');
    
    projectCards.forEach((card, index) => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
            this.style.transform = 'translateY(0)';
        });
        
        // Add click to view more (can be expanded)
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            console.log('Project clicked:', projects[index]);
        });
    });
}

/*===== DYNAMIC TAB NAVIGATION =====*/
function initTabNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active-link'));
            // Add active class to clicked link
            this.classList.add('active-link');
        });
    });
}

/*===== DARK MODE TOGGLE (Optional Enhancement) =====*/
function initDarkMode() {
    // Check if dark mode preference exists
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        enableDarkMode();
    }
}

function enableDarkMode() {
    document.body.style.backgroundColor = '#1a1a1a';
    document.body.style.color = '#f0f0f0';
    localStorage.setItem('darkMode', 'true');
}

function disableDarkMode() {
    document.body.style.backgroundColor = '#fff';
    document.body.style.color = '#000';
    localStorage.setItem('darkMode', 'false');
}

/*===== SCROLL TO TOP BUTTON =====*/
const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑ Top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #0B63F7;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
        display: none;
        z-index: 999;
        width: 50px;
        height: 50px;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
};

createScrollToTopButton();

/*===== TYPING ANIMATION FOR TITLE =====*/
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
}

// Apply typing animation to home title on load
window.addEventListener('load', () => {
    const homeTitle = document.querySelector('.home__title-color');
    if (homeTitle && homeTitle.textContent === 'venkatesh') {
        typeWriter(homeTitle, 'venkatesh', 50);
    }
});

/*===== FORM INPUT EFFECTS =====*/
function initFormEffects() {
    const inputs = document.querySelectorAll('.contact__input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#0B63F7';
            this.style.boxShadow = '0 0 10px rgba(11, 99, 247, 0.3)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });
}

initFormEffects();

/*===== STATISTICS COUNTER ANIMATION =====*/
function animateCountUp(element, endValue, duration = 2000) {
    const startValue = 0;
    const startTime = Date.now();
    
    const update = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(startValue + (endValue - startValue) * progress);
        
        element.textContent = currentValue + '%';
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    };
    
    update();
}

// Example: Animate skill percentages on page load
const skillPercentages = document.querySelectorAll('.skills__percentage');
let hasAnimated = false;

window.addEventListener('scroll', () => {
    if (!hasAnimated && window.scrollY > 500) {
        skillPercentages.forEach(el => {
            const value = parseInt(el.textContent);
            animateCountUp(el, value);
        });
        hasAnimated = true;
    }
});

console.log('Interactive features loaded successfully!');
