document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navigationLinks = document.querySelectorAll('.header ul a');

    navigationLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === currentPage);
    });
});
