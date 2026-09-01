document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. NAVBAR =====
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // ===== 2. SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            // Close mobile menu
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');

            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const target = document.querySelector(targetId);
            if (target) {
                const offset = navbar.offsetHeight;
                const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });

    // ===== 3. SCROLL REVEAL ANIMATIONS =====
    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        revealObserver.observe(el);
    });

    // ===== 4. STATS COUNTER (DISABLED) =====
    // Counter animation disabled - showing static numbers
    const statsSection = document.getElementById('stats');
    let counted = false;

    // Counter disabled - static display only
    // No animation on stats numbers

    // ===== 5. TESTIMONIAL SLIDER =====
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderContainer = document.querySelector('.testimonial-slider');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function startSlider() {
        slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { stopSlider(); showSlide(currentSlide - 1); startSlider(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopSlider(); showSlide(currentSlide + 1); startSlider(); });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { stopSlider(); showSlide(i); startSlider(); });
    });

    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopSlider);
        sliderContainer.addEventListener('mouseleave', startSlider);
    }

    if (slides.length > 0) {
        showSlide(0);
        startSlider();
    }

    // ===== 6. DOCTOR CARDS FILTER =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const doctorCards = document.querySelectorAll('.doctor-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');

            doctorCards.forEach(card => {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';

                setTimeout(() => {
                    if (filter === 'all' || card.getAttribute('data-department') === filter) {
                        card.style.display = '';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // ===== 7. APPOINTMENT FORM VALIDATION =====
    const appointmentForm = document.getElementById('appointmentForm');

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^\d{10,}$/.test(phone.replace(/\D/g, ''));
    }

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Clear previous errors
            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
            document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

            const name = document.getElementById('patientName');
            const email = document.getElementById('patientEmail');
            const phone = document.getElementById('patientPhone');
            const date = document.getElementById('appointmentDate');
            const dept = document.getElementById('department');

            // Name
            if (!name.value.trim()) {
                document.getElementById('nameError').textContent = 'Full name is required';
                name.classList.add('error');
                isValid = false;
            }

            // Email
            if (!validateEmail(email.value)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email';
                email.classList.add('error');
                isValid = false;
            }

            // Phone
            if (!validatePhone(phone.value)) {
                document.getElementById('phoneError').textContent = 'Enter a valid phone (10+ digits)';
                phone.classList.add('error');
                isValid = false;
            }

            // Date
            const selectedDate = new Date(date.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (!date.value || selectedDate < today) {
                document.getElementById('dateError').textContent = 'Please select a future date';
                date.classList.add('error');
                isValid = false;
            }

            // Department
            if (!dept.value) {
                document.getElementById('deptError').textContent = 'Please select a department';
                dept.classList.add('error');
                isValid = false;
            }

            if (isValid) {
                showToast('🎉 Appointment booked successfully! We will contact you within 30 minutes.', 'success');
                appointmentForm.reset();
            } else {
                showToast('Please fix the errors in the form.', 'error');
            }
        });
    }

    // ===== 8. BACK TO TOP =====
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== 9. SCROLL PROGRESS BAR =====
    const scrollProgress = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // ===== 10. ACTIVE NAV LINK HIGHLIGHT =====
    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navbar.offsetHeight - 20;
            const sectionId = section.getAttribute('id');

            allNavLinks.forEach(link => {
                if (link.getAttribute('href') === '#' + sectionId) {
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                }
            });
        });
    });

    // ===== 11. GALLERY LIGHTBOX =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.facility-card[data-lightbox]').forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.getAttribute('data-lightbox');
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') lightbox.classList.remove('active');
    });

    // ===== 12. TYPING EFFECT =====
    const typingText = document.getElementById('typingText');
    const phrases = [
        'Your Health, Our Priority',
        'Excellence in Healthcare',
        '24/7 Emergency Care',
        'Trusted by Millions'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === current.length) {
            speed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }

    if (typingText) typeEffect();

    // ===== 13. TOAST NOTIFICATION SYSTEM =====
    const toastContainer = document.getElementById('toastContainer');

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-exclamation-circle"></i>',
            info: '<i class="fas fa-info-circle"></i>'
        };

        toast.innerHTML = `${icons[type] || icons.info} <span>${message}</span>`;
        toastContainer.appendChild(toast);

        // Auto remove
        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, 4000);

        // Click to dismiss
        toast.addEventListener('click', () => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        });
    }

    // ===== 14. PARTICLE EFFECT =====
    const canvas = document.getElementById('heroParticles');

    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }

        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.8;
                this.speedY = (Math.random() - 0.5) * 0.8;
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.min((canvas.width * canvas.height) / 12000, 120);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - distance / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
    }

    // ===== 15. NEWSLETTER FORM =====
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('✉️ Thank you for subscribing to our newsletter!', 'success');
            newsletterForm.reset();
        });
    }

});
