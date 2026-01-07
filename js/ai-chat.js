// js/ai-chat.js
// Assume you have a backend API endpoint for AI, e.g., a simple serverless function on Supabase or Vercel that calls OpenAI
const AI_API_URL = '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'; // This should handle OpenAI call with system prompt

function initAIChat() {
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const messages = document.getElementById('chat-messages');

    sendBtn.addEventListener('click', async () => {
        const message = input.value.trim();
        if (!message) return;

        // Rate limit: simple, e.g., last message time
        const lastMessage = localStorage.getItem('last_ai_message');
        if (lastMessage && Date.now() - lastMessage < 10000) { // 10s cooldown
            addMessage('System: Please wait before sending another message.', 'system');
            return;
        }

        addMessage(`You: ${sanitize(message)}`, 'user');
        input.value = '';

        try {
            const response = await fetch(AI_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            const data = await response.json();
            addMessage(`AI: ${sanitize(data.reply)}`, 'ai');
        } catch (error) {
            addMessage('Error: Could not reach AI.', 'system');
        }

        localStorage.setItem('last_ai_message', Date.now());
    });
}

function addMessage(text, className) {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', className);
    bubble.textContent = text;
    document.getElementById('chat-messages').appendChild(bubble);
    bubble.scrollIntoView();
}