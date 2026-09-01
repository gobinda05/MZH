/**
 * MZH Hospisol - Master Interactive Script
 * High-Performance, Accessible, Modern UI/UX Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. Toast Notification System
    // =========================================================================
    const toastContainer = document.getElementById('toastContainer') || (() => {
        const tc = document.createElement('div');
        tc.id = 'toastContainer';
        tc.className = 'toast-container';
        document.body.appendChild(tc);
        return tc;
    })();

    function showToast(message, type = 'info', duration = 4000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: '<i class="fas fa-check-circle" style="color:#10B981; font-size:18px;"></i>',
            error: '<i class="fas fa-exclamation-circle" style="color:#EF4444; font-size:18px;"></i>',
            info: '<i class="fas fa-info-circle" style="color:#06B6D4; font-size:18px;"></i>'
        };

        toast.innerHTML = `${icons[type] || icons.info} <span>${message}</span>`;
        toastContainer.appendChild(toast);

        const removeToast = () => {
            if (toast.classList.contains('removing')) return;
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 260);
        };

        const timer = setTimeout(removeToast, duration);

        toast.addEventListener('click', () => {
            clearTimeout(timer);
            removeToast();
        });
    }
    window.showToast = showToast;

    // =========================================================================
    // 2. Navigation & Mobile Drawer (Accessible, Backdrop, Scroll Lock)
    // =========================================================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    // Create or locate backdrop for drawer
    let navBackdrop = document.querySelector('.nav-backdrop');
    if (!navBackdrop && navbar) {
        navBackdrop = document.createElement('div');
        navBackdrop.className = 'nav-backdrop';
        document.body.appendChild(navBackdrop);
    }

    const openDrawer = () => {
        if (!hamburger || !navLinks) return;
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        navLinks.classList.add('active');
        if (navBackdrop) navBackdrop.classList.add('active');
        document.body.classList.add('drawer-open');
    };

    const closeDrawer = () => {
        if (!hamburger || !navLinks) return;
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        if (navBackdrop) navBackdrop.classList.remove('active');
        document.body.classList.remove('drawer-open');
    };

    if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Toggle Navigation Menu');
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('active');
            if (isOpen) closeDrawer();
            else openDrawer();
        });
    }

    if (navBackdrop) {
        navBackdrop.addEventListener('click', closeDrawer);
    }

    // Close on navigation link click & keyboard Esc
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 960) closeDrawer();
            });
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
    });

    // Shrink navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }, { passive: true });

    // Scroll Progress Bar
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            scrollProgress.style.width = scrolled + '%';
        }, { passive: true });
    }

    // Mark current active link based on current path
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // =========================================================================
    // 3. Hero Canvas Particle Network
    // =========================================================================
    const canvas = document.getElementById('heroParticles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
        };

        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.7;
                this.speedY = (Math.random() - 0.5) * 0.7;
                this.opacity = Math.random() * 0.4 + 0.15;
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
                ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 14000), 80);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const connectParticles = () => {
            const maxDistance = 110;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * 0.12;
                        ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            animationFrameId = requestAnimationFrame(animate);
        };

        initParticles();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        }, { passive: true });
    }

    // =========================================================================
    // 4. Hero Dynamic Typing Tagline
    // =========================================================================
    const typingText = document.getElementById('typingText');
    if (typingText) {
        const phrases = [
            'Compassionate Care, Advanced Medicine',
            '24/7 Emergency & Trauma Center',
            '500+ Beds & 200+ Expert Specialists',
            'JCI, NABH & NABL Accredited Healthcare',
            'Your Trusted Healthcare Partner'
        ];
        let pIndex = 0;
        let cIndex = 0;
        let isDeleting = false;

        const type = () => {
            const current = phrases[pIndex];

            if (isDeleting) {
                typingText.textContent = current.substring(0, cIndex - 1);
                cIndex--;
            } else {
                typingText.textContent = current.substring(0, cIndex + 1);
                cIndex++;
            }

            let speed = isDeleting ? 30 : 65;

            if (!isDeleting && cIndex === current.length) {
                speed = 2200; // Pause when complete
                isDeleting = true;
            } else if (isDeleting && cIndex === 0) {
                isDeleting = false;
                pIndex = (pIndex + 1) % phrases.length;
                speed = 400;
            }

            setTimeout(type, speed);
        };

        type();
    }

    // =========================================================================
    // 5. Animated Number Counters (Intersection Observer)
    // =========================================================================
    const statCards = document.querySelectorAll('.stat-number');
    if (statCards.length > 0) {
        let animated = false;

        const animateCounters = () => {
            statCards.forEach(stat => {
                const targetText = stat.getAttribute('data-target') || stat.textContent.trim();
                const rawNum = parseInt(targetText.replace(/[^\d]/g, ''), 10);
                if (isNaN(rawNum)) return;

                const duration = 2000;
                const startTime = performance.now();

                const updateCount = (now) => {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(easeProgress * rawNum);

                    stat.textContent = current.toLocaleString('en-IN');

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = rawNum.toLocaleString('en-IN');
                    }
                };

                requestAnimationFrame(updateCount);
            });
        };

        const statsSection = document.querySelector('.stats-section') || statCards[0].closest('section');
        if (statsSection) {
            const statsObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !animated) {
                        animated = true;
                        animateCounters();
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            statsObserver.observe(statsSection);
        }
    }

    // =========================================================================
    // 6. Testimonial Carousel Slider (Touch Swipe, Auto-Play, Controls)
    // =========================================================================
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
        const dots = testimonialSlider.querySelectorAll('.dot');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentIdx = 0;
        let intervalTimer = null;

        const showSlide = (index) => {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));

            if (index >= slides.length) currentIdx = 0;
            else if (index < 0) currentIdx = slides.length - 1;
            else currentIdx = index;

            if (slides[currentIdx]) slides[currentIdx].classList.add('active');
            if (dots[currentIdx]) dots[currentIdx].classList.add('active');
        };

        const startAutoplay = () => {
            stopAutoplay();
            intervalTimer = setInterval(() => {
                showSlide(currentIdx + 1);
            }, 5500);
        };

        const stopAutoplay = () => {
            if (intervalTimer) clearInterval(intervalTimer);
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide(currentIdx - 1);
                startAutoplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                showSlide(currentIdx + 1);
                startAutoplay();
            });
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showSlide(i);
                startAutoplay();
            });
        });

        testimonialSlider.addEventListener('mouseenter', stopAutoplay);
        testimonialSlider.addEventListener('mouseleave', startAutoplay);

        // Touch Swipe
        let touchStartX = 0;
        let touchEndX = 0;

        testimonialSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        testimonialSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) showSlide(currentIdx + 1);
                else showSlide(currentIdx - 1);
                startAutoplay();
            }
        }, { passive: true });

        if (slides.length > 0) {
            showSlide(0);
            startAutoplay();
        }
    }

    // =========================================================================
    // 7. Doctor Directory Filters & Live Search (doctors.html)
    // =========================================================================
    const doctorCards = document.querySelectorAll('.doctor-card');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const doctorSearchInput = document.getElementById('doctorSearch');

    if (doctorCards.length > 0) {
        let activeCategory = 'all';
        let searchQuery = '';

        const filterDoctors = () => {
            let visibleCount = 0;

            doctorCards.forEach(card => {
                const dept = (card.getAttribute('data-department') || '').toLowerCase();
                const cardText = card.textContent.toLowerCase();

                const matchesCategory = (activeCategory === 'all' || dept === activeCategory);
                const matchesSearch = (!searchQuery || cardText.includes(searchQuery));

                if (matchesCategory && matchesSearch) {
                    card.classList.remove('hidden');
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                }
            });

            // Update no results message
            let noResultMsg = document.getElementById('noDoctorResults');
            if (visibleCount === 0) {
                if (!noResultMsg) {
                    noResultMsg = document.createElement('div');
                    noResultMsg.id = 'noDoctorResults';
                    noResultMsg.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--slate-500);';
                    noResultMsg.innerHTML = '<i class="fas fa-user-md" style="font-size:42px; margin-bottom:12px; color:var(--primary-light);"></i><h3 style="color:var(--navy-900);">No doctors found</h3><p>Try searching for a different specialty or keyword.</p>';
                    const grid = document.querySelector('.doctors-grid');
                    if (grid) grid.appendChild(noResultMsg);
                }
            } else if (noResultMsg) {
                noResultMsg.remove();
            }
        };

        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                activeCategory = tab.getAttribute('data-filter') || 'all';
                filterDoctors();
            });
        });

        if (doctorSearchInput) {
            doctorSearchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.trim().toLowerCase();
                filterDoctors();
            });
        }
    }

    // =========================================================================
    // 8. Instant Search for Departments & Services
    // =========================================================================
    const deptSearchInput = document.getElementById('deptSearch');
    if (deptSearchInput) {
        const deptCards = document.querySelectorAll('.dept-card');
        deptSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            deptCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (!query || text.includes(query)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    const serviceSearchInput = document.getElementById('serviceSearch');
    if (serviceSearchInput) {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            serviceCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (!query || text.includes(query)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // =========================================================================
    // 9. Gallery Lightbox Modal
    // =========================================================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    if (lightbox && lightboxImg) {
        document.querySelectorAll('.facility-card[data-lightbox]').forEach(card => {
            card.addEventListener('click', () => {
                const src = card.getAttribute('data-lightbox');
                if (src) {
                    lightboxImg.src = src;
                    lightbox.classList.add('active');
                    document.body.classList.add('drawer-open');
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.classList.remove('drawer-open');
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // =========================================================================
    // 10. General Contact & Inquiry Form Validation & Submission
    // =========================================================================
    const contactForm = document.getElementById('contactForm');

    const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const validatePhone = (val) => /^\d{10,}$/.test(val.replace(/\D/g, ''));

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');

            // Reset error states
            contactForm.querySelectorAll('.form-group').forEach(g => {
                g.classList.remove('error', 'success');
            });

            // Name
            if (!name || name.value.trim().length < 2) {
                if (name) name.closest('.form-group')?.classList.add('error');
                isValid = false;
            } else {
                name.closest('.form-group')?.classList.add('success');
            }

            // Email
            if (!email || !validateEmail(email.value.trim())) {
                if (email) email.closest('.form-group')?.classList.add('error');
                isValid = false;
            } else {
                email.closest('.form-group')?.classList.add('success');
            }

            // Phone
            if (!phone || !validatePhone(phone.value.trim())) {
                if (phone) phone.closest('.form-group')?.classList.add('error');
                isValid = false;
            } else {
                phone.closest('.form-group')?.classList.add('success');
            }

            // Message
            if (!message || message.value.trim().length < 5) {
                if (message) message.closest('.form-group')?.classList.add('error');
                isValid = false;
            } else {
                message.closest('.form-group')?.classList.add('success');
            }

            if (isValid) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const origHtml = submitBtn ? submitBtn.innerHTML : '';
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
                }

                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = origHtml;
                    }

                    const patientName = name ? name.value.trim() : 'Valued Visitor';
                    showToast(`✅ Thank you, ${patientName}! Your message has been sent successfully. Our team will get back to you shortly.`, 'success', 5000);
                    
                    contactForm.reset();
                    contactForm.querySelectorAll('.form-group').forEach(g => g.classList.remove('success', 'error'));
                }, 1000);
            } else {
                showToast('❌ Please fill in all required fields correctly before sending.', 'error');
            }
        });
    }

    // =========================================================================
    // 11. Newsletter Subscription
    // =========================================================================
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            if (input && validateEmail(input.value.trim())) {
                showToast('✉️ Thank you for subscribing to MZH Health Newsletter!', 'success');
                form.reset();
            } else {
                showToast('Please enter a valid email address.', 'error');
            }
        });
    });

    // =========================================================================
    // 12. Back to Top Button
    // =========================================================================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 350) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =========================================================================
    // 13. Scroll Reveal Animations (Intersection Observer)
    // =========================================================================
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        reveals.forEach(el => revealObserver.observe(el));
    }

});
