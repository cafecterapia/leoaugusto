// Import Lenis smooth scrolling library
import Lenis from 'lenis';

// Initialize Lenis smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Check for reduced motion preference and disable Lenis if needed
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    lenis.destroy();
} else {
    // Start Lenis only if user doesn't prefer reduced motion
    lenis.start();
    
    // Animation frame for Lenis
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

// Listen for changes in motion preference
prefersReducedMotion.addEventListener('change', () => {
    if (prefersReducedMotion.matches) {
        lenis.destroy();
    } else {
        lenis.start();
    }
});

// Custom scroll methods for Lenis with fallbacks
function scrollToSection(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        if (lenis && !prefersReducedMotion.matches) {
            lenis.scrollTo(target, {
                offset: -80, // Account for sticky header
                duration: 1.5,
                easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
            });
        } else {
            // Fallback for reduced motion
            target.scrollIntoView({
                behavior: 'auto',
                block: 'start'
            });
        }
    }
}

function scrollToTop() {
    if (lenis && !prefersReducedMotion.matches) {
        lenis.scrollTo(0, {
            duration: 2,
            easing: (t) => 1 - Math.pow(1 - t, 4), // easeOutQuart
        });
    } else {
        // Fallback for reduced motion
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    }
}

// Mobile Navigation Toggle
function toggleMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

// Event delegation for all interactive elements
document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;
    
    const action = target.getAttribute('data-action');
    
    switch (action) {
        case 'toggle-mobile-nav':
            toggleMobileNav();
            break;
        case 'download-pdf':
            downloadPDF();
            break;
        case 'download-vcard':
            downloadVCard();
            break;
        case 'toggle-experience':
            toggleExperience();
            break;
        case 'toggle-credentials':
            toggleCredentials();
            break;
    }
});

// Form submission handler
document.addEventListener('submit', (e) => {
    if (e.target.hasAttribute('data-action') && e.target.getAttribute('data-action') === 'submit-form') {
        submitForm(e);
    }
});

// Legacy support - keeping for backward compatibility but not needed
window.toggleMobileNav = toggleMobileNav;

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-content a').forEach(link => {
    link.addEventListener('click', () => {
        toggleMobileNav();
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.hero-menu-btn');
    
    if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
        if (mobileNav.classList.contains('active')) {
            toggleMobileNav();
        }
    }
});

// Close mobile menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav.classList.contains('active')) {
            toggleMobileNav();
        }
    }
});

// Header scroll effect using Lenis with fallback
let lastScrollTop = 0;
const header = document.querySelector('.header');

function handleScroll(scrollTop) {
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        if (header) {
            header.style.transform = 'translateY(-100%)';
        }
    } else {
        // Scrolling up
        if (header) {
            header.style.transform = 'translateY(0)';
        }
    }
    
    // Add stronger background when scrolled
    if (header) {
        if (scrollTop > 50) {
            header.style.background = 'rgba(13, 17, 23, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(13, 17, 23, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    }
    
    lastScrollTop = scrollTop;
}

if (lenis && !prefersReducedMotion.matches) {
    lenis.on('scroll', ({ scroll }) => {
        handleScroll(scroll);
    });
} else {
    // Fallback for when Lenis is disabled
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        handleScroll(scrollTop);
    });
}

// Sticky Header and Navigation - unified scroll handler
function handleStickyHeaderAndNav(scrollPosition) {
    // Sticky Header
    const stickyHeader = document.getElementById('stickyHeader');
    const heroSection = document.querySelector('.hero-banner');
    
    if (heroSection && stickyHeader) {
        const heroHeight = heroSection.offsetHeight;
        
        if (scrollPosition > heroHeight - 100) {
            stickyHeader.classList.add('visible');
        } else {
            stickyHeader.classList.remove('visible');
        }
    }
    
    // Active Navigation Items
    const sections = ['sobre', 'experiencia', 'credenciais', 'contato'];
    const navItems = document.querySelectorAll('.sticky-nav-item');
    
    let current = '';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= (sectionTop - 200)) {
                current = sectionId;
            }
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        item.classList.add('inactive');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.remove('inactive');
            item.classList.add('active');
        }
    });
    
    // Scroll to top button
    const scrollTopBtn = document.querySelector('[data-scroll-top]');
    if (scrollTopBtn && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        
        if (scrollPosition > heroHeight) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    }
}

if (lenis && !prefersReducedMotion.matches) {
    lenis.on('scroll', ({ scroll }) => {
        handleStickyHeaderAndNav(scroll);
    });
} else {
    // Fallback for when Lenis is disabled
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        handleStickyHeaderAndNav(scrollPosition);
    });
}

// Smooth scrolling for navigation links using Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        if (targetId) {
            scrollToSection(targetId);
        }
    });
});

// Download PDF function
function downloadPDF() {
    const pdfContent = `
LEONARDO AUGUSTO, R.J
Direito Militar

Contato:
📧 leonardo.augusto@diretorio.adv.br
📱 (21) 98765-4321
📍 Rio de Janeiro, RJ

Especialidades:
• Direito Militar
• Processos Administrativos Disciplinares
• Justiça Militar
• Benefícios Militares
• Previdência Militar

Experiência:
• Mais de 15 anos em Direito Militar
• Sócio Fundador - Diretório Advocacia
• Especialista em defesas criminais militares
• Assessoria em benefícios previdenciários

OAB/RJ: 123.456
    `;
    
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Leonardo_Augusto_Curriculo.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Currículo baixado com sucesso!', 'success');
}

