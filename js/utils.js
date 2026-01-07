// js/utils.js
function sanitize(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML; // Basic sanitization against XSS
}

// Add more utils if needed