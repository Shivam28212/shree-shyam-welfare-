// Loading Screen and Initial Animations
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const posterSection = document.getElementById('posterSection');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Start mala animations
            startMalaAnimations();
        }, 500);
    }, 2000);
});

function startMalaAnimations() {
    // Mala elements will animate out automatically via CSS
    // After mala animations complete, poster will reveal
    setTimeout(() => {
        startPosterAnimations();
    }, 5500); // Wait for all mala animations to complete
}

function startPosterAnimations() {
    const poster = document.getElementById('poster');
    const aboutSection = document.getElementById('aboutSection');
    
    // Add scroll event listener for about section animation
    window.addEventListener('scroll', function() {
        const aboutSectionTop = aboutSection.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        if (scrollPosition > aboutSectionTop + 100) {
            aboutSection.style.animation = 'slideInUp 1s ease-out forwards';
        }
    });
}

// RSVP Modal Functions
function openRSVP() {
    const modal = document.getElementById('rsvpModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    setTimeout(() => {
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
        modal.querySelector('.modal-content').style.opacity = '1';
    }, 10);
}

function closeRSVP() {
    const modal = document.getElementById('rsvpModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('rsvpModal');
    if (event.target === modal) {
        closeRSVP();
    }
}

// Form Submission
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Show success message
    showSuccessMessage();
    
    // Reset form
    this.reset();
    
    // Close modal after delay
    setTimeout(() => {
        closeRSVP();
    }, 2000);
});

function showSuccessMessage() {
    const modalContent = document.querySelector('.modal-content');
    const form = document.getElementById('rsvpForm');
    
    // Hide form
    form.style.display = 'none';
    
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-icon">🕉️</div>
        <h3>धन्यवाद!</h3>
        <p>आपकी उपस्थिति सफलतापूर्वक दर्ज की गई है।</p>
        <p>हम आपको जागरण में देखने के लिए उत्सुक हैं!</p>
    `;
    
    modalContent.appendChild(successDiv);
    
    // Add success animation
    setTimeout(() => {
        successDiv.style.opacity = '1';
        successDiv.style.transform = 'scale(1)';
    }, 100);
}

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to poster
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const poster = document.getElementById('poster');
    const rate = scrolled * -0.5;
    
    if (poster) {
        poster.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.boxShadow = '0 8px 25px rgba(139,0,0,0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add click effects to RSVP button
    const rsvpBtn = document.querySelector('.rsvp-btn');
    if (rsvpBtn) {
        rsvpBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
});

// Add CSS for success message
const style = document.createElement('style');
style.textContent = `
    .success-message {
        text-align: center;
        padding: 40px 20px;
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.5s ease;
    }
    
    .success-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(45deg, #8B0000, #DC143C);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: white;
        margin: 0 auto 20px;
        animation: bounce 0.6s ease-out;
    }
    
    .success-message h3 {
        color: #8B0000;
        margin-bottom: 15px;
        font-family: 'Noto Sans Devanagari', serif;
    }
    
    .success-message p {
        color: #666;
        margin-bottom: 10px;
        line-height: 1.6;
    }
    
    @keyframes bounce {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .modal-content {
        transform: translateY(-50px);
        opacity: 0;
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeRSVP();
    }
});

// Add touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for navigation
            console.log('Swipe down detected');
        }
    }
}

// Add intersection observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 1s ease-out forwards';
        }
    });
}, observerOptions);

// Observe sections for animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.about-section, .schedule-section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Add traditional Indian music/sound effects (optional)
function playBhajanSound() {
    // This would play traditional bhajan music when poster appears
    console.log('Playing traditional bhajan music...');
}

// Trigger sound when poster appears
setTimeout(() => {
    playBhajanSound();
}, 5500);
