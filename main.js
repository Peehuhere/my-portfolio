import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfolio loaded successfully ✨");
    
    // 1. subtle parallax effect to background blur circles
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const bgs = document.querySelectorAll('.blur-\\[100px\\]');
        if (bgs.length > 0) {
            bgs[0].style.transform = `translate(${x * 30}px, ${y * 30}px)`;
        }
        if (bgs.length > 1) {
            bgs[1].style.transform = `translate(-${x * 30}px, -${y * 30}px)`;
        }
    });

    // 2. Typewriter Effect (Infinite Loop)
    const typeText = "Software Engineering Intern && CS Undergrad";
    const typewriterEl = document.getElementById('typewriter-text');
    let i = 0;
    let isDeleting = false;

    if (typewriterEl) {
        function typeWriter() {
            if (!isDeleting && i <= typeText.length) {
                typewriterEl.innerHTML = typeText.substring(0, i).replace(/&/g, '&amp;');
                i++;
                if (i <= typeText.length) {
                    setTimeout(typeWriter, 100 + Math.random() * 50);
                } else {
                    isDeleting = true;
                    setTimeout(typeWriter, 2500); // pause at end before erasing
                }
            } else if (isDeleting && i >= 0) {
                typewriterEl.innerHTML = typeText.substring(0, i).replace(/&/g, '&amp;');
                i--;
                if (i >= 0) {
                    setTimeout(typeWriter, 30); // fast erase
                } else {
                    isDeleting = false;
                    i = 0;
                    setTimeout(typeWriter, 500); // pause before retyping
                }
            }
        }
        setTimeout(typeWriter, 800);
    }

    // 3. Reading Progress Bar
    window.addEventListener('scroll', () => {
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = Math.max(0, Math.min(100, (window.scrollY / documentHeight) * 100));
            progressBar.style.width = scrollPercentage + '%';
        }

        // 6. Dynamic Navbar Translucency
        const mainNav = document.getElementById('main-nav');
        if (mainNav) {
            if (window.scrollY > 50) {
                mainNav.classList.add('bg-tech-darker/60', 'backdrop-blur-md', 'shadow-[0_0_15px_rgba(0,0,0,0.5)]', 'border-white/10');
                mainNav.classList.remove('border-transparent', 'bg-transparent');
            } else {
                mainNav.classList.remove('bg-tech-darker/60', 'backdrop-blur-md', 'shadow-[0_0_15px_rgba(0,0,0,0.5)]', 'border-white/10');
                mainNav.classList.add('border-transparent', 'bg-transparent');
            }
        }
    });

    // 7. Sticky Flying Avatar using FLIP Animation
    const heroAvatar = document.getElementById('hero-avatar');
    let isAvatarSticky = false;

    window.addEventListener('scroll', () => {
        if (!heroAvatar) return;
        const threshold = 180;
        
        if (window.scrollY > threshold && !isAvatarSticky) {
            isAvatarSticky = true;
            
            // First: Grab initial bounding box
            const first = heroAvatar.getBoundingClientRect();
            
            // Last: Apply classes
            heroAvatar.classList.remove('w-48', 'h-48', 'md:w-64', 'md:h-64', 'border-4');
            heroAvatar.classList.add('fixed', 'top-4', 'right-4', 'md:top-6', 'md:right-8', 'w-16', 'h-16', 'md:w-20', 'md:h-20', 'border-2', 'shadow-[0_0_20px_rgba(56,189,248,0.5)]', 'cursor-pointer');
            
            // Invert & Play
            requestAnimationFrame(() => {
                const last = heroAvatar.getBoundingClientRect();
                const deltaX = first.left - last.left;
                const deltaY = first.top - last.top;
                const scaleW = first.width / last.width;
                const scaleH = first.height / last.height;

                // Teleport back instantly
                heroAvatar.style.transition = 'none';
                heroAvatar.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleW}, ${scaleH})`;
                heroAvatar.style.transformOrigin = 'top left';

                // Repaint and animate to final destination
                requestAnimationFrame(() => {
                    heroAvatar.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
                    heroAvatar.style.transform = 'none';
                });
            });
            
        } else if (window.scrollY <= threshold && isAvatarSticky) {
            isAvatarSticky = false;
            
            // First
            const first = heroAvatar.getBoundingClientRect();
            
            // Last
            heroAvatar.classList.add('w-48', 'h-48', 'md:w-64', 'md:h-64', 'border-4');
            heroAvatar.classList.remove('fixed', 'top-4', 'right-4', 'md:top-6', 'md:right-8', 'w-16', 'h-16', 'md:w-20', 'md:h-20', 'border-2', 'shadow-[0_0_20px_rgba(56,189,248,0.5)]', 'cursor-pointer');
            
            // Invert & Play
            requestAnimationFrame(() => {
                const last = heroAvatar.getBoundingClientRect();
                const deltaX = first.left - last.left;
                const deltaY = first.top - last.top;
                const scaleW = first.width / last.width;
                const scaleH = first.height / last.height;

                heroAvatar.style.transition = 'none';
                heroAvatar.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleW}, ${scaleH})`;
                heroAvatar.style.transformOrigin = 'top left';

                requestAnimationFrame(() => {
                    heroAvatar.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
                    heroAvatar.style.transform = 'none';
                });
            });
        }
    });

    // Make avatar click scroll back to top if sticky
    if (heroAvatar) {
        heroAvatar.addEventListener('click', () => {
            if (isAvatarSticky) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // 4. Animated Skill Bars (Disabled/Replaced by devicons but keeping observer for future use)
    const skillBars = document.querySelectorAll('.fill-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetBar = entry.target;
                const width = targetBar.getAttribute('data-width');
                if (width) {
                    targetBar.style.width = width;
                }
                skillObserver.unobserve(targetBar);
            }
        });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => skillObserver.observe(bar));
});
