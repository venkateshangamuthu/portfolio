/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

/*===== INTERACTIVE SKILL BARS =====*/
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skills__bar');
    const percentages = ['95%', '85%', '65%', '85%'];
    
    skillBars.forEach((bar, index) => {
        const percentage = percentages[index];
        bar.style.width = percentage;
        bar.style.transition = 'width 1s ease-in-out';
    });
};

// Trigger animation when skills section is in view
const skillsSection = document.querySelector('.skills');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (skillsSection) {
    observer.observe(skillsSection);
}

/*===== INTERACTIVE PROJECT CARDS =====*/
document.querySelectorAll('.work__img').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

/*===== SMOOTH SCROLL NAVIGATION =====*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

/*===== CONTACT FORM VALIDATION =====*/
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const name = document.querySelector('input[name="name"]').value.trim();
        const email = document.querySelector('input[name="email"]').value.trim();
        const message = document.querySelector('textarea[name="message"]').value.trim();
        
        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill in all fields');
            return;
        }
        
        if (!email.includes('@')) {
            e.preventDefault();
            alert('Please enter a valid email');
            return;
        }
    });
}

/*===== COUNTER ANIMATION FOR SKILLS =====*/
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '%';
        }
    }, 16);
};

// Observe skills percentages
const skillPercentages = document.querySelectorAll('.skills__percentage');
if (skillPercentages.length > 0) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.textContent === '') {
                const percentage = parseInt(entry.target.dataset.value || entry.target.textContent);
                // Re-apply animation
                entry.target.style.animation = 'fadeIn 1s ease-in';
            }
        });
    }, { threshold: 0.5 });
    
    skillPercentages.forEach(percentage => skillsObserver.observe(percentage));
}
