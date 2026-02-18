      // Loader
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 1000);
        });

        // Menu mobile
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');

        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });

        // Fermer le menu mobile quand on clique sur un lien
        document.querySelectorAll('#navMenu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            });
        });

        // Typing effect
        const typedElement = document.getElementById('typed');
        const texts = [
            'Étudiante en informatique',
            'Développeuse web passionnée',
            'Créative & motivée',
            'Future full-stack developer'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typedElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeEffect, 500);
            } else {
                setTimeout(typeEffect, isDeleting ? 50 : 100);
            }
        }

        typeEffect();

        // Animation des compteurs
        function animateStats() {
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const current = parseInt(stat.textContent);
                const increment = target / 50;

                if (current < target) {
                    stat.textContent = Math.ceil(current + increment);
                    setTimeout(animateStats, 20);
                } else {
                    stat.textContent = target;
                }
            });
        }

        // Observer pour lancer l'animation quand la section est visible
        const aboutSection = document.getElementById('about');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(aboutSection);

        // Animation des barres de progression
        function animateSkills() {
            const skillBars = document.querySelectorAll('.skill-progress-bar');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
        }

        const skillsSection = document.getElementById('skills');
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillsObserver.observe(skillsSection);

        // Smooth scroll pour tous les liens
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Back to top button
        const backToTop = document.getElementById('backToTop');
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Gestion du formulaire de contact
        const contactForm = document.getElementById('contactForm');
        const notification = document.getElementById('notification');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animation du bouton
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.innerHTML = 'Envoi en cours... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Simulation d'envoi
            setTimeout(() => {
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);

                // Reset formulaire
                contactForm.reset();
                submitBtn.innerHTML = 'Envoyer le message <i class="fas fa-paper-plane"></i>';
                submitBtn.disabled = false;
            }, 2000);
        });

        // Animation au scroll pour les sections
        const sections = document.querySelectorAll('section');
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            });
        }, { threshold: 0.2 });

        sections.forEach(section => {
            section.style.opacity = '0';
            fadeObserver.observe(section);
        });

        // Effet de parallaxe léger sur le header
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            const scrollPosition = window.pageYOffset;
            header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });

        // Gestion du thème (optionnel)
        // On peut ajouter un bouton pour changer le thème ici

        // Détection de la connexion internet
        window.addEventListener('offline', function() {
            alert('Vous êtes hors ligne. Certaines fonctionnalités peuvent ne pas fonctionner.');
        });

        // Mise à jour automatique de l'année dans le footer
        document.querySelector('footer p:first-child').innerHTML = 
            `© ${new Date().getFullYear()} Flavie Rakotoherisoa - Étudiante en informatique à l'EMIT`;
