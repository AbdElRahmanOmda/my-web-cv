document.addEventListener('DOMContentLoaded', () => {
    console.log("CV script loaded and ready!");

    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    // Apply saved theme on load
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeToggle.checked = true;
        }
    }

    // Listen for toggle change
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('#main-nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent the default jump
            e.preventDefault();

            // Get the target section's ID from the href
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Scroll smoothly to the target section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Intersection Observer for animations and nav highlighting ---

    // For skill progress bar animation
    const skillsContainer = document.querySelector('.skills-container');
    const progressBars = document.querySelectorAll('.progress');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-progress');
                    bar.style.width = targetWidth;
                });
                animationObserver.unobserve(skillsContainer); // Stop observing once triggered
            }
        });
    }, { threshold: 0.8 });

    if (skillsContainer) {
        animationObserver.observe(skillsContainer);
    }

    // For active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navHighlighterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`#main-nav a[href="#${id}"]`);

            if (entry.isIntersecting) {
                // Remove active class from all nav links first
                document.querySelectorAll('#main-nav a').forEach(link => {
                    link.classList.remove('active');
                });
                // Add active class to the intersecting one
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }, { 
        rootMargin: '-30% 0px -70% 0px', // Trigger when a section is in the middle 40% of the viewport
        threshold: 0 
    });

    sections.forEach(section => {
        navHighlighterObserver.observe(section);
    });

    // --- Back to Top Button Logic ---
    const backToTopButton = document.getElementById("back-to-top-btn");

    // Show or hide the button based on scroll position
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    };

    // Scroll to top when the button is clicked
    backToTopButton.addEventListener("click", function(e) {
        e.preventDefault(); // Prevent default anchor behavior
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Expandable Project Cards ---
    const expandableCards = document.querySelectorAll('.project-card.expandable');

    expandableCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle the 'expanded' class on the card
            this.classList.toggle('expanded');
        });
    });

});