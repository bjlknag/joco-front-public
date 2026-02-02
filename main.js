const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    // Save the theme preference
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.removeItem('theme');
    }
});
