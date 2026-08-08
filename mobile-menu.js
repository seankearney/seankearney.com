document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('[aria-label="Menu"]');
    const mobileMenu = document.querySelector('.mobile-menu');

    function openMenu() {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        menuButton.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        menuButton.setAttribute('aria-expanded', 'false');
    }

    menuButton.addEventListener('click', () => {
        if (mobileMenu.classList.contains('hidden')) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    // Close menu when a nav link inside it is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (event) => {
        if (!mobileMenu.classList.contains('hidden') &&
            !mobileMenu.contains(event.target) &&
            !menuButton.contains(event.target)) {
            closeMenu();
        }
    });

    // Close menu on Escape key for keyboard accessibility
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            closeMenu();
            menuButton.focus();
        }
    });
});
