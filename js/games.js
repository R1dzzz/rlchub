// js/games.js
async function loadGames() {
    const platform = document.getElementById('filter-platform').value;
    const genre = document.getElementById('filter-genre').value;
    const popularity = document.getElementById('filter-popularity').value;

    let query = supabase.from('games').select('*');
    if (platform) query = query.eq('platform', platform);
    if (genre) query = query.eq('genre', genre);
    // For popularity, assume a field like 'popularity_score'
    if (popularity === 'high') query = query.gte('popularity_score', 80);

    const { data } = await query;
    const list = document.getElementById('games-list');
    list.innerHTML = '';
    data.forEach(game => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${sanitize(game.title)}</h3>
            <p>${sanitize(game.description.slice(0, 100))}...</p>
            <a href="game-detail.html?id=${game.id}">Details</a>
        `;
        list.appendChild(card);
    });
}

async function loadGameDetail(id) {
    const { data } = await supabase.from('games').select('*').eq('id', id).single();
    if (data) {
        document.getElementById('game-title').textContent = sanitize(data.title);
        document.getElementById('game-image').src = data.image_url; // From Supabase storage
        document.getElementById('game-description').textContent = sanitize(data.description);
        // Other fields
        document.getElementById('download-count').textContent = `Downloads: ${data.download_count}`;
    }
}

async function downloadGame(id) {
    // Proteksi spam: simple debounce or localStorage timestamp check
    const lastDownload = localStorage.getItem(`download_${id}`);
    if (lastDownload && Date.now() - lastDownload < 60000) { // 1 min cooldown
        alert('Please wait before downloading again.');
        return;
    }
    // Increment download count
    await supabase.from('games').update({ download_count: supabase.raw('download_count + 1') }).eq('id', id);
    // Get download URL from Supabase storage
    const { data } = await supabase.storage.from('games').getPublicUrl(`game_${id}.zip`);
    window.location.href = data.publicUrl;
    localStorage.setItem(`download_${id}`, Date.now());
}