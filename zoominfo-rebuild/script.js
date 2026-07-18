document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Tab Switching Logic ---
    const tabItems = document.querySelectorAll('.tab-item');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            tabItems.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(p => p.classList.remove('active'));

            item.classList.add('active');
            item.setAttribute('aria-selected', 'true');
            
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- 2. Scroll Reveals (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Unobserve after revealing
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.reveal-up');
    animatedElements.forEach(el => scrollObserver.observe(el));


    // --- 3. Number Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 150; // lower is faster

    const startCounting = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const isDecimal = counter.getAttribute('data-target').includes('.');
        
        const inc = target / speed;

        if (count < target) {
            counter.innerText = isDecimal ? (count + inc).toFixed(1) : Math.ceil(count + inc);
            setTimeout(() => startCounting(counter), 10);
        } else {
            counter.innerText = target;
        }
    };

    const heroSection = document.querySelector('.company-hero');
    if (heroSection && counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => startCounting(counter));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counterObserver.observe(heroSection);
    }


    // --- 4. Sticky Navbar effect on scroll ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 5. Page Transitions ---
    const transitionLinks = document.querySelectorAll('.transition-link');
    transitionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // Check if it's the current page
            if (href === window.location.pathname.split('/').pop() || (href === 'index.html' && window.location.pathname.endsWith('/'))) {
                return; 
            }
            e.preventDefault();
            document.body.classList.add('page-transitioning');
            setTimeout(() => {
                window.location.href = href;
            }, 400); // Wait for CSS transition (0.5s) minus a bit for snappiness
        });
    });

});