// Download vCard function
function downloadVCard() {
    const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:Leonardo Augusto
N:Augusto;Leonardo;;;
TITLE:Direito Militar
ORG:Diretório Advocacia
EMAIL:leonardo.augusto@diretorio.adv.br
TEL:+5521987654321
ADR:;;Rua da Assembléia, 100;Rio de Janeiro;RJ;20011-901;Brasil
URL:https://diretorio.adv.br
NOTE:Especialista em Direito Militar com mais de 15 anos de experiência
END:VCARD`;
    
    const blob = new Blob([vCardContent], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Leonardo_Augusto.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Contato baixado com sucesso!', 'success');
}

// Legacy support - functions are now handled by event delegation
// window.downloadPDF = downloadPDF;
// window.downloadVCard = downloadVCard;

// Contact form submission with FormSubmit.co AJAX
function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validation
    if (!data.nome || !data.email || !data.mensagem) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Por favor, insira um e-mail válido.', 'error');
        return;
    }
    
    // UI feedback
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // AJAX submission to FormSubmit.co
    fetch('https://formsubmit.co/ajax/leonardo.augusto@diretorio.adv.br', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            nome: data.nome,
            email: data.email,
            telefone: data.telefone || 'Não informado',
            assunto: data.assunto,
            mensagem: data.mensagem,
            _subject: 'Nova mensagem do site - Leonardo Augusto Advocacia',
            _captcha: 'false',
            _template: 'table'
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro no envio da mensagem');
        }
        return response.json();
    })
    .then(result => {
        // Success
        form.reset();
        showNotification('Mensagem enviada com sucesso! Retornaremos o contato em até 24 horas.', 'success');
        
        // Analytics tracking
        if (typeof trackEvent === 'function') {
            trackEvent('Form', 'submit_success', 'contact_form');
        }
    })
    .catch(error => {
        // Error handling
        console.error('Form submission error:', error);
        showNotification('Erro ao enviar mensagem. Tente novamente ou entre em contato por telefone.', 'error');
        
        // Analytics tracking
        if (typeof trackEvent === 'function') {
            trackEvent('Form', 'submit_error', 'contact_form');
        }
    })
    .finally(() => {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// Legacy support - form submission now handled by event delegation
// window.submitForm = submitForm;

// Notification system
function showNotification(message, type = 'success') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#c9a96e' : '#dc3545'};
        color: ${type === 'success' ? '#0d1117' : 'white'};
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 400px;
        opacity: 0;
        transition: opacity 0.3s ease;
        border: 1px solid ${type === 'success' ? '#b8965e' : '#c82333'};
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        font-size: 1rem;
        margin-left: auto;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Simple fade in for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.expertise-item, .service-card, .timeline-item, .contact-item');
    
    animatedElements.forEach((element) => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.4s ease';
        observer.observe(element);
    });
});

// Add scroll to top button
document.addEventListener('DOMContentLoaded', () => {
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.setAttribute('data-scroll-top', 'true'); // Add data attribute for identification
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #000000;
        color: white;
        border-radius: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
    `;
    
    scrollTopBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollTopBtn);
});

// Error handling for missing images
document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.querySelector('.profile-photo');
    if (profileImage) {
        profileImage.addEventListener('error', () => {
            profileImage.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #c9a96e, #b8965e);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #0d1117;
                font-size: 3rem;
                font-weight: bold;
                font-family: 'Playfair Display', serif;
            `;
            placeholder.textContent = 'LA';
            profileImage.parentNode.appendChild(placeholder);
        });
    }
});

// Analytics tracking
function trackEvent(category, action, label) {
    console.log('Analytics Event:', { category, action, label });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('Button', 'click', button.textContent.trim());
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('Navigation', 'internal_link', link.getAttribute('href'));
        });
    });
    
    document.querySelector('.contact-form').addEventListener('submit', () => {
        trackEvent('Form', 'submit', 'contact_form');
    });
});

// Credentials Section Toggle
function toggleCredentials() {
    const content = document.getElementById('credentialsContent');
    const toggle = document.getElementById('credentialsToggle');
    const bar = document.querySelector('.credentials-bar');
    
    const isExpanded = content.classList.contains('expanded');
    
    if (isExpanded) {
        // Collapse
        content.classList.remove('expanded');
        toggle.classList.remove('active');
        bar.classList.remove('expanded');
        toggle.setAttribute('aria-label', 'Expandir Credentials');
    } else {
        // Expand
        content.classList.add('expanded');
        toggle.classList.add('active');
        bar.classList.add('expanded');
        toggle.setAttribute('aria-label', 'Recolher Credentials');
    }
}

// Legacy support - credentials toggle now handled by event delegation
// window.toggleCredentials = toggleCredentials;

// Experience Section Toggle
function toggleExperience() {
    const expandableContent = document.getElementById('experienceExpandable');
    const expandBtn = document.getElementById('expandBtn');
    const collapseBtn = document.getElementById('collapseBtn');
    
    if (expandableContent.classList.contains('expanded')) {
        // Collapse
        expandableContent.classList.remove('expanded');
        expandBtn.style.display = 'inline-block';
        collapseBtn.style.display = 'none';
        
        // Smooth scroll to experience section top
        setTimeout(() => {
            const experienceSection = document.querySelector('.experience-section');
            if (experienceSection) {
                if (lenis && !prefersReducedMotion.matches) {
                    lenis.scrollTo(experienceSection, {
                        offset: -80,
                        duration: 1.5,
                        easing: (t) => 1 - Math.pow(1 - t, 3),
                    });
                } else {
                    // Fallback for reduced motion
                    experienceSection.scrollIntoView({
                        behavior: 'auto',
                        block: 'start'
                    });
                }
            }
        }, 200);
    } else {
        // Expand
        expandableContent.classList.add('expanded');
        expandBtn.style.display = 'none';
        collapseBtn.style.display = 'inline-block';
    }
}

// Legacy support - experience toggle now handled by event delegation
// window.toggleExperience = toggleExperience;
