// js/news.js
async function loadNews() {
    const search = document.getElementById('news-search').value.toLowerCase();
    const category = document.getElementById('news-category').value;

    let query = supabase.from('news').select('*');
    if (category) query = query.eq('category', category);

    const { data } = await query;
    const filtered = data.filter(article => article.title.toLowerCase().includes(search) || article.content.toLowerCase().includes(search));
    const list = document.getElementById('news-list');
    list.innerHTML = '';
    filtered.forEach(article => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${sanitize(article.title)}</h3>
            <p>${sanitize(article.content.slice(0, 100))}...</p>
        `;
        list.appendChild(card);
    });
}