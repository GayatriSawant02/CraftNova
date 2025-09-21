// about-us.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("About Us page loaded.");

    // Simple smooth scrolling for internal links (if you add them)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // You can add logic here for tracking page views or other analytics
    // For example:
    // fetch('/api/track-page-view', { method: 'POST', body: { page: 'about-us' } });
});