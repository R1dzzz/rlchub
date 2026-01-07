// js/auth.js
function initLogin() {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert('Login failed: ' + error.message);
        } else {
            localStorage.setItem('session', JSON.stringify(data.session));
            window.location.href = 'index.html';
        }
    });
}

function initRegister() {
    const form = document.getElementById('register-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const username = document.getElementById('register-username').value;
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            alert('Register failed: ' + error.message);
        } else {
            // Insert user profile
            await supabase.from('profiles').insert({ id: data.user.id, username });
            localStorage.setItem('session', JSON.stringify(data.session));
            window.location.href = 'index.html';
        }
    });
}

function checkAuth() {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!session) {
        window.location.href = 'login.html';
    } else {
        document.getElementById('auth-link').innerHTML = '<a href="profile.html">Profile</a>';
    }
}

function logout() {
    supabase.auth.signOut();
    localStorage.removeItem('session');
    window.location.href = 'login.html';
}

async function loadProfile() {
    const session = JSON.parse(localStorage.getItem('session'));
    const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
    if (data) {
        document.getElementById('profile-username').textContent = data.username;
        // Populate other fields similarly
    }
}